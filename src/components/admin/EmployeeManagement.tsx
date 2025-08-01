import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Edit, Trash2, Calendar, CheckCircle, XCircle, Users, ClipboardList, Plus, Key } from 'lucide-react';

interface Employee {
  id: string;
  user_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  hire_date?: string;
  is_active: boolean;
  created_at: string;
}

interface EmployeeTask {
  id: string;
  title: string;
  description?: string;
  priority: string;
  status: string;
  due_date?: string;
  assigned_date: string;
  employee_profiles: {
    first_name: string;
    last_name: string;
    employee_id: string;
  };
}

export const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<EmployeeTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const { toast } = useToast();

  // Form states for creating employee
  const [newEmployee, setNewEmployee] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hire_date: '',
    temporary_password: '',
  });

  // Password reset state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newPassword, setNewPassword] = useState('');

  // Form states for creating task
  const [newTask, setNewTask] = useState({
    employee_id: '',
    title: '',
    description: '',
    priority: 'medium',
    due_date: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([fetchEmployees(), fetchTasks()]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('employee_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching employees:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employees.",
        variant: "destructive"
      });
      return;
    }

    setEmployees(data || []);
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('employee_tasks')
      .select(`
        *,
        employee_profiles!employee_id (
          first_name,
          last_name,
          employee_id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data || []);
  };

  const createEmployee = async () => {
    try {
      if (!newEmployee.temporary_password) {
        toast({
          title: "Error",
          description: "Please provide a temporary password for the employee.",
          variant: "destructive"
        });
        return;
      }

      // Call edge function to create employee with auth account
      const { data, error } = await supabase.functions.invoke('create-employee', {
        body: newEmployee
      });

      if (error) throw error;

      toast({
        title: "Employee Created",
        description: `Employee ${newEmployee.first_name} ${newEmployee.last_name} has been created successfully with temporary password.`,
      });

      setShowCreateDialog(false);
      setNewEmployee({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        hire_date: '',
        temporary_password: '',
      });
      
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create employee: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const createTask = async () => {
    try {
      const { error } = await supabase
        .from('employee_tasks')
        .insert({
          employee_id: newTask.employee_id,
          title: newTask.title,
          description: newTask.description || null,
          priority: newTask.priority,
          due_date: newTask.due_date || null,
          assigned_by: employees[0]?.id, // In production: use current admin's employee profile
        });

      if (error) throw error;

      toast({
        title: "Task Created",
        description: `Task "${newTask.title}" has been assigned successfully.`,
      });

      setShowTaskDialog(false);
      setNewTask({
        employee_id: '',
        title: '',
        description: '',
        priority: 'medium',
        due_date: '',
      });
      
      fetchTasks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to create task: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const resetEmployeePassword = async () => {
    try {
      if (!selectedEmployee || !newPassword) {
        toast({
          title: "Error",
          description: "Please provide a new password.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('reset-employee-password', {
        body: {
          employee_id: selectedEmployee.id,
          new_password: newPassword
        }
      });

      if (error) throw error;

      toast({
        title: "Password Updated",
        description: `Password has been reset for ${selectedEmployee.first_name} ${selectedEmployee.last_name}.`,
      });

      setShowPasswordDialog(false);
      setSelectedEmployee(null);
      setNewPassword('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to reset password: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const toggleEmployeeStatus = async (employeeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('employee_profiles')
        .update({ is_active: !currentStatus })
        .eq('id', employeeId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Employee status has been ${!currentStatus ? 'activated' : 'deactivated'}.`,
      });
      
      fetchEmployees();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to update status: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'on_hold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading employee data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Employee Management</h2>
          <p className="text-muted-foreground">Manage employees and assign tasks</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ClipboardList className="h-4 w-4 mr-2" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Assign New Task</DialogTitle>
                <DialogDescription>
                  Create and assign a task to an employee
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label>Employee</Label>
                  <Select onValueChange={(value) => setNewTask({...newTask, employee_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.filter(emp => emp.is_active).map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.first_name} {employee.last_name} ({employee.employee_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Task Title</Label>
                  <Input
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Due Date</Label>
                    <Input
                      type="date"
                      value={newTask.due_date}
                      onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowTaskDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={createTask} disabled={!newTask.employee_id || !newTask.title}>
                    Assign Task
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Employee</DialogTitle>
                <DialogDescription>
                  Add a new employee to the system
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Employee ID</Label>
                    <Input
                      placeholder="EMP001"
                      value={newEmployee.employee_id}
                      onChange={(e) => setNewEmployee({...newEmployee, employee_id: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="employee@company.com"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      placeholder="John"
                      value={newEmployee.first_name}
                      onChange={(e) => setNewEmployee({...newEmployee, first_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="Doe"
                      value={newEmployee.last_name}
                      onChange={(e) => setNewEmployee({...newEmployee, last_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Department</Label>
                    <Input
                      placeholder="IT"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input
                      placeholder="Software Developer"
                      value={newEmployee.position}
                      onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Phone</Label>
                    <Input
                      placeholder="+91-9876543210"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Hire Date</Label>
                    <Input
                      type="date"
                      value={newEmployee.hire_date}
                      onChange={(e) => setNewEmployee({...newEmployee, hire_date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label>Temporary Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter temporary password"
                    value={newEmployee.temporary_password}
                    onChange={(e) => setNewEmployee({...newEmployee, temporary_password: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    The employee will use this to login initially. They should change it after first login.
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={createEmployee}
                    disabled={!newEmployee.employee_id || !newEmployee.first_name || !newEmployee.last_name || !newEmployee.email}
                  >
                    Create Employee
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{employees.length}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold">{employees.filter(emp => emp.is_active).length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl font-bold">
                  {tasks.filter(task => task.status === 'assigned' || task.status === 'in_progress').length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.employee_id}</TableCell>
                  <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Badge className={employee.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowPasswordDialog(true);
                        }}
                      >
                        <Key className="h-4 w-4 mr-1" />
                        Reset Password
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleEmployeeStatus(employee.id, employee.is_active)}
                      >
                        {employee.is_active ? (
                          <>
                            <XCircle className="h-4 w-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.slice(0, 10).map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{task.title}</div>
                      {task.description && (
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.employee_profiles.first_name} {task.employee_profiles.last_name} 
                    <div className="text-sm text-muted-foreground">({task.employee_profiles.employee_id})</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No deadline'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Password Reset Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Employee Password</DialogTitle>
            <DialogDescription>
              Reset password for {selectedEmployee?.first_name} {selectedEmployee?.last_name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">
                The employee will be able to login with this new password immediately.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => {
                setShowPasswordDialog(false);
                setSelectedEmployee(null);
                setNewPassword('');
              }}>
                Cancel
              </Button>
              <Button onClick={resetEmployeePassword} disabled={!newPassword}>
                Reset Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Calendar,
  PlusCircle,
  User,
  BarChart3,
  PlayCircle,
  PauseCircle,
  ClipboardList
} from "lucide-react";

interface EmployeeProfile {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  position: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  due_date: string;
  assigned_date: string;
  started_at?: string;
  completed_at?: string;
}

interface TaskUpdate {
  id: string;
  update_text: string;
  hours_worked?: number;
  progress_percentage?: number;
  update_date: string;
  created_at: string;
}

interface DailyAttendance {
  id: string;
  login_date: string;
  login_time: string;
  logout_time?: string;
  status: string;
}

const EmployeeDashboardPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [attendance, setAttendance] = useState<DailyAttendance | null>(null);
  const [taskUpdates, setTaskUpdates] = useState<Record<string, TaskUpdate[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoggedInToday, setHasLoggedInToday] = useState(false);
  
  // Form states
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [updateText, setUpdateText] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [progressPercentage, setProgressPercentage] = useState("");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    initializeDashboard();
  }, [user, navigate]);

  const initializeDashboard = async () => {
    try {
      await Promise.all([
        fetchEmployeeProfile(),
        checkTodayAttendance(),
        fetchTasks(),
      ]);
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployeeProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('employee_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        toast({
          title: "Employee Profile Required",
          description: "Please contact admin to set up your employee profile.",
          variant: "destructive"
        });
      }
      return;
    }

    setEmployeeProfile(data);
  };

  const checkTodayAttendance = async () => {
    if (!employeeProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('daily_attendance')
      .select('*')
      .eq('employee_id', employeeProfile.id)
      .eq('login_date', today)
      .single();

    if (!error && data) {
      setAttendance(data);
      setHasLoggedInToday(true);
    }
  };

  const fetchTasks = async () => {
    if (!employeeProfile) return;

    const { data, error } = await supabase
      .from('employee_tasks')
      .select('*')
      .eq('employee_id', employeeProfile.id)
      .eq('status', 'assigned')
      .or('status.eq.in_progress')
      .order('priority', { ascending: false })
      .order('due_date', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data || []);
    
    // Fetch updates for each task
    if (data && data.length > 0) {
      const updates: Record<string, TaskUpdate[]> = {};
      await Promise.all(
        data.map(async (task) => {
          const { data: taskUpdates } = await supabase
            .from('task_updates')
            .select('*')
            .eq('task_id', task.id)
            .order('created_at', { ascending: false });
          
          updates[task.id] = taskUpdates || [];
        })
      );
      setTaskUpdates(updates);
    }
  };

  const markDailyLogin = async () => {
    if (!employeeProfile || hasLoggedInToday) return;

    const { error } = await supabase
      .from('daily_attendance')
      .insert({
        employee_id: employeeProfile.id,
        status: 'present'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark daily login.",
        variant: "destructive"
      });
      return;
    }

    setHasLoggedInToday(true);
    toast({
      title: "Daily Login Recorded",
      description: "Your attendance has been marked for today.",
    });

    // Refresh attendance data
    checkTodayAttendance();
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    const updates: any = { status: newStatus };
    
    if (newStatus === 'in_progress' && !tasks.find(t => t.id === taskId)?.started_at) {
      updates.started_at = new Date().toISOString();
    } else if (newStatus === 'completed') {
      updates.completed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('employee_tasks')
      .update(updates)
      .eq('id', taskId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus.replace('_', ' ')}.`,
    });

    fetchTasks();
  };

  const addTaskUpdate = async () => {
    if (!selectedTask || !updateText.trim() || !employeeProfile) return;

    const updateData = {
      task_id: selectedTask.id,
      employee_id: employeeProfile.id,
      update_text: updateText.trim(),
      hours_worked: hoursWorked ? parseFloat(hoursWorked) : null,
      progress_percentage: progressPercentage ? parseInt(progressPercentage) : null,
    };

    const { error } = await supabase
      .from('task_updates')
      .insert(updateData);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add task update.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Update Added",
      description: "Your task update has been recorded.",
    });

    // Reset form
    setUpdateText("");
    setHoursWorked("");
    setProgressPercentage("");
    setShowUpdateDialog(false);
    setSelectedTask(null);

    // Refresh data
    fetchTasks();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!employeeProfile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Employee Profile Required</h2>
            <p className="text-muted-foreground">
              Please contact your administrator to set up your employee profile.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome, {employeeProfile.first_name}!
              </h1>
              <p className="text-primary-foreground/90">
                {employeeProfile.position} • {employeeProfile.department}
              </p>
            </div>
            
            {!hasLoggedInToday && (
              <Button 
                onClick={markDailyLogin}
                size="lg"
                variant="secondary"
              >
                <Clock className="h-5 w-5 mr-2" />
                Mark Daily Login
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Today's Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Attendance Status</span>
                    <Badge className={hasLoggedInToday ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {hasLoggedInToday ? 'Present' : 'Not Marked'}
                    </Badge>
                  </div>
                  
                  {attendance && (
                    <div className="text-sm text-muted-foreground">
                      Login: {new Date(attendance.login_time).toLocaleTimeString()}
                      {attendance.logout_time && (
                        <div>Logout: {new Date(attendance.logout_time).toLocaleTimeString()}</div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Active Tasks</span>
                      <Badge variant="outline">{tasks.length}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>In Progress</span>
                        <span>{tasks.filter(t => t.status === 'in_progress').length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assigned</span>
                        <span>{tasks.filter(t => t.status === 'assigned').length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Tasks</h2>
                <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
                  <DialogTrigger asChild>
                    <Button disabled={tasks.length === 0}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Update
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Task Update</DialogTitle>
                      <DialogDescription>
                        Record your progress on a task
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="task-select">Select Task</Label>
                        <Select onValueChange={(value) => {
                          const task = tasks.find(t => t.id === value);
                          setSelectedTask(task || null);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a task to update" />
                          </SelectTrigger>
                          <SelectContent>
                            {tasks.map((task) => (
                              <SelectItem key={task.id} value={task.id}>
                                {task.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="update-text">Update Description</Label>
                        <Textarea
                          id="update-text"
                          placeholder="Describe what you worked on today..."
                          value={updateText}
                          onChange={(e) => setUpdateText(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="hours-worked">Hours Worked</Label>
                          <Input
                            id="hours-worked"
                            type="number"
                            step="0.5"
                            min="0"
                            max="24"
                            placeholder="e.g., 4.5"
                            value={hoursWorked}
                            onChange={(e) => setHoursWorked(e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="progress">Progress %</Label>
                          <Input
                            id="progress"
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g., 75"
                            value={progressPercentage}
                            onChange={(e) => setProgressPercentage(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowUpdateDialog(false);
                            setSelectedTask(null);
                            setUpdateText("");
                            setHoursWorked("");
                            setProgressPercentage("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={addTaskUpdate}
                          disabled={!selectedTask || !updateText.trim()}
                        >
                          Add Update
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {tasks.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ClipboardList className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Tasks</h3>
                    <p className="text-muted-foreground">
                      You don't have any active tasks assigned at the moment.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{task.title}</CardTitle>
                            <p className="text-muted-foreground text-sm mb-4">
                              {task.description}
                            </p>
                            
                            <div className="flex gap-2 mb-2">
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority.toUpperCase()}
                              </Badge>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-4">
                            {task.status === 'assigned' && (
                              <Button
                                size="sm"
                                onClick={() => updateTaskStatus(task.id, 'in_progress')}
                              >
                                <PlayCircle className="h-4 w-4 mr-1" />
                                Start
                              </Button>
                            )}
                            
                            {task.status === 'in_progress' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateTaskStatus(task.id, 'on_hold')}
                                >
                                  <PauseCircle className="h-4 w-4 mr-1" />
                                  Pause
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateTaskStatus(task.id, 'completed')}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Complete
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      
                      {taskUpdates[task.id] && taskUpdates[task.id].length > 0 && (
                        <CardContent>
                          <h4 className="font-medium mb-2">Recent Updates</h4>
                          <div className="space-y-2">
                            {taskUpdates[task.id].slice(0, 2).map((update) => (
                              <div key={update.id} className="bg-muted/50 p-3 rounded-lg">
                                <p className="text-sm">{update.update_text}</p>
                                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                                  <span>{new Date(update.created_at).toLocaleDateString()}</span>
                                  <div className="flex gap-2">
                                    {update.hours_worked && <span>{update.hours_worked}h worked</span>}
                                    {update.progress_percentage && <span>{update.progress_percentage}% complete</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmployeeDashboardPage;
-- Create employee profiles table
CREATE TABLE public.employee_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  employee_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  department TEXT,
  position TEXT,
  hire_date DATE,
  manager_id UUID REFERENCES employee_profiles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily attendance table
CREATE TABLE public.daily_attendance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employee_profiles(id),
  login_date DATE NOT NULL DEFAULT CURRENT_DATE,
  login_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  logout_time TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'present' CHECK (status IN ('present', 'absent', 'half_day', 'sick_leave')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, login_date)
);

-- Create tasks table
CREATE TABLE public.employee_tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES employee_profiles(id),
  assigned_by UUID REFERENCES employee_profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'on_hold', 'cancelled')),
  due_date DATE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create task updates table for daily progress tracking
CREATE TABLE public.task_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES employee_tasks(id),
  employee_id UUID NOT NULL REFERENCES employee_profiles(id),
  update_text TEXT NOT NULL,
  hours_worked DECIMAL(3,1),
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  update_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE employee_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_updates ENABLE ROW LEVEL SECURITY;

-- Add employee role to existing app_role enum
ALTER TYPE app_role ADD VALUE 'employee';

-- Create RLS policies for employee_profiles
CREATE POLICY "Employees can view their own profile" 
ON employee_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all employee profiles" 
ON employee_profiles FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Employees can update their own profile" 
ON employee_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for daily_attendance
CREATE POLICY "Employees can manage their own attendance" 
ON daily_attendance FOR ALL 
USING (employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all attendance" 
ON daily_attendance FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for employee_tasks
CREATE POLICY "Employees can view their assigned tasks" 
ON employee_tasks FOR SELECT 
USING (employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can update their task status" 
ON employee_tasks FOR UPDATE 
USING (employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can manage all tasks" 
ON employee_tasks FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for task_updates
CREATE POLICY "Employees can create updates for their tasks" 
ON task_updates FOR INSERT 
WITH CHECK (employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Employees can view updates for their tasks" 
ON task_updates FOR SELECT 
USING (employee_id IN (SELECT id FROM employee_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Admins can view all task updates" 
ON task_updates FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_employee_profiles_updated_at
  BEFORE UPDATE ON employee_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employee_tasks_updated_at
  BEFORE UPDATE ON employee_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
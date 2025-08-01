-- First, let's create some dummy auth users for employees (these would normally be created through signup)
-- Note: In production, employees would sign up normally and admin would assign employee role

-- Insert dummy employee profiles (assuming auth users exist or will be created)
INSERT INTO employee_profiles (user_id, employee_id, first_name, last_name, email, phone, department, position, hire_date, is_active) VALUES
  (gen_random_uuid(), 'EMP001', 'John', 'Smith', 'john.smith@company.com', '+91-9876543210', 'IT', 'Software Developer', '2024-01-15', true),
  (gen_random_uuid(), 'EMP002', 'Sarah', 'Johnson', 'sarah.johnson@company.com', '+91-9876543211', 'HR', 'HR Manager', '2023-06-10', true),
  (gen_random_uuid(), 'EMP003', 'Mike', 'Wilson', 'mike.wilson@company.com', '+91-9876543212', 'IT', 'DevOps Engineer', '2024-02-20', true),
  (gen_random_uuid(), 'EMP004', 'Emily', 'Davis', 'emily.davis@company.com', '+91-9876543213', 'Marketing', 'Marketing Specialist', '2023-11-05', true),
  (gen_random_uuid(), 'EMP005', 'David', 'Brown', 'david.brown@company.com', '+91-9876543214', 'Finance', 'Accountant', '2024-03-12', true);

-- Add some sample tasks for the employees
INSERT INTO employee_tasks (employee_id, title, description, priority, status, due_date, assigned_by) VALUES
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP001'), 'Develop User Authentication Module', 'Implement secure login and registration system using JWT', 'high', 'in_progress', '2025-08-15', (SELECT id FROM employee_profiles WHERE employee_id = 'EMP002')),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP001'), 'Fix Login Bug', 'Resolve the issue with password reset functionality', 'urgent', 'assigned', '2025-08-05', (SELECT id FROM employee_profiles WHERE employee_id = 'EMP002')),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP003'), 'Setup CI/CD Pipeline', 'Configure automated deployment pipeline for the project', 'medium', 'assigned', '2025-08-20', (SELECT id FROM employee_profiles WHERE employee_id = 'EMP002')),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP004'), 'Create Marketing Campaign', 'Design and implement Q3 marketing strategy', 'medium', 'in_progress', '2025-08-25', (SELECT id FROM employee_profiles WHERE employee_id = 'EMP002')),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP005'), 'Monthly Financial Report', 'Prepare comprehensive financial analysis for July', 'high', 'assigned', '2025-08-10', (SELECT id FROM employee_profiles WHERE employee_id = 'EMP002'));

-- Add some sample task updates
INSERT INTO task_updates (task_id, employee_id, update_text, hours_worked, progress_percentage) VALUES
  ((SELECT id FROM employee_tasks WHERE title = 'Develop User Authentication Module'), (SELECT id FROM employee_profiles WHERE employee_id = 'EMP001'), 'Completed JWT implementation and testing', 6.5, 75),
  ((SELECT id FROM employee_tasks WHERE title = 'Create Marketing Campaign'), (SELECT id FROM employee_profiles WHERE employee_id = 'EMP004'), 'Finished market research and competitor analysis', 4.0, 40);

-- Add some attendance records
INSERT INTO daily_attendance (employee_id, login_date, login_time, status) VALUES
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP001'), CURRENT_DATE, CURRENT_TIMESTAMP - INTERVAL '2 hours', 'present'),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP003'), CURRENT_DATE, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'present'),
  ((SELECT id FROM employee_profiles WHERE employee_id = 'EMP004'), CURRENT_DATE, CURRENT_TIMESTAMP - INTERVAL '30 minutes', 'present');

-- Grant employee role to these dummy users (this would be done by admin in real scenario)
-- Note: These user_ids are random, in production you'd need actual auth.users records
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const TestJobApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testDirectApplication = async () => {
    setIsLoading(true);
    console.log('🧪 Starting direct test application...');

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('🧪 Current user:', user);
      console.log('🧪 User error:', userError);

      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive"
        });
        return;
      }

      // Get user's candidate profile
      const { data: profile, error: profileError } = await supabase
        .from('candidate_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      console.log('🧪 Candidate profile:', profile);
      console.log('🧪 Profile error:', profileError);

      if (!profile) {
        toast({
          title: "No profile found",
          description: "Please complete your profile first",
          variant: "destructive"
        });
        return;
      }

      // Get a job to apply to
      const { data: job, error: jobError } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('is_active', true)
        .limit(1)
        .single();

      console.log('🧪 Job:', job);
      console.log('🧪 Job error:', jobError);

      if (!job) {
        toast({
          title: "No jobs found",
          description: "No active jobs available",
          variant: "destructive"
        });
        return;
      }

      // Try to create application
      console.log('🧪 Attempting to create application...');
      const applicationData = {
        job_id: job.id,
        candidate_id: profile.id,
        application_status: 'applied',
        cover_letter: 'Test application from debug component'
      };

      console.log('🧪 Application data:', applicationData);

      const { data: result, error: appError } = await supabase
        .from('job_applications')
        .insert(applicationData)
        .select('*')
        .single();

      console.log('🧪 Application result:', result);
      console.log('🧪 Application error:', appError);

      if (appError) {
        console.error('🧪 Application failed:', appError);
        toast({
          title: "Application Failed",
          description: `Error: ${appError.message}`,
          variant: "destructive"
        });
      } else {
        console.log('🧪 Application successful!');
        toast({
          title: "Test Application Successful!",
          description: `Applied to ${job.title}`,
        });
      }

    } catch (error) {
      console.error('🧪 Unexpected error:', error);
      toast({
        title: "Unexpected Error",
        description: `${error}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-yellow-50">
      <h3 className="font-bold mb-2">Debug: Test Job Application</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This is a test component to debug the job application issue.
        Check the console for detailed logs.
      </p>
      <Button 
        onClick={testDirectApplication}
        disabled={isLoading}
        variant="outline"
      >
        {isLoading ? 'Testing...' : 'Test Direct Application'}
      </Button>
    </div>
  );
};
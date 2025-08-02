import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Use the shared client instead of creating a new one
import { supabase } from '@/integrations/supabase/client';

export const TestJobApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testDirectApplication = async () => {
    setIsLoading(true);
    console.log('🧪 Starting direct test application...');

    try {
      // Test 1: Check if we can connect to Supabase at all
      console.log('🧪 Testing basic connection...');
      const { data: connectionTest, error: connectionError } = await supabase
        .from('jobs')
        .select('id')
        .limit(5);
      
      console.log('🧪 Connection test result:', connectionTest);
      console.log('🧪 Connection error:', connectionError);

      // Test 2: Try to query jobs table 
      console.log('🧪 Testing jobs table access...');
      const { data: jobsTest, error: jobsError } = await supabase
        .from('jobs')
        .select('id, title')
        .limit(1);
      
      console.log('🧪 Jobs test result:', jobsTest);
      console.log('🧪 Jobs error:', jobsError);

      if (jobsError) {
        toast({
          title: "Jobs Table Error",
          description: `Error accessing jobs table: ${jobsError.message}`,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Connection Test Complete",
        description: "Check console for detailed results",
      });

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
      <h3 className="font-bold mb-2">Debug: Database Connection Test</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Testing if we can connect to Supabase and access tables at all.
        Check the console for detailed logs.
      </p>
      <Button 
        onClick={testDirectApplication}
        disabled={isLoading}
        variant="outline"
      >
        {isLoading ? 'Testing...' : 'Test Database Connection'}
      </Button>
    </div>
  );
};
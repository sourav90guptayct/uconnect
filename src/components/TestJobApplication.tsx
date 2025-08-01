import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Create a fresh client to test if there's a configuration issue
const testClient = createClient(
  "https://dlgrlanmnvpwladkhexb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZ3JsYW5tbnZwd2xhZGtoZXhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTY2NTAsImV4cCI6MjA2ODU5MjY1MH0.ql17Vfaz7fEFFE9HxX2VxYJBo50vUghXKZZgCUFo9HE"
);

export const TestJobApplication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const testDirectApplication = async () => {
    setIsLoading(true);
    console.log('🧪 Starting direct test application...');

    try {
      // Test 1: Check if we can connect to Supabase at all
      console.log('🧪 Testing basic connection...');
      const { data: connectionTest, error: connectionError } = await testClient
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .limit(5);
      
      console.log('🧪 Connection test result:', connectionTest);
      console.log('🧪 Connection error:', connectionError);

      // Test 2: Check what tables exist
      console.log('🧪 Checking what tables exist...');
      const { data: tables, error: tablesError } = await testClient
        .rpc('exec_sql', { 
          sql: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'" 
        });
      
      console.log('🧪 Tables result:', tables);
      console.log('🧪 Tables error:', tablesError);

      // Test 3: Try direct SQL query
      console.log('🧪 Testing direct SQL...');
      const { data: sqlTest, error: sqlError } = await testClient
        .rpc('exec_sql', { sql: "SELECT 1 as test" });
      
      console.log('🧪 SQL test result:', sqlTest);
      console.log('🧪 SQL error:', sqlError);

      // Test 4: Try to query jobs with fresh client (no auth needed since RLS is disabled)
      console.log('🧪 Testing jobs table access...');
      const { data: jobsTest, error: jobsError } = await testClient
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
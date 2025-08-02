import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export function useEmployeeCheck() {
  const { user } = useAuth();
  const [isEmployee, setIsEmployee] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkEmployeeStatus = async () => {
      if (!user) {
        setIsEmployee(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('employee_profiles')
          .select('id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (isMounted) {
          setIsEmployee(!!data && !error);
        }
      } catch (error) {
        if (isMounted) {
          setIsEmployee(false);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkEmployeeStatus();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { isEmployee, loading };
}
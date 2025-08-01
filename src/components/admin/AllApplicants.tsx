import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Eye, Mail, Phone, MapPin, Download } from 'lucide-react';

interface JobApplicantWithJob {
  id: string;
  cover_letter: string;
  application_status: string;
  applied_at: string;
  candidate_profiles: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    profile_summary: string;
    total_experience: string;
    current_city: string;
    expected_salary: number;
    user_id: string;
    resume_url?: string;
  };
  jobs: {
    id: string;
    title: string;
    company_name: string;
  };
  candidate_email?: string;
}

export default function AllApplicants() {
  const [applicants, setApplicants] = useState<JobApplicantWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  const fetchAllApplicants = async () => {
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          id,
          cover_letter,
          application_status,
          applied_at,
          candidate_profiles:candidate_id (
            id,
            first_name,
            last_name,
            phone,
            profile_summary,
            total_experience,
            current_city,
            expected_salary,
            user_id,
            resume_url
          ),
          jobs:job_id (
            id,
            title,
            company_name
          )
        `)
        .order('applied_at', { ascending: false });

      if (error) throw error;

      // Get email addresses for candidates
      if (data && data.length > 0) {
        const applicantsWithEmail = await Promise.all(
          data.map(async (applicant) => {
            try {
              const { data: email, error: emailError } = await supabase
                .rpc('get_user_email', { user_uuid: applicant.candidate_profiles.user_id });
              
              return {
                ...applicant,
                candidate_email: emailError ? 'Not available' : email || 'Not available'
              };
            } catch {
              return {
                ...applicant,
                candidate_email: 'Not available'
              };
            }
          })
        );
        setApplicants(applicantsWithEmail);
      } else {
        setApplicants(data || []);
      }
    } catch (error) {
      console.error('Error fetching all applicants:', error);
      toast({
        title: "Error",
        description: "Failed to fetch job applicants.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ application_status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Application status updated to ${newStatus}.`
      });

      fetchAllApplicants();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatSalary = (amount: number) => {
    if (!amount) return 'Not specified';
    return `₹${(amount / 100000).toFixed(1)} LPA`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'screening':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'offer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading all applicants...</p>
      </div>
    );
  }

  if (applicants.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No applications received yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {applicants.length} application{applicants.length !== 1 ? 's' : ''} received across all jobs
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Expected Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{applicant.jobs.title}</div>
                    <div className="text-sm text-muted-foreground">{applicant.jobs.company_name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {applicant.candidate_profiles.first_name} {applicant.candidate_profiles.last_name}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {applicant.candidate_profiles.current_city}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm">
                      <Mail className="h-3 w-3" />
                      {applicant.candidate_email}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {applicant.candidate_profiles.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {applicant.candidate_profiles.total_experience}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatSalary(applicant.candidate_profiles.expected_salary)}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(applicant.application_status)}>
                    {applicant.application_status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDate(applicant.applied_at)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Application Details - {applicant.candidate_profiles.first_name} {applicant.candidate_profiles.last_name}
                          </DialogTitle>
                          <DialogDescription>
                            Applied for {applicant.jobs.title} at {applicant.jobs.company_name} on {formatDate(applicant.applied_at)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Contact Information</h4>
                            <div className="space-y-1 text-sm">
                              <div>Email: {applicant.candidate_email}</div>
                              <div>Phone: {applicant.candidate_profiles.phone}</div>
                              <div>Location: {applicant.candidate_profiles.current_city}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Professional Details</h4>
                            <div className="space-y-1 text-sm">
                              <div>Experience: {applicant.candidate_profiles.total_experience}</div>
                              <div>Expected Salary: {formatSalary(applicant.candidate_profiles.expected_salary)}</div>
                            </div>
                          </div>

                          {applicant.candidate_profiles.profile_summary && (
                            <div>
                              <h4 className="font-medium mb-2">Profile Summary</h4>
                              <p className="text-sm text-muted-foreground">
                                {applicant.candidate_profiles.profile_summary}
                              </p>
                            </div>
                          )}

                          {applicant.cover_letter && (
                            <div>
                              <h4 className="font-medium mb-2">Cover Letter</h4>
                              <p className="text-sm text-muted-foreground">
                                {applicant.cover_letter}
                              </p>
                            </div>
                          )}

                          {applicant.candidate_profiles.resume_url && (
                            <div>
                              <h4 className="font-medium mb-2">Resume</h4>
                              <Button asChild size="sm" variant="outline">
                                <a 
                                  href={applicant.candidate_profiles.resume_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download Resume
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Select
                      value={applicant.application_status}
                      onValueChange={(value) => updateApplicationStatus(applicant.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      candidate_education: {
        Row: {
          candidate_id: string
          course_name: string
          created_at: string
          education_level: Database["public"]["Enums"]["education_level"]
          id: string
          institute_name: string
          percentage: number | null
          specialization: string | null
          year_of_passing: number | null
        }
        Insert: {
          candidate_id: string
          course_name: string
          created_at?: string
          education_level: Database["public"]["Enums"]["education_level"]
          id?: string
          institute_name: string
          percentage?: number | null
          specialization?: string | null
          year_of_passing?: number | null
        }
        Update: {
          candidate_id?: string
          course_name?: string
          created_at?: string
          education_level?: Database["public"]["Enums"]["education_level"]
          id?: string
          institute_name?: string
          percentage?: number | null
          specialization?: string | null
          year_of_passing?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_education_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_experience: {
        Row: {
          candidate_id: string
          company_name: string
          created_at: string
          designation: string
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          end_date: string | null
          id: string
          is_current_job: boolean | null
          job_description: string | null
          location: string | null
          salary: number | null
          start_date: string
        }
        Insert: {
          candidate_id: string
          company_name: string
          created_at?: string
          designation: string
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: string
          is_current_job?: boolean | null
          job_description?: string | null
          location?: string | null
          salary?: number | null
          start_date: string
        }
        Update: {
          candidate_id?: string
          company_name?: string
          created_at?: string
          designation?: string
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: string
          is_current_job?: boolean | null
          job_description?: string | null
          location?: string | null
          salary?: number | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_experience_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          caste: string | null
          created_at: string
          current_city: string | null
          current_salary: number | null
          date_of_birth: string | null
          disability_status: string | null
          expected_salary: number | null
          family_details: string | null
          first_name: string
          gender: string | null
          home_location: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          last_name: string
          marital_status: string | null
          notice_period: number | null
          phone: string | null
          profile_picture_url: string | null
          profile_summary: string | null
          resume_url: string | null
          total_experience:
            | Database["public"]["Enums"]["experience_level"]
            | null
          updated_at: string
          user_id: string
        }
        Insert: {
          caste?: string | null
          created_at?: string
          current_city?: string | null
          current_salary?: number | null
          date_of_birth?: string | null
          disability_status?: string | null
          expected_salary?: number | null
          family_details?: string | null
          first_name: string
          gender?: string | null
          home_location?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name: string
          marital_status?: string | null
          notice_period?: number | null
          phone?: string | null
          profile_picture_url?: string | null
          profile_summary?: string | null
          resume_url?: string | null
          total_experience?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          updated_at?: string
          user_id: string
        }
        Update: {
          caste?: string | null
          created_at?: string
          current_city?: string | null
          current_salary?: number | null
          date_of_birth?: string | null
          disability_status?: string | null
          expected_salary?: number | null
          family_details?: string | null
          first_name?: string
          gender?: string | null
          home_location?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          last_name?: string
          marital_status?: string | null
          notice_period?: number | null
          phone?: string | null
          profile_picture_url?: string | null
          profile_summary?: string | null
          resume_url?: string | null
          total_experience?:
            | Database["public"]["Enums"]["experience_level"]
            | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      candidate_skills: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          proficiency_level: number | null
          skill_name: string
          years_of_experience: number | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          proficiency_level?: number | null
          skill_name: string
          years_of_experience?: number | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          proficiency_level?: number | null
          skill_name?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidate_skills_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
        }
        Relationships: []
      }
      daily_attendance: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          login_date: string
          login_time: string
          logout_time: string | null
          notes: string | null
          status: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          login_date?: string
          login_time?: string
          logout_time?: string | null
          notes?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          login_date?: string
          login_time?: string
          logout_time?: string | null
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_profiles: {
        Row: {
          created_at: string
          department: string | null
          email: string
          employee_id: string
          first_name: string
          hire_date: string | null
          id: string
          is_active: boolean | null
          last_name: string
          manager_id: string | null
          phone: string | null
          position: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          email: string
          employee_id: string
          first_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name: string
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          email?: string
          employee_id?: string
          first_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string
          manager_id?: string | null
          phone?: string | null
          position?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_tasks: {
        Row: {
          assigned_by: string | null
          assigned_date: string
          completed_at: string | null
          created_at: string
          description: string | null
          due_date: string | null
          employee_id: string
          id: string
          priority: string
          started_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_by?: string | null
          assigned_date?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          employee_id: string
          id?: string
          priority?: string
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_by?: string | null
          assigned_date?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          employee_id?: string
          id?: string
          priority?: string
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_tasks_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_tasks_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          application_status: string
          applied_at: string
          candidate_id: string
          cover_letter: string | null
          id: string
          job_id: string
          updated_at: string
        }
        Insert: {
          application_status?: string
          applied_at?: string
          candidate_id: string
          cover_letter?: string | null
          id?: string
          job_id: string
          updated_at?: string
        }
        Update: {
          application_status?: string
          applied_at?: string
          candidate_id?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          application_count: number | null
          application_deadline: string | null
          company_name: string
          created_at: string
          department: string | null
          education_requirements: string | null
          employment_type: string
          experience_required: string
          id: string
          industry_type: string | null
          is_active: boolean | null
          job_description: string
          job_highlights: string[] | null
          job_type: string
          key_responsibilities: string[] | null
          location_city: string
          location_district: string | null
          location_state: string
          posted_by: string
          preferred_skills: string[] | null
          required_skills: string[] | null
          requirements: string[] | null
          role_category: string | null
          salary_max: number | null
          salary_min: number | null
          salary_type: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_count?: number | null
          application_deadline?: string | null
          company_name: string
          created_at?: string
          department?: string | null
          education_requirements?: string | null
          employment_type?: string
          experience_required: string
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          job_description: string
          job_highlights?: string[] | null
          job_type?: string
          key_responsibilities?: string[] | null
          location_city: string
          location_district?: string | null
          location_state: string
          posted_by: string
          preferred_skills?: string[] | null
          required_skills?: string[] | null
          requirements?: string[] | null
          role_category?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_count?: number | null
          application_deadline?: string | null
          company_name?: string
          created_at?: string
          department?: string | null
          education_requirements?: string | null
          employment_type?: string
          experience_required?: string
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          job_description?: string
          job_highlights?: string[] | null
          job_type?: string
          key_responsibilities?: string[] | null
          location_city?: string
          location_district?: string | null
          location_state?: string
          posted_by?: string
          preferred_skills?: string[] | null
          required_skills?: string[] | null
          requirements?: string[] | null
          role_category?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_updates: {
        Row: {
          created_at: string
          employee_id: string
          hours_worked: number | null
          id: string
          progress_percentage: number | null
          task_id: string
          update_date: string
          update_text: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          hours_worked?: number | null
          id?: string
          progress_percentage?: number | null
          task_id: string
          update_date?: string
          update_text: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          hours_worked?: number | null
          id?: string
          progress_percentage?: number | null
          task_id?: string
          update_date?: string
          update_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_updates_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_updates_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "employee_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role_to_user: {
        Args: { user_email: string }
        Returns: undefined
      }
      get_employee_by_email: {
        Args: { employee_email: string }
        Returns: {
          id: string
          user_id: string
          employee_id: string
          first_name: string
          last_name: string
          email: string
          department: string
          position: string
          is_active: boolean
        }[]
      }
      get_user_email: {
        Args: { user_uuid: string }
        Returns: string
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "employee"
      education_level:
        | "10th"
        | "12th"
        | "diploma"
        | "bachelor"
        | "master"
        | "phd"
        | "other"
      employment_type:
        | "full_time"
        | "part_time"
        | "contract"
        | "internship"
        | "freelance"
      experience_level: "fresher" | "1-2" | "3-5" | "6-10" | "10+"
      industry_type:
        | "technology"
        | "healthcare"
        | "finance"
        | "education"
        | "retail"
        | "manufacturing"
        | "consulting"
        | "marketing"
        | "real_estate"
        | "automotive"
        | "aerospace"
        | "energy"
        | "media"
        | "hospitality"
        | "construction"
        | "agriculture"
        | "logistics"
        | "telecommunications"
        | "government"
        | "non_profit"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "employee"],
      education_level: [
        "10th",
        "12th",
        "diploma",
        "bachelor",
        "master",
        "phd",
        "other",
      ],
      employment_type: [
        "full_time",
        "part_time",
        "contract",
        "internship",
        "freelance",
      ],
      experience_level: ["fresher", "1-2", "3-5", "6-10", "10+"],
      industry_type: [
        "technology",
        "healthcare",
        "finance",
        "education",
        "retail",
        "manufacturing",
        "consulting",
        "marketing",
        "real_estate",
        "automotive",
        "aerospace",
        "energy",
        "media",
        "hospitality",
        "construction",
        "agriculture",
        "logistics",
        "telecommunications",
        "government",
        "non_profit",
        "other",
      ],
    },
  },
} as const

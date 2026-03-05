export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contractor_profiles: {
        Row: {
          company_address: string | null
          company_name: string | null
          coverage_radius_km: number | null
          created_at: string
          credits_balance: number | null
          documents_submitted: boolean | null
          id: string
          is_verified: boolean | null
          profile_description: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trade_categories: string[] | null
          user_id: string
        }
        Insert: {
          company_address?: string | null
          company_name?: string | null
          coverage_radius_km?: number | null
          created_at?: string
          credits_balance?: number | null
          documents_submitted?: boolean | null
          id?: string
          is_verified?: boolean | null
          profile_description?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trade_categories?: string[] | null
          user_id: string
        }
        Update: {
          company_address?: string | null
          company_name?: string | null
          coverage_radius_km?: number | null
          created_at?: string
          credits_balance?: number | null
          documents_submitted?: boolean | null
          id?: string
          is_verified?: boolean | null
          profile_description?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          trade_categories?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
      credits_transactions: {
        Row: {
          amount: number
          contractor_id: string
          created_at: string
          id: string
          reference: string | null
          type: Database["public"]["Enums"]["credit_type"]
        }
        Insert: {
          amount: number
          contractor_id: string
          created_at?: string
          id?: string
          reference?: string | null
          type: Database["public"]["Enums"]["credit_type"]
        }
        Update: {
          amount?: number
          contractor_id?: string
          created_at?: string
          id?: string
          reference?: string | null
          type?: Database["public"]["Enums"]["credit_type"]
        }
        Relationships: []
      }
      customer_profiles: {
        Row: {
          created_at: string
          home_address: string | null
          id: string
          job_address: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          home_address?: string | null
          id?: string
          job_address?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          home_address?: string | null
          id?: string
          job_address?: string | null
          user_id?: string
        }
        Relationships: []
      }
      engagements: {
        Row: {
          contractor_id: string
          created_at: string
          credits_used: number | null
          id: string
          job_id: string
          status: Database["public"]["Enums"]["engagement_status"]
        }
        Insert: {
          contractor_id: string
          created_at?: string
          credits_used?: number | null
          id?: string
          job_id: string
          status?: Database["public"]["Enums"]["engagement_status"]
        }
        Update: {
          contractor_id?: string
          created_at?: string
          credits_used?: number | null
          id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["engagement_status"]
        }
        Relationships: [
          {
            foreignKeyName: "engagements_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number | null
          created_at: string
          description: string | null
          id: string
          month: number | null
          reference_number: string | null
          role: Database["public"]["Enums"]["invoice_role"]
          status: Database["public"]["Enums"]["invoice_status"]
          user_id: string
          year: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          month?: number | null
          reference_number?: string | null
          role?: Database["public"]["Enums"]["invoice_role"]
          status?: Database["public"]["Enums"]["invoice_status"]
          user_id: string
          year?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string | null
          id?: string
          month?: number | null
          reference_number?: string | null
          role?: Database["public"]["Enums"]["invoice_role"]
          status?: Database["public"]["Enums"]["invoice_status"]
          user_id?: string
          year?: number | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          budget: string | null
          created_at: string
          customer_id: string
          description: string
          id: string
          location: string | null
          photo_urls: string[] | null
          service_type: Database["public"]["Enums"]["service_type"]
          status: Database["public"]["Enums"]["job_status"]
          timing: string | null
          trade_category: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          customer_id: string
          description?: string
          id?: string
          location?: string | null
          photo_urls?: string[] | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["job_status"]
          timing?: string | null
          trade_category: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          customer_id?: string
          description?: string
          id?: string
          location?: string | null
          photo_urls?: string[] | null
          service_type?: Database["public"]["Enums"]["service_type"]
          status?: Database["public"]["Enums"]["job_status"]
          timing?: string | null
          trade_category?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          mobile: string | null
          profile_picture_url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          mobile?: string | null
          profile_picture_url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          mobile?: string | null
          profile_picture_url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          amount: number | null
          contractor_id: string
          created_at: string
          id: string
          job_id: string
          message: string | null
          status: Database["public"]["Enums"]["quote_status"]
        }
        Insert: {
          amount?: number | null
          contractor_id: string
          created_at?: string
          id?: string
          job_id: string
          message?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
        }
        Update: {
          amount?: number | null
          contractor_id?: string
          created_at?: string
          id?: string
          job_id?: string
          message?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quotes_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          contractor_id: string
          created_at: string
          customer_id: string
          id: string
          job_id: string
          rating: number
        }
        Insert: {
          comment?: string | null
          contractor_id: string
          created_at?: string
          customer_id: string
          id?: string
          job_id: string
          rating: number
        }
        Update: {
          comment?: string | null
          contractor_id?: string
          created_at?: string
          customer_id?: string
          id?: string
          job_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          contractor_id: string
          end_date: string | null
          id: string
          plan_name: string
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
        }
        Insert: {
          contractor_id: string
          end_date?: string | null
          id?: string
          plan_name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Update: {
          contractor_id?: string
          end_date?: string | null
          id?: string
          plan_name?: string
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "contractor"
      credit_type: "purchase" | "spend" | "refund"
      engagement_status: "active" | "completed" | "bad_lead"
      invoice_role: "customer" | "contractor"
      invoice_status: "paid" | "unpaid"
      job_status: "open" | "engaged" | "completed" | "archived"
      quote_status: "pending" | "accepted" | "declined"
      service_type:
        | "multiple_quotes"
        | "estimate"
        | "instant_booking"
        | "site_assessment"
        | "inspection"
      subscription_status: "active" | "expired"
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
      app_role: ["admin", "customer", "contractor"],
      credit_type: ["purchase", "spend", "refund"],
      engagement_status: ["active", "completed", "bad_lead"],
      invoice_role: ["customer", "contractor"],
      invoice_status: ["paid", "unpaid"],
      job_status: ["open", "engaged", "completed", "archived"],
      quote_status: ["pending", "accepted", "declined"],
      service_type: [
        "multiple_quotes",
        "estimate",
        "instant_booking",
        "site_assessment",
        "inspection",
      ],
      subscription_status: ["active", "expired"],
    },
  },
} as const

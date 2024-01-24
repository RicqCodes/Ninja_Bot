export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bot_update: {
        Row: {
          created_at: string
          id: number
          router: string | null
          status: boolean
          token_chain: string | null
          token_pair: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          router?: string | null
          status: boolean
          token_chain?: string | null
          token_pair: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          router?: string | null
          status?: boolean
          token_chain?: string | null
          token_pair?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_onboarded: boolean
          updated_at: string | null
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_onboarded?: boolean
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_onboarded?: boolean
          updated_at?: string | null
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          default_chain: string | null
          default_chain_id: number | null
          gas_price_to_use: number | null
          id: number
          inserted_at: string
          slippage: number | null
          swap_version: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          default_chain?: string | null
          default_chain_id?: number | null
          gas_price_to_use?: number | null
          id?: number
          inserted_at?: string
          slippage?: number | null
          swap_version?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          default_chain?: string | null
          default_chain_id?: number | null
          gas_price_to_use?: number | null
          id?: number
          inserted_at?: string
          slippage?: number | null
          swap_version?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tokens_owned: {
        Row: {
          amount_bought: string
          amount_received: string
          chain: number
          contract_address: string
          created_at: string
          id: number
          token_name: string
          user_id: string
        }
        Insert: {
          amount_bought: string
          amount_received: string
          chain: number
          contract_address: string
          created_at?: string
          id?: number
          token_name: string
          user_id?: string
        }
        Update: {
          amount_bought?: string
          amount_received?: string
          chain?: number
          contract_address?: string
          created_at?: string
          id?: number
          token_name?: string
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount_in: number
          amount_out: number
          id: number
          inserted_at: string
          token_in: string
          token_out: string
          trade_type: string
          transaction_hash: string
          user_id: string
        }
        Insert: {
          amount_in: number
          amount_out: number
          id?: number
          inserted_at?: string
          token_in: string
          token_out: string
          trade_type: string
          transaction_hash: string
          user_id?: string
        }
        Update: {
          amount_in?: number
          amount_out?: number
          id?: number
          inserted_at?: string
          token_in?: string
          token_out?: string
          trade_type?: string
          transaction_hash?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_secrets: {
        Row: {
          created_at: string
          id: number
          pk: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          pk: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          pk?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

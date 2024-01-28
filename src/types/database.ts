import { Chain } from "@/lib/interfaces/chainTypes";

// Common interface for options with an id
interface BaseOptions {
  id?: number;
  user_id?: string;
  created_at?: string;
}

// Profile options interface
export interface ProfileOptions extends BaseOptions {
  selectedColumns?: string[];
  username?: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  wallet_address?: string;
  is_onboarded?: string;
  updated_at?: string;
}

// Setting options interface
export interface SettingOptions extends BaseOptions {
  selectedColumns?: string[];
  slippage?: string;
  default_chain?: string;
  default_chain_id?: string;
  gas_price_to_use?: string;
  swap_version?: string;
  updated_at?: string;
}

// Token owned options interface
export interface TokenOwnedOptions extends BaseOptions {
  selectedColumns?: string[];
  token_name: string;
  contract_address: string;
  amount_bought: string; // Make amount_bought explicitly allow undefined
  amount_received: string;
  chain: number;
}

// Transaction options interface
export interface TransactionOptions extends BaseOptions {
  selectedColumns?: string[];
  amount_in: number;
  amount_out: number;
  token_in: string;
  token_out: string;
  transaction_hash: string;
  trade_type: string;
}

// User secret options interface
export interface UserSecretOptions extends BaseOptions {
  selectedColumns?: string[];
  pk?: string;
}

// Bot update options interface
export interface BotUpdateOptions extends BaseOptions {
  selectedColumns?: string[];
  router?: string;
  status?: boolean;
  token_pair?: string;
  token_chain?: string;
}

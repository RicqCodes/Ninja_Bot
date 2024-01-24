const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

const isDevelopment = process.env.NODE_ENV === "development";

const redirectUrl = isDevelopment
  ? process.env.NEXT_PUBLIC_DEV_REDIRECT_TO!
  : process.env.NEXT_PUBLIC_PROD_REDIRECT_TO;
const ethereum_rpc = process.env.NEXT_PUBLIC_ALCHEMY_RPC_ETHEREUM;
const goerli_rpc = process.env.NEXT_PUBLIC_ALCHEMY_RPC_GOERLI;
const optimism_rpc = process.env.NEXT_PUBLIC_ALCHEMY_RPC_OPTIMISM;
const arbitrum_rpc = process.env.NEXT_PUBLIC_ALCHEMY_RPC_ARBITRUM;
const base_rpc = process.env.NEXT_PUBLIC_ALCHEMY_RPC_BASE;
const bsc_rpc = process.env.NEXT_PUBLIC_BSC_RPC;

export {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  redirectUrl,
  ethereum_rpc,
  goerli_rpc,
  optimism_rpc,
  arbitrum_rpc,
  base_rpc,
  bsc_rpc,
  isDevelopment,
  encryptionKey,
};

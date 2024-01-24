import binance_logo from "@/assets/bsc-logo.svg";
import base_logo from "@/assets/base-logo-in-blue.svg";
import optimsim_logo from "@/assets/optimism-logo.svg";
import arbitrum_logo from "@/assets/arbitrum-logo.svg";
import ethereum_logo from "@/assets/ethereum-logo.svg";

interface SupportedWallet {
  [key: string]: {
    blockchain_name: string;
    symbol: string;
    logo: string;
    chain_id: number;
    main_chain_logo: string | null;
    layer_2: boolean;
    layer_type: string | null;
    price?: string;
    balance?: string;
  };
}

interface Chains {
  goerli: {
    chain_id: number;
  };
  ethereum: {
    chain_id: number;
  };
  bsc: {
    chain_id: number;
  };
  base: {
    chain_id: number;
  };
  optimism: {
    chain_id: number;
  };
  arbitrum: {
    chain_id: number;
  };
}

export const chains: Chains = {
  goerli: {
    chain_id: 5,
  },
  ethereum: {
    chain_id: 1,
  },
  bsc: {
    chain_id: 56,
  },
  base: {
    chain_id: 8453,
  },
  optimism: {
    chain_id: 10,
  },
  arbitrum: {
    chain_id: 42161,
  },
};

export const chains_id = {
  [chains.ethereum.chain_id]: "Ethereum",
  [chains.bsc.chain_id]: "BSC",
  [chains.arbitrum.chain_id]: "Arbitrum",
  [chains.base.chain_id]: "Base",
  [chains.optimism.chain_id]: "Optimism",
};

export const supportedWallet: SupportedWallet = {
  [chains.goerli.chain_id]: {
    blockchain_name: "Goerli",
    symbol: "ETH",
    logo: ethereum_logo,
    main_chain_logo: null,
    chain_id: chains.goerli.chain_id,
    layer_2: false,
    layer_type: null,
    price: "",
    balance: "",
  },
  [chains.ethereum.chain_id]: {
    blockchain_name: "Ethereum",
    symbol: "ETH",
    logo: ethereum_logo,
    main_chain_logo: null,
    chain_id: chains.ethereum.chain_id,
    layer_2: false,
    layer_type: null,
    price: "",
    balance: "",
  },
  [chains.bsc.chain_id]: {
    blockchain_name: "Binance Smart Chain",
    symbol: "BSC",
    logo: binance_logo,
    main_chain_logo: null,
    chain_id: chains.bsc.chain_id,
    layer_2: false,
    layer_type: null,
    price: "",
    balance: "",
  },
  [chains.base.chain_id]: {
    blockchain_name: "Base",
    symbol: "ETH",
    logo: base_logo,
    main_chain_logo: ethereum_logo,
    chain_id: chains.base.chain_id,
    layer_2: true,
    layer_type: "ethereum",
    price: "",
    balance: "",
  },
  [chains.optimism.chain_id]: {
    blockchain_name: "Optimism",
    symbol: "ETH",
    logo: optimsim_logo,
    main_chain_logo: ethereum_logo,
    chain_id: chains.optimism.chain_id,
    layer_2: true,
    layer_type: "ethereum",
    price: "",
    balance: "",
  },
  [chains.arbitrum.chain_id]: {
    blockchain_name: "Arbitrum",
    symbol: "ETH",
    logo: arbitrum_logo,
    main_chain_logo: ethereum_logo,
    chain_id: chains.arbitrum.chain_id,
    layer_2: true,
    layer_type: "ethereum",
    price: "",
    balance: "",
  },
};

export const defaultChains = Object.values(supportedWallet).map(
  (chain) => chain
);

export const defaultTokens = [
  {
    name: "Ethereum",
    ticker: "ETH",
    logo: supportedWallet[1].logo,
    chain: "mainnet",
    chain_id: chains.ethereum.chain_id,
  },
  {},
];

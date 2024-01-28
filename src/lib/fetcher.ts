import { JsonRpcProvider, ethers } from "ethers";
import {
  ethereum_rpc,
  optimism_rpc,
  arbitrum_rpc,
  base_rpc,
  bsc_rpc,
  goerli_rpc,
} from "./config";
import { chains } from "./networks";
import { toast } from "react-toastify";

type PriceResponse = {
  symbol: string;
  price: string;
};

export class fetcher {
  private goerliProvider: JsonRpcProvider;
  private ethereumProvider: JsonRpcProvider;
  private optimismProvider: JsonRpcProvider;
  private arbitrumProvider: JsonRpcProvider;
  private baseProvider: JsonRpcProvider;
  private bscProvider: JsonRpcProvider;

  constructor() {
    this.goerliProvider = new JsonRpcProvider(goerli_rpc);
    this.ethereumProvider = new JsonRpcProvider(ethereum_rpc);
    this.optimismProvider = new JsonRpcProvider(optimism_rpc);
    this.arbitrumProvider = new JsonRpcProvider(arbitrum_rpc);
    this.baseProvider = new JsonRpcProvider(base_rpc);
    this.bscProvider = new JsonRpcProvider(bsc_rpc);
  }

  public async getNativeBalancesWithPrices(address: string | null) {
    if (address === null) {
      toast.error("Wallet address is not available", {
        hideProgressBar: undefined,
      });
      return;
    }
    const goerliBalance = await this.goerliProvider.getBalance(address);
    const mainnetBalance = await this.ethereumProvider.getBalance(address);
    const bnbBalance = await this.bscProvider.getBalance(address);
    const optimismEthBalance = await this.optimismProvider.getBalance(address);
    const arbitrumEthBalance = await this.arbitrumProvider.getBalance(address);
    const baseEthBalance = await this.baseProvider.getBalance(address);

    const ethPrice = await fetcher.getPrice("ETH", true);
    const bnbPrice = await fetcher.getPrice("BNB", true);

    return {
      balance: {
        [chains.goerli.chain_id]: goerliBalance,
        [chains.ethereum.chain_id]: mainnetBalance,
        [chains.bsc.chain_id]: bnbBalance,
        [chains.optimism.chain_id]: optimismEthBalance,
        [chains.arbitrum.chain_id]: arbitrumEthBalance,
        [chains.base.chain_id]: baseEthBalance,
      },
      prices: {
        [chains.goerli.chain_id]: ethPrice?.price,
        [chains.ethereum.chain_id]: ethPrice?.price,
        [chains.bsc.chain_id]: bnbPrice?.price,
        [chains.optimism.chain_id]: ethPrice?.price,
        [chains.arbitrum.chain_id]: ethPrice?.price,
        [chains.base.chain_id]: ethPrice?.price,
      },
    };
  }

  public static async getPrice(
    ticker: string,
    CEX: boolean
  ): Promise<PriceResponse | null> {
    if (CEX) {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${ticker.toUpperCase()}USDT`
        );

        if (res.ok) {
          const { symbol, price } = await res.json();
          return { symbol, price };
        } else {
          console.error(`Failed to fetch price for ${ticker}`);
          return { symbol: "", price: "0" };
        }
      } catch (error) {
        console.error(`Error fetching price for ${ticker}: ${error}`);
        return { symbol: "", price: "0" };
      }
    }

    return null;
  }

  public async getSingleBalance(address: string | null, chain: string) {
    if (address === null) return;
    if (chain?.toLowerCase() === "ethereum") {
      const bal = await this.ethereumProvider.getBalance(address);
      return ethers.formatEther(bal);
    } else if (chain?.toLowerCase() === "arbitrum") {
      const bal = await this.arbitrumProvider.getBalance(address);
      return ethers.formatEther(bal);
    } else if (
      chain?.toLowerCase() === "bsc" ||
      chain?.toLowerCase() === "binance smart chain"
    ) {
      const bal = await this.bscProvider.getBalance(address);
      return ethers.formatEther(bal);
    } else if (chain?.toLowerCase() == "optimism") {
      const bal = await this.optimismProvider.getBalance(address);
      return ethers.formatEther(bal);
    } else if (chain?.toLowerCase() === "base") {
      const bal = await this.baseProvider.getBalance(address);
      return ethers.formatEther(bal);
    } else if (chain?.toLowerCase() === "goerli") {
      const bal = await this.goerliProvider.getBalance(address);
      return ethers.formatEther(bal);
    }
  }
}

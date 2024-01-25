import {
  AbiCoder,
  TransactionReceiptParams,
  ethers,
  formatEther,
  formatUnits,
  parseUnits,
} from "ethers";
import "dotenv/config";
import {
  FACTORYV2,
  PAIRV2,
  ROUTERV2,
  WRAPPEDETH,
  FACTORYV3,
  ROUTERV3,
  POOLV3,
  QUOTERV2,
  ERC20DECIMAL,
} from "./abis";
import { Chain, ethChains } from "./interfaces/chainTypes";

export class NinjaBot {
  private factoryObjV2 = {
    GOERLI: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    ETH: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    BSC: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    OPTIMISM: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    ARBITRUM: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    BASE: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  };
  private routerObjV2 = {
    GOERLI: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    ETH: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    BSC: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    OPTIMISM: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    ARBITRUM: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    BASE: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  };
  private factoryObjV3 = {
    GOERLI: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    ETH: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    BSC: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    OPTIMISM: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    ARBITRUM: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    BASE: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
  };
  private routerObjV3 = {
    GOERLI: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    ETH: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    BSC: "0x1b81D678ffb9C0263b24A97847620C99d213eB14",
    OPTIMISM: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    ARBITRUM: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
    BASE: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45",
  };

  private wrapped = {
    GOERLI: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    ETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    BSC: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    OPTIMISM: "0x4200000000000000000000000000000000000006",
    ARBITRUM: "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3",
    BASE: "0x4200000000000000000000000000000000000006",
  };

  private quoterObjV2 = {
    GOERLI: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    ETH: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    BSC: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
    OPTIMISM: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    ARBITRUM: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
    BASE: "0x61fFE014bA17989E743c5F6cB21bF9697530B21e",
  };

  private rpcs = {
    bsc: process.env.NEXT_PUBLIC_BSC_RPC!,
    eth: process.env.NEXT_PUBLIC_ALCHEMY_RPC_ETHEREUM!,
    goerli: process.env.NEXT_PUBLIC_ALCHEMY_RPC_GOERLI!,
    optimism: process.env.NEXT_PUBLIC_ALCHEMY_RPC_OPTIMISM!,
    arbitrum: process.env.NEXT_PUBLIC_ALCHEMY_RPC_ARBITRUM!,
    base: process.env.NEXT_PUBLIC_ALCHEMY_RPC_BASE!,
  };
  private provider!: ethers.JsonRpcProvider;
  private walletSigner!: ethers.Wallet;
  private factoryV2!: ethers.Contract;
  private factoryV3!: ethers.Contract;
  private routerV2!: ethers.Contract;
  private routerV3!: ethers.Contract;
  private quoterV2!: ethers.Contract;
  private erc20!: ethers.Contract;
  private pair1!: string;
  private threshold!: bigint;

  constructor(
    private PRIVATEKEY: string,
    public tokenAddress: string,
    private chain: Chain // public version: string
  ) {
    this._setupRPCs(chain);
    this._connectSigner(PRIVATEKEY);
    this._generateContractCall();
  }

  private _getPair1(chain: string) {
    return this.wrapped[chain as keyof typeof this.wrapped];
  }

  private _generateContractCall(): void {
    // Setup for version 2
    this.factoryV2 = new ethers.Contract(
      this.factoryObjV2[this.chain],
      FACTORYV2,
      this.provider
    );
    this.routerV2 = new ethers.Contract(
      this.routerObjV2[this.chain],
      ROUTERV2,
      this.walletSigner
    );

    // Setup for version 3
    this.factoryV3 = new ethers.Contract(
      this.factoryObjV3[this.chain],
      FACTORYV3,
      this.provider
    );

    this.routerV3 = new ethers.Contract(
      this.routerObjV3[this.chain],
      ROUTERV3,
      this.walletSigner
    );

    this.quoterV2 = new ethers.Contract(
      this.quoterObjV2[this.chain],
      QUOTERV2,
      this.walletSigner
    );

    this.erc20 = new ethers.Contract(
      this.tokenAddress,
      ERC20DECIMAL,
      this.provider
    );
  }

  private _connectSigner(privateKey: string) {
    this.walletSigner = new ethers.Wallet(privateKey, this.provider);
  }

  private _setupRPCs(chain: string) {
    this.provider = new ethers.JsonRpcProvider(
      this.rpcs[chain.toLowerCase() as keyof typeof this.rpcs]
    );
    this.pair1 = this._getPair1(chain);
    this.threshold = ethChains.includes(chain)
      ? ethers.parseUnits("0.1", 18)
      : ethers.parseUnits("0.009", 18);
  }

  private async _checkForPair(
    tokenAddress: string
  ): Promise<{ found: any; version: string; liquidty?: string } | null> {
    const v2Pair = await this._checkForV2Pair(tokenAddress);

    if (v2Pair) {
      return v2Pair;
    }

    const v3Liquidity = await this._checkForV3Pair(tokenAddress);

    if (v3Liquidity) {
      return v3Liquidity;
    }

    return null;
  }

  private async _checkForV2Pair(tokenAddress: string) {
    const foundPair = await this.factoryV2.getPair(tokenAddress, this.pair1);
    if (ethers.ZeroAddress === foundPair) return null;
    return { found: foundPair, version: "v2" };
  }

  private async _checkForV3Pair(tokenAddress: string) {
    // Use the fee level corresponding to 0.3% (you can adjust this based on your needs)
    const feeLevel = 3000;

    // Step 1: Get the pool address for the token pair
    const poolAddress = await this.factoryV3.getPool(
      tokenAddress,
      this.pair1,
      feeLevel
    );

    if (poolAddress === ethers.ZeroAddress) return null;

    // Step 2: Query the pool contract to get the NonfungiblePositionManager address
    const poolContract = new ethers.Contract(
      poolAddress,
      POOLV3,
      this.provider
    );

    const liquidity = await poolContract.liquidity();

    return { found: poolAddress, version: "v3", liquidity };
  }

  private async _isLiquidityEnough(param_1: {
    found: string;
    version: string;
    liquidity?: string;
  }): Promise<"enough" | "less" | "non"> {
    if (param_1.version === "v2") {
      // 1. Get pair contract
      const pairContract = new ethers.Contract(
        param_1.found,
        PAIRV2,
        this.provider
      );

      // 2. Get pair reserves
      const reserves = await pairContract.getReserves();

      if (reserves[1] > 0n && reserves[1] < this.threshold) {
        return "less";
      } else if (reserves[1] > 0n && reserves[1] >= this.threshold) {
        return "enough";
      } else {
        return "non";
      }
    } else if (param_1.version === "v3") {
      if (
        BigInt(param_1.liquidity!) > 0n &&
        BigInt(param_1.liquidity!) < this.threshold
      ) {
        return "less";
      } else if (
        BigInt(param_1.liquidity!) > 0n &&
        BigInt(param_1.liquidity!) >= this.threshold
      ) {
        return "enough";
      } else {
        return "non";
      }
    } else {
      return "non";
    }
  }

  private async getPriceInNativeCurrency(pairAddress: string) {
    // 1. Get pair contract
    const pairContract = new ethers.Contract(
      pairAddress,
      PAIRV2,
      this.provider
    );

    // 2. Get pair reserves
    const reserves = await pairContract.getReserves();
    // 4. Get Price for token in native coin
    const priceToNative =
      Number(reserves[1].toString()) / Number(reserves[0].toString());

    return priceToNative; // Price in ETH
  }

  private async _checkPairAvailability(
    tokenAddress: string
  ): Promise<{ found: any; version: string; liquidity?: string }> {
    const foundPair = await this._checkForPair(tokenAddress);

    if (!foundPair) {
      // If not available, wait for 5 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
      return await this._checkPairAvailability(tokenAddress); // Check again after the delay
    }
    return foundPair;
  }

  async trade(
    tokenAddress: string,
    amount: number,
    slippage: number,
    version: string,
    retryCount: number = 0
  ) {
    if (retryCount >= 3) {
      console.log("Max retry limit reached, trade failed.");
      process.exit(0);
    }

    // Trade configurations
    const ethAmount = ethers.parseEther(amount.toString());
    const maxPriorityFeePerGas = (await this.provider.getFeeData())
      .maxPriorityFeePerGas;
    const nonce = await this.walletSigner.getNonce();

    // get decimal
    const decimal = await this.erc20.decimals();
    const name = await this.erc20.name();

    try {
      // Carry out Trade
      if (version === "v2") {
        const receipt = await this.v2Swap(
          ethAmount,
          slippage,
          name,
          decimal,
          maxPriorityFeePerGas!
        );

        // Access the logs
        const logData = receipt.logs[receipt.logs.length - 1].data;
        const parsedLog = ethers.AbiCoder.defaultAbiCoder().decode(
          ["uint256", "uint256", "uint256", "uint256"],
          logData
        );

        const parsedData = {
          token: this.tokenAddress,
          amountBought: formatUnits(parsedLog[1].toString(), decimal),
          amountReceived: formatUnits(parsedLog[3].toString(), decimal),
          decimal,
          name,
          version: "V2",
        };

        return parsedData;
      } else if (version === "v3") {
        let wrappedReceipt: TransactionReceiptParams;
        let approvalReceipt: TransactionReceiptParams;
        let swapReceipt: TransactionReceiptParams;

        // STEP 1: wrapped ETH first
        wrappedReceipt = await this.wrapNativeToken(ethAmount);

        // STEP 2: Approve token to be swapped
        approvalReceipt = await this.approveAddrToSpendWrappedNativeToken(
          this.routerObjV3[this.chain],
          ethAmount
        );

        // STEP 3: Swap ETH for tokens
        swapReceipt = await this.v3Swap(
          ethAmount,
          slippage,
          name,
          decimal,
          maxPriorityFeePerGas!
        );

        console.log(swapReceipt, "receipt of v3 swap");

        const logData = swapReceipt.logs[swapReceipt.logs.length - 1].data;
        const parsedLog = ethers.AbiCoder.defaultAbiCoder().decode(
          ["int256", "int256", "int256", "int256"],
          logData
        );

        const parsedData = {
          token: this.tokenAddress,
          amountBought: formatUnits(parsedLog[1].toString(), decimal),
          amountReceived: formatUnits(
            parsedLog[0].toString().slice(1),
            decimal
          ),
          decimal,
          name,
          version: "V3",
        };
        console.log(parsedData);
        return parsedData;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async snipe(amount: number, slippage = 5) {
    try {
      slippage = Number(slippage / 100);
      console.time("Execution Time"); // Start measuring execution time

      let result = await this._checkPairAvailability(this.tokenAddress);

      // Check if Threshold >= reserves
      const isTradable = await this._isLiquidityEnough(result);
      if (isTradable === "enough") {
        const receipt = await this.trade(
          this.tokenAddress,
          amount,
          slippage,
          result.version
        );

        return receipt;
      } else if (isTradable === "non") {
        console.log(
          "Liquidity not available or recent trade detected. Retrying..."
        );
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 3 seconds before retrying
        await this.snipe(amount, slippage); // Recursively retry
      } else {
        console.log("Cant continue, not enough liquidity added");
      }

      console.timeEnd("Execution Time"); // End measuring execution time and log it
    } catch (err) {
      console.log(err);
    }
  }

  async wrapNativeToken(amountIn: BigInt | number, retryCount = 0) {
    if (typeof amountIn === "number")
      amountIn = ethers.parseEther(amountIn.toString());
    const wrappedETH = new ethers.Contract(
      this.wrapped[this.chain as keyof typeof this.wrapped],
      WRAPPEDETH,
      this.walletSigner
    );

    const maxPriorityFeePerGas = (await this.provider.getFeeData())
      .maxPriorityFeePerGas;

    if (retryCount >= 3) {
      console.log("Max retry limit reached, trade failed.");
      return;
    }
    let receipt;
    try {
      const deposit_txn = await wrappedETH.deposit({
        nonce: await this.walletSigner.getNonce(),
        chainId: this.rpcs[this.chain as keyof typeof this.rpcs],
        gasLimit: 2000000,
        maxPriorityFeePerGas,
        maxFeePerGas: BigInt(100 * 10 ** 8),
        value: amountIn,
      });

      receipt = await deposit_txn.wait();
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait 300 milliseconds before retrying
      await this.wrapNativeToken(amountIn, retryCount + 1); //
    }
    return receipt;
  }

  async approveAddrToSpendWrappedNativeToken(
    address: string,
    amount = BigInt(2 ** 256 - 1),
    retryCount = 0
  ) {
    const wrappedETH = new ethers.Contract(
      this.wrapped[this.chain as keyof typeof this.wrapped],
      WRAPPEDETH,
      this.walletSigner
    );

    const maxPriorityFeePerGas = (await this.provider.getFeeData())
      .maxPriorityFeePerGas;

    if (retryCount >= 3) {
      console.log("Max retry limit reached, trade failed.");
      return "could not approve contract to spend tokens";
    }

    try {
      const approve_txn = await wrappedETH.approve(address, amount, {
        nonce: await this.walletSigner.getNonce(),
        gasLimit: 100_000,
        maxPriorityFeePerGas,
        maxFeePerGas: BigInt(100 * 10 ** 9),
      });

      const receipt = await approve_txn.wait();
      return receipt;
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait 300 milliseconds before retrying
      await this.approveAddrToSpendWrappedNativeToken(
        address,
        (amount = BigInt(2 ** 256 - 1)),
        retryCount + 1
      );
    }
  }

  async v2Swap(
    ethAmount: any,
    slippage: number,
    name: string,
    decimal: number,
    maxPriorityFeePerGas: bigint,
    retryCount: number = 0
  ) {
    if (retryCount >= 3) {
      console.log("Max retry limit reached, trade failed.");
      return `could not swap ETH for ${name} using the version 2 router`;
    }
    try {
      const buyTxParams = {
        nonce: await this.walletSigner.getNonce(),
        from: this.walletSigner.address,
        chainId: this.rpcs[this.chain as keyof typeof this.rpcs],
        gasLimit: 500_000,
        maxPriorityFeePerGas,
        maxFeePerGas: BigInt(100 * 10 ** 8),
        value: ethAmount,
      };

      const path = [this.pair1, this.tokenAddress];
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expiryDate = nowInSeconds + 900;

      // Calc slippage
      const [_, token_out_amount] = await this.routerV2.getAmountsOut(
        ethAmount,
        path
      );

      const adjustedAmountOutMin =
        Number(token_out_amount) * (1 - Number(slippage));

      const txn = await this.routerV2.swapExactETHForTokens(
        BigInt(adjustedAmountOutMin),
        path,
        this.walletSigner.address,
        expiryDate,
        buyTxParams
      );

      const receipt = await txn.wait();

      return receipt;
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait 300 milliseconds before retrying
      await this.v2Swap(
        ethAmount,
        slippage,
        name,
        decimal,
        maxPriorityFeePerGas,
        retryCount + 1
      );
    }
  }
  async v3Swap(
    ethAmount: any,
    slippage: number,
    name: string,
    decimal: number,
    maxPriorityFeePerGas: bigint,
    retryCount: number = 0
  ) {
    if (retryCount >= 3) {
      console.log("Max retry limit reached, trade failed.");
      return `could not swap ETH for ${name}`;
    }
    try {
      const [amountOut] = await this.quoterV2.quoteExactInputSingle.staticCall([
        this.pair1,
        this.tokenAddress,
        ethAmount,
        3000,
        0,
      ]);

      const parsedAmountOut = formatUnits(amountOut.toString(), decimal);

      // Calc slippage
      const adjustedAmountOutMin = +parsedAmountOut * (1 - slippage);

      const tx_params: [
        string,
        string,
        number,
        string,
        BigInt,
        BigInt,
        number
      ] = [
        this.pair1,
        this.tokenAddress,
        3000,
        this.walletSigner.address,
        ethAmount,
        ethers.parseEther(adjustedAmountOutMin.toString()),
        0,
      ];

      const txn = await this.routerV3.exactInputSingle(tx_params, {
        from: this.walletSigner.address,
        gasLimit: 1_500_000,
        maxPriorityFeePerGas,
        maxFeePerGas: BigInt(100 * 10 ** 8),
        nonce: await this.walletSigner.getNonce(),
      });

      const receipt = await txn.wait();

      return receipt;
    } catch (err) {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Wait 300 milliseconds before retrying
      await this.v3Swap(
        ethAmount,
        slippage,
        name,
        decimal,
        maxPriorityFeePerGas,
        retryCount + 1
      );
    }
  }
}

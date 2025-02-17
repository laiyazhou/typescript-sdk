import { ContractWrapper } from "./contract-wrapper";
import { IMintableERC20, IMulticall } from "contracts";
import { Erc20 } from "./erc-20";
import { TokenMintInput } from "../../schema";
import { TransactionResult } from "../types";
import { FEATURE_TOKEN_BATCH_MINTABLE } from "../../constants/erc20-features";
import { DetectableFeature } from "../interfaces/DetectableFeature";

/**
 * Mint Many ERC20 Tokens at once
 * @remarks Token batch minting functionality that handles unit parsing for you.
 * @example
 * ```javascript
 * const contract = sdk.getContract("{{contract_address}}");
 * await contract.token.mint.batch.to(walletAddress, [nftMetadata1, nftMetadata2, ...]);
 * ```
 * @public
 */
export class Erc20BatchMintable implements DetectableFeature {
  featureName = FEATURE_TOKEN_BATCH_MINTABLE.name;
  private contractWrapper: ContractWrapper<IMintableERC20 & IMulticall>;
  private erc20: Erc20;

  constructor(
    erc20: Erc20,
    contractWrapper: ContractWrapper<IMintableERC20 & IMulticall>,
  ) {
    this.erc20 = erc20;
    this.contractWrapper = contractWrapper;
  }

  /**
   * Mint Tokens To Many Wallets
   *
   * @remarks Mint tokens to many wallets in one transaction.
   *
   * @example
   * ```javascript
   * // Data of the tokens you want to mint
   * const data = [
   *   {
   *     toAddress: "{{wallet_address}}", // Address to mint tokens to
   *     amount: 0.2, // How many tokens to mint to specified address
   *   },
   *  {
   *    toAddress: "0x...",
   *    amount: 1.4,
   *  }
   * ]
   *
   * await contract.mintBatchTo(data);
   * ```
   */
  public async to(args: TokenMintInput[]): Promise<TransactionResult> {
    const encoded = [];
    for (const arg of args) {
      encoded.push(
        this.contractWrapper.readContract.interface.encodeFunctionData(
          "mintTo",
          [arg.toAddress, await this.erc20.normalizeAmount(arg.amount)],
        ),
      );
    }
    return { receipt: await this.contractWrapper.multiCall(encoded) };
  }
}

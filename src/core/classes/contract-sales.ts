import { IPrimarySale } from "contracts";
import { ContractWrapper } from "./contract-wrapper";
import { TransactionResult } from "../types";
import { FEATURE_PRIMARY_SALE } from "../../constants/thirdweb-features";
import { DetectableFeature } from "../interfaces/DetectableFeature";

/**
 * Handle primary sales recipients
 * @remarks Configure primary sale recipients for an entire contract.
 * @example
 * ```javascript
 * const contract = sdk.getContract("{{contract_address}}");
 * const salesRecipient = await contract.sales.getRecipient();
 * await contract.roles.setRecipient(recipientWalletAddress);
 * ```
 * @public
 */
export class ContractPrimarySale<TContract extends IPrimarySale>
  implements DetectableFeature
{
  featureName = FEATURE_PRIMARY_SALE.name;
  private contractWrapper;

  constructor(contractWrapper: ContractWrapper<TContract>) {
    this.contractWrapper = contractWrapper;
  }

  /**
   * Get the primary sale recipient.
   * @returns the wallet address.
   */
  public async getRecipient(): Promise<string> {
    return await this.contractWrapper.readContract.primarySaleRecipient();
  }

  /**
   * Set the primary sale recipient
   * @param recipient - the wallet address
   */
  public async setRecipient(recipient: string): Promise<TransactionResult> {
    return {
      receipt: await this.contractWrapper.sendTransaction(
        "setPrimarySaleRecipient",
        [recipient],
      ),
    };
  }
}

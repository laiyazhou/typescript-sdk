<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thirdweb-dev/sdk](./sdk.md) &gt; [Erc20SignatureMinting](./sdk.erc20signatureminting.md)

## Erc20SignatureMinting class

Enables generating ERC20 Tokens with rules and an associated signature, which can then be minted by anyone securely

<b>Signature:</b>

```typescript
export declare class Erc20SignatureMinting 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(contractWrapper, roles)](./sdk.erc20signatureminting._constructor_.md) |  | Constructs a new instance of the <code>Erc20SignatureMinting</code> class |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [generate(mintRequest)](./sdk.erc20signatureminting.generate.md) |  | Generate a signature that can be used to mint a certain amount of tokens |
|  [generateBatch(payloadsToSign)](./sdk.erc20signatureminting.generatebatch.md) |  | Generate a batch of signatures that can be used to mint many token signatures. |
|  [mint(signedPayload)](./sdk.erc20signatureminting.mint.md) |  | Mint tokens from a signature |
|  [mintBatch(signedPayloads)](./sdk.erc20signatureminting.mintbatch.md) |  | Mint any number of generated tokens signatures at once |
|  [verify(signedPayload)](./sdk.erc20signatureminting.verify.md) |  | Verify that a payload is correctly signed |


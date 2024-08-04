import wallet from "../wallets/wba-dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createMetadataAccountV3, CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionArgs,DataV2Args, updateMetadataAccountV2, UpdateMetadataAccountV2InstructionArgs} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { sign } from "crypto";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("BvT3DtWAHvNzhtfAoEwy6eRJSXT45mn2x9LL2aoy9QDV")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {

        let accounts: CreateMetadataAccountV3InstructionAccounts = {
          mint: mint,
          mintAuthority: signer,
          updateAuthority: signer
        }

        // token metadata. this will be used in instruction arguments below
        let metadata: DataV2Args = {
            name: "Demi",
            symbol: "DEM",
            uri:"",
            sellerFeeBasisPoints: 200,
            creators: null, // used for NFTs
            collection: null, // used for NFT
            uses: null // used for NFTs
        }

        let args_for_create: CreateMetadataAccountV3InstructionArgs = {
            data: metadata,
            isMutable: false,
            collectionDetails: null
        }

        // TODO: make another class where you update your metadata account
        // let args_for_update: UpdateMetadataAccountV2InstructionArgs = {      
        // }

        // create a metadata account
        let tx_create = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args_for_create
            }
        );

        // update metadata account
        // let tx_update = updateMetadataAccountV2(
        // );

        let result = await tx_create.sendAndConfirm(umi);    
        console.log(bs58.encode(result.signature)); 

    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

/* 
    NOTE: If you got this error when you run yarn spl_metadata, then the reason might be you are running the code second time. Try to update metadata instead of create.

    Oops, something went wrong: Error: Simulation failed. 
Message: Transaction simulation failed: Error processing Instruction 0: custom program error: 0x0.
Logs:
[
  "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]",
  "Program log: IX: Create Metadata Accounts v3",
  "Program 11111111111111111111111111111111 invoke [2]",
  "Program 11111111111111111111111111111111 success",
  "Program log: Allocate space for the account",
  "Program 11111111111111111111111111111111 invoke [2]",
  "Allocate: account Address { address: J5LjLFxQnVKQwSse6SCKDp1LnMqnbHeyNvs4wFQjMz5f, base: None } already in use",
  "Program 11111111111111111111111111111111 failed: custom program error: 0x0",
  "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 17353 of 200000 compute units",
  "Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s failed: custom program error: 0x0"
].

*/

// region: Note to Self
/*
Here we create metadata account for our token to be minted.

       let metadata: DataV2Args = {
            name: "Your Token Name",
            symbol: "SYM",
            uri: "https://your-token-uri.com",
            sellerFeeBasisPoints: 500,
            creators: [
                {
                    address: signer.publicKey,
                    verified: true,
                    share: 100
                }
            ], // (optional)
            collection: null, // which collection this token will be belong to(used for NFTs). (optional) 
            uses: null // how many times the token can be used. for assets with limited use. (optional)
        };


    // collection object looks like:
    collection: {
        key: publicKey("<collection public key>"), // Replace with your collection public key
        verified: false // Set to true if the collection is verified
    }

    // uses object looks like:
      uses: {
        useMethod: "Single", // Method of use
        remaining: 10, // Remaining uses
        total: 10 // Total uses
    }

    // uri in metadata is for additional metadata. It points to the json file allows you to store extensive metadata about the token in a centralized location(a server, IPFS, or Arweave). 
    This way, you are not limited by the on-chain storage limitations and costs.
    
*/
// endregion Note to Self

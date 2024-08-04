import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../wallets/wba-dev-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi); // nft signer
const metadataUri = "https://arweave.net/bhoZvTO_F951s3vZP9Y92jFfORKqqsPteUQVf8C7lqE"; // obtained it from nft_metadata.ts

(async () => {
    // this will create NFt Master Edition 
    let tx = createNft(umi,
        {
            mint: mint,
            name: "Demi Rug", 
            uri: metadataUri,
            sellerFeeBasisPoints: percentAmount(1) // 100
        }); // why do we pass name of the nft here? It is already indicated in metadata URI? because they are present only on attribute tab; not on the main page

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);

    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();


// region: Note to Self
/*
Here we minted NFT to this account H7zCg8cPunEFus8ZtoJ7BZkeFnQR1rFPnSpUFgbzU1Nm. Creator is assigned automatically
and that is my keypair's public key. 

Mint transaction:
https://explorer.solana.com/tx/2fqgdPMDpmeLCPdwqenUZRKKUTegxtVbqfEN8u9g51v48cVfp2MCUXhyrwjb3RmE9WAotDvbCem1P1aJfhMjGda6?cluster=devnet
*/
// endregion: Note to Self
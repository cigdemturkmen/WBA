import wallet from "../wallets/wba-dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        const image = await readFile("C:/Users/cigde/source/repos/solana-starter/ts/assets/generug.png" ); // buffer

        //2. Convert image to generic file.
        const genericFile = createGenericFile(image, "generug", { contentType: "image/png"});

        //3. Upload image
        const [myUri] = await umi.uploader.upload([genericFile]);

        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// region: Note to Self
/*
Here we are uploading our nft image to Arweave by using irysUploader.

The result Uri of my image is :  https://arweave.net/8fkkkkf-w86OqEYKIxKtuqy95_UKZQi7skLpILHwhvo
*/
// endregion: Note to Self
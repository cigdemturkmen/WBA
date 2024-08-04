import wallet from "..//wallets/wba-dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const imageUri = "https://arweave.net/8fkkkkf-w86OqEYKIxKtuqy95_UKZQi7skLpILHwhvo"
        const metadata = {
            name: "Demi Rug",
            symbol: "DRG",
            description: "Rare rug from Demi",
            image: imageUri,
            attributes: [
                {trait_type: 'fabric', value: 'cotton'},
                {trait_type: 'durability', value: '10/10'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: imageUri
                    },
                ]
            },
            creators: [] // array of public keys
        };
        const myUri = await umi.uploader.uploadJson(metadata); // uri for whole metadata (not only image)
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

// region: Note to Self
/*
Here we are uploading our whole metadata with the image to Arweave by using irysUploader.

The result Uri of metadata is :  https://arweave.net/bhoZvTO_F951s3vZP9Y92jFfORKqqsPteUQVf8C7lqE
*/
// endregion: Note to Self
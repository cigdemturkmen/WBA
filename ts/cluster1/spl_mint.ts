import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wallets/wba-dev-wallet.json"

// you have your mint account(obtained from spl_init), now its time to mint them.

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

/* The n suffix at the end of the number 1_000_000 indicates that this is a BigInt. 
The underscores (_) are used as a separator for readability, and they don't affect the value. This makes it easier to read large numbers.*/
const token_decimals = 1_000_000n; 

// Mint address
const mint_public_key = new PublicKey("BvT3DtWAHvNzhtfAoEwy6eRJSXT45mn2x9LL2aoy9QDV");

(async () => {
    try {
        // TODO: play with different commitment levels. What happens in each different commitment level when we pass as a parameter?
        // Create an ATA (associated token account). This token account will be associated with my wallet account.
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint_public_key, keypair.publicKey,);
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        const ata_pub_key = new PublicKey(ata.address.toBase58());
        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint_public_key, ata_pub_key,keypair.publicKey,(1n * token_decimals)); // 1 * 1000000 works as well
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

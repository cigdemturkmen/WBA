import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wallets/wba-dev-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BvT3DtWAHvNzhtfAoEwy6eRJSXT45mn2x9LL2aoy9QDV");

// Recipient address
const to = new PublicKey("BvhV49WPYBbzPu8Fpy8YnPnwhNWLbm9Vmdj2T5bNSotS"); // Leo's wallet
// const to = new PublicKey("6EsRadWwgopHPNZvF64zewX8Pgd2svTDUJ3rtStBreKH"); // Cadet Praash's wallet

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        let fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);

        // Get the token account of the toWallet address, and if it does not exist, create it
        let toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to);

        // Transfer the new token to the "toTokenAccount" we just created
        let tx = await transfer(connection, keypair, fromTokenAccount.address, toTokenAccount.address, keypair.publicKey, 1n * 1_000_000n); // you can write 1e6 too

        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${tx}?cluster=devnet`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();


// region: Note to Self
/*
Here we transfer the token we have created to another wallet. If this wallet has no token account for our token, 
we create a token account in his wallet and send token there.

When you look at the transaction hash, you will not see recipient's wallet public key but instead, 
you will see the (associated)token account created on recipient's wallet. You will also not see sender's 
wallet address; you will see its ata public key instead.
*/
// endregion: Note to Self
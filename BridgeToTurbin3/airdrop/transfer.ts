import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js"

import wallet from "./dev-wallet.json"

// Import dev wallet which has SOL in it
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// Define Second Account Public Key
/* Make sure you are in the right directory in the terminal before running "yarn keygen" to create a second wallet to receive a tx */
const to = new PublicKey("4aA18qjgPisC99WzVExCxaBqE2o9uvPc34N78CaK3qW3");


//Create a Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com");


(async () => {
    try {
        // create a transaction and add instruction
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey:  to,
                lamports: LAMPORTS_PER_SOL/100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        
        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        );
        console.log(`Success! Check out your TX here: 
        https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

// terminal -> yarn transfer
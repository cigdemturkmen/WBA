use solana_client::rpc_client::RpcClient;
use solana_program::{pubkey::Pubkey, system_instruction::transfer};
use solana_sdk::{signature::{read_keypair_file, Signer},transaction::Transaction,};
use std::str::FromStr;

const RPC_URL: &str = "https://api.devnet.solana.com";

pub fn transfer_sol() {
    // Import our keypair
    let keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");
    // let _check_public_key = keypair.pubkey().to_string();
    
    // Define our WBA public key (the wallet which will receive tokens):
    let to_pubkey = Pubkey::from_str("Gy7nU5LzZkmP2yxVjDEYw3x7u17geBJSgSLiGsdXFMxw").unwrap();

    // Create a Solana devnet connection
    let rpc_client = RpcClient::new(RPC_URL);

    // Get recent blockhash
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .expect("Failed to get recent blockhash");

    // create a transaction and sign it
    let transaction = Transaction::new_signed_with_payer(
        &[transfer(&keypair.pubkey(), &to_pubkey, 100_000_000)],
        Some(&keypair.pubkey()),
        &vec![&keypair],
        recent_blockhash,
    );

    // Send the transaction
    let signature = rpc_client
        .send_and_confirm_transaction(&transaction)
        .expect("Failed to send transaction");

    println!(
        "Success! Check out your TX here:
    https://explorer.solana.com/tx/{}/?cluster=devnet",
        signature
    );
}

// region :  Note to Self
/*
    Why do we need recent blockhash? In order to sign a transaction we need recent blockhash as well as keypair.
 */
//endregion :  Note to Self

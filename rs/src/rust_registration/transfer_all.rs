use solana_client::rpc_client::RpcClient;
use solana_program::{pubkey::Pubkey, system_instruction::transfer};
use solana_sdk::{message::Message,signature::{read_keypair_file, Signer},transaction::Transaction,};
use std::str::FromStr;

const RPC_URL: &str = "https://api.devnet.solana.com";

pub fn transfer_all_sol() {
    // Import our keypair
    let keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");
    // Define our WBA public key (the wallet which will receive tokens):
    let to_pubkey = Pubkey::from_str("Gy7nU5LzZkmP2yxVjDEYw3x7u17geBJSgSLiGsdXFMxw").unwrap();

    // Create a Solana devnet connection
    let rpc_client = RpcClient::new(RPC_URL);

    // Get total balance of wallet to be emptied
    let balance = rpc_client
        .get_balance(&keypair.pubkey())
        .expect("Failed to get balance");

    // Get recent blockhash
    let recent_blockhash = rpc_client
        .get_latest_blockhash()
        .expect("Failed to get recent blockhash");

    // Create a mock transaction to calculate fees
    let message = Message::new_with_blockhash(
        &[transfer(&keypair.pubkey(), &to_pubkey, balance)],
        Some(&keypair.pubkey()),
        &recent_blockhash,
    );

    // Calculate exact fee rate to transfer entire SOL amount out of account minus fees
    let fee = rpc_client
        .get_fee_for_message(&message)
        .expect("Failed to get fee calculator");

    // create the ACTUAL transaction: Deduct fee from total lamports amount
    let transaction = Transaction::new_signed_with_payer(
        &[transfer(&keypair.pubkey(), &to_pubkey, balance - fee)],
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


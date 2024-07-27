use crate::programs::wba_prereq::{CompleteArgs, UpdateArgs, WbaPrereqProgram};
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    signature::{read_keypair_file, Signer},
    transaction::Transaction, system_program
};

const RPC_URL: &str = "https://api.devnet.solana.com";

pub fn complete_registration() {
    let rpc_client = RpcClient::new(RPC_URL);

    let signer = read_keypair_file("../BridgeToTurbin3/airdrop/dev-wallet.json").expect("Couldn't find wallet file");

    // Create a PDA for wba_prereq account
    let prereq =
        WbaPrereqProgram::derive_program_address(&[b"prereq", signer.pubkey().to_bytes().as_ref()]);

    // Define instruction data
    let args = CompleteArgs {
        github: b"cigdemturkmen".to_vec(),
    };

    // Get recent blockhash
    let blockhash = rpc_client
        .get_latest_blockhash()
        .expect("Failed to get recent blockhash");

    // Now we can invoke the "complete" function
    let complete = WbaPrereqProgram::complete(
        &[&signer.pubkey(), &prereq, &system_program::id()],
        &args,
        Some(&signer.pubkey()),
        &[&signer],
        blockhash,
    );
    let transaction = complete;

    // Send the transaction
    let signature = rpc_client
        .send_and_confirm_transaction(&transaction)
        .expect("Failed to send transaction");

    println!(
        "Success! Check out your TX here: https://explorer.solana.com/tx/{}/?cluster=devnet",
        signature
    );
}

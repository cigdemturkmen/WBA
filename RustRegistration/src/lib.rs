#[cfg(test)]
mod keygen; // Declares the keygen module.
mod tests {

    use super::*; // instead of using "use crate::keygen;" use super::* to import all items from the parent module

    use bs58;
    use std::io::{self, BufRead};

    use solana_client::rpc_client::RpcClient;
    use solana_sdk::signature::{read_keypair_file, Keypair, Signer};
    const RPC_URL: &str = "https://api.devnet.solana.com";

    #[test]
    fn test_keygen() {
        keygen::keygen();
    }
    #[test]
    fn airdop() {
        // Import our keypair
        let keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");
        let client = RpcClient::new(RPC_URL);

        match client.request_airdrop(&keypair.pubkey(), 2_000_000_000u64) {
            Ok(s) => {
            println!("Success! Check out your TX here:");
            println!("https://explorer.solana.com/tx/{}?cluster=devnet", s.to_string());
            },
            Err(e) => println!("Oops, something went wrong: {}", e.to_string())
            };
    }
    #[test]
    fn transfer_sol() {}

    #[test]
    fn base58_to_wallet() {
        println!("Input your private key as base58:");
        let stdin = io::stdin();
        let base58 = stdin.lock().lines().next().unwrap().unwrap();
        println!("Your wallet file is:");
        let wallet = bs58::decode(base58).into_vec().unwrap();
        println!("{:?}", wallet);
    }
    #[test]
    fn wallet_to_base58() {
        println!("Input your private key as a wallet file byte array:");
        let stdin = io::stdin();
        let wallet = stdin
            .lock()
            .lines()
            .next()
            .unwrap()
            .unwrap()
            .trim_start_matches('[')
            .trim_end_matches(']')
            .split(',')
            .map(|s| s.trim().parse::<u8>().unwrap())
            .collect::<Vec<u8>>();
        println!("Your private key is:");
        let base58 = bs58::encode(wallet).into_string();
        println!("{:?}", base58);
    }
}

// region: Note to Self

/*

#[cfg(test)] attribute makes the keygen module available only when running tests. In other words, #[cfg(test)] attribute helps in including the keygen module only during test compilation, keeping it out of production builds.


super::* is used within a module to bring all items from the parent module into the current scope(keygen.ts, airdrop.ts etc...). This is particularly useful in the context of tests.
    use solana_sdk;


Solana wallet files use a byte array ([117, 209,...., 155, 128]), Phantom uses a base58 encoded string representation(gdTXY...UGhPt) of private keys. Use the bs58 crate to convert one format to another.



*/

// endregion: Note to Self

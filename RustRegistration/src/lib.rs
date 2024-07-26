#[cfg(test)]
mod keygen; // Declares the keygen module.
mod tests {
    
    use super::*; // instead of using "use crate::keygen;" use super::* to import all items from the parent module

    use bs58;
 use std::io::{self, BufRead};

    #[test]
    fn test_keygen() {
    keygen::keygen();
    }
    #[test]
    fn airdop() {
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
    let wallet =
    stdin.lock().lines().next().unwrap().unwrap().trim_start_matches('[').trim_end_matches(']').split(',')
    .map(|s| s.trim().parse::<u8>().unwrap()).collect::<Vec<u8>>();
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
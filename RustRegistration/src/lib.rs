mod keygen; // Declares the keygen module.
mod airdrop;
mod transfer;
mod transfer_all;
mod wallet_format_converter;
mod complete_registration;
mod programs;

#[cfg(test)]
mod tests {

   use super::*;
 
    #[test]
    fn test_keygen() {
        keygen::keygen();
    }
    #[test]
    fn test_airdop() {
        airdrop::airdrop();
    }
    #[test]
    fn test_transfer_sol() {
        transfer::transfer_sol();
    }

    #[test]
    fn test_transfer_all() {
        transfer_all::transfer_all_sol();
    }

    #[test]
    fn test_complete() {
        complete_registration::complete_registration();
    }

    #[test]
    fn test_base58_to_wallet() {
        wallet_format_converter::base58_to_wallet();
    }
    #[test]
    fn test_wallet_to_base58() {
        wallet_format_converter::wallet_to_base58();
    }
}

// region: Note to Self

/*

#[cfg(test)] attribute makes the tests module available only when running tests. In other words, #[cfg(test)] attribute helps in including the tests module only during test compilation, keeping it out of production builds.


super::* is used within a module to bring all items from the parent module into the current scope(keygen.rs, airdrop.rs etc...). This is particularly useful in the context of tests.


Solana wallet files use a byte array ([117, 209,...., 155, 128]), Phantom uses a base58 encoded string representation(gdTXY...UGhPt) of private keys. Use the bs58 crate to convert one format to another.


*/

// endregion: Note to Self

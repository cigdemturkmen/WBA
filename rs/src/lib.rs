mod programs;
mod rust_registration {
    pub mod keygen;
    pub mod airdrop;
    pub mod transfer;
    pub mod transfer_all;
    pub mod enroll;
}
mod helper {
    pub mod wallet_format_converter;
}


#[cfg(test)]
mod tests {

   use super::*;
 
    #[test]
    fn test_keygen() {
        rust_registration::keygen::keygen();
    }
    #[test]
    fn test_airdop() {
        rust_registration::airdrop::airdrop();
    }
    #[test]
    fn test_transfer_sol() {
        rust_registration::transfer::transfer_sol();
    }

    #[test]
    fn test_transfer_all() {
        rust_registration::transfer_all::transfer_all_sol();
    }

    #[test]
    fn test_complete() {
        rust_registration::enroll::complete_registration();
    }

    #[test]
    fn test_base58_to_wallet() {
        helper::wallet_format_converter::base58_to_wallet();
    }
    #[test]
    fn test_wallet_to_base58() {
        helper::wallet_format_converter::wallet_to_base58();
    }
}

// region: Note to Self

/*

#[cfg(test)] attribute makes the tests module available only when running tests. In other words, #[cfg(test)] attribute helps in including the tests module only during test compilation, keeping it out of production builds.


super::* is used within a module to bring all items from the parent module into the current scope(keygen.rs, airdrop.rs etc...). This is particularly useful in the context of tests.


Solana wallet files use a byte array ([117, 209,...., 155, 128]), Phantom uses a base58 encoded string representation(gdTXY...UGhPt) of private keys. Use the bs58 crate to convert one format to another.


*/

// endregion: Note to Self

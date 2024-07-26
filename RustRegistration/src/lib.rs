#[cfg(test)]
mod keygen; // Declares the keygen module.
mod tests {
    
    use super::*; // instead of using "use crate::keygen;" use super::* to import all items from the parent module

    #[test]
    fn test_keygen() {
    keygen::keygen();
    }
    #[test]
    fn airdop() {
    }
    #[test]
    fn transfer_sol() {}
}


// region: Note to Self

/*

#[cfg(test)] attribute makes the keygen module available only when running tests. In other words, #[cfg(test)] attribute helps in including the keygen module only during test compilation, keeping it out of production builds.


super::* is used within a module to bring all items from the parent module into the current scope(keygen.ts, airdrop.ts etc...). This is particularly useful in the context of tests.
    use solana_sdk;

    
*/

// endregion: Note to Self
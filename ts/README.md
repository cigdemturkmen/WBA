**BridgeToTurbin3** (Typescript)  
https://explorer.solana.com/tx/2gKm13Mo3aWixVwi5X8XMQ9kzkDdJr54Lxuj12kULwLLhvFFXVWijC835odBZd4Tsvbu5XRAEqQbn1HwzQ7Xj9Le?cluster=devnet  

Run the following commands to create a keypair, receive an airdrop, make SOL token transafer and interact with another program(which Web3 Builders Alliance created)  

yarn keygen -> creates a wallet. returns a public and a private key.  
yarn airdrop -> receive an airdrop on solana dev net to the wallet you indicate.  
yarn transfer -> transfers Sol token from a wallet to another wallet on Solana.  
yarn enroll -> interacting with another program on solana devnet.   


**cluster1** (Typescript)  

__Fungible Token Operations__  

spl_init.ts -> create a mint account  

spl_metadata.ts -> create a metadata account which has information about the token to be minted  
  
spl_mint.ts -> create a token account to mint tokens to this token account (create an associated token account)  

spl_transfer.ts -> transfer token from an account to another  

__Non-Fungible Token Operations__  

nft_mint.ts -> create a mint account for NFT  

nft_image.ts -> upload the image of NFT to Arweave and get the URI of it  

nft_metadata.ts -> create a metadata account for NFT, put the umi you obtained from nft.image.ts  

__Vault Operations__  
  
  vault_init.ts ->  
  .  
  .  
  .  
  
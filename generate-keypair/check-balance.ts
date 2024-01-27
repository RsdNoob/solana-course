import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

const snsDomains = {
  'toly.sol': '<public_key_for_toly.sol>',
  'shaq.sol': '<public_key_for_shaq.sol>',
  'mccann.sol': '<public_key_for_mccann.sol>'
};

async function checkBalance(address) {
  try {
    const publicKey = new PublicKey(address);
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL.`
    );
  } catch (error) {
    console.error(`❌ Error for address ${address}: ${error.message}`);
  }
}

async function main() {
  const suppliedPublicKey = process.argv[2];
  
  if (suppliedPublicKey) {
    await checkBalance(suppliedPublicKey);
  } else {
    for (const domain in snsDomains) {
      await checkBalance(snsDomains[domain]);
    }
  }
}

main();

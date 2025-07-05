import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { HDNodeWallet, Wallet } from 'ethers';

const derivationPath = {
  solana: `m/44'/501'/0'/0'`,
  ethereum: `m/44'/60'/0'/0/0`,
};

const generateSolanaWallet = async (seed: Buffer<ArrayBufferLike>) => {
  const derivedSeed = derivePath(
    derivationPath.solana,
    seed.toString('hex')
  ).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  return {
    address: Keypair.fromSecretKey(new Uint8Array(secret)).publicKey.toBase58(),
    name: 'Wallet 1',
    privateKey: Buffer.from(secret).toString('hex'),
  };
};

const generateEthereumWallet = async (seed: Buffer<ArrayBufferLike>) => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath.ethereum);
  const wallet = new Wallet(child.privateKey);
  return {
    address: wallet.address,
    name: 'Wallet 1',
    privateKey: wallet.privateKey.toString(),
  };
};

export const generateWalletForNetwork = async (
  network: string,
  seed: Buffer<ArrayBufferLike>
) => {
  switch (network) {
    case 'solana':
      return await generateSolanaWallet(seed);
    case 'ethereum':
      return await generateEthereumWallet(seed);
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

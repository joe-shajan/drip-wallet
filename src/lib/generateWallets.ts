import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { HDNodeWallet, Wallet } from 'ethers';

const getSolanaDerivationPath = (idx: number) => `m/44'/501'/${idx}'/0'`;
const getEthereumDerivationPath = (idx: number) => `m/44'/60'/${idx}'/0'`;

const generateSolanaWallet = async (
  seed: Buffer<ArrayBufferLike>,
  idx: number
) => {
  const derivedSeed = derivePath(
    getSolanaDerivationPath(idx),
    seed.toString('hex')
  ).key;
  
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  return {
    address: Keypair.fromSecretKey(new Uint8Array(secret)).publicKey.toBase58(),
    name: `Wallet ${idx + 1}`,
    privateKey: Buffer.from(secret).toString('hex'),
  };
};

const generateEthereumWallet = async (
  seed: Buffer<ArrayBufferLike>,
  idx: number
) => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(getEthereumDerivationPath(idx));
  const wallet = new Wallet(child.privateKey);
  return {
    address: wallet.address,
    name: `Wallet ${idx + 1}`,
    privateKey: wallet.privateKey.toString(),
  };
};

export const generateWalletForNetwork = async (
  network: string,
  seed: Buffer<ArrayBufferLike>,
  idx: number
) => {
  switch (network) {
    case 'solana':
      return await generateSolanaWallet(seed, idx);
    case 'ethereum':
      return await generateEthereumWallet(seed, idx);
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

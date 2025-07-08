import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { HDNodeWallet, Wallet as EthersWallet } from 'ethers';
import type { Wallet as AppWallet } from '@/types/wallet';
import { networks } from '@/types/networs';

const getSolanaDerivationPath = (idx: number) => `m/44'/501'/${idx}'/0'`;
const getEthereumDerivationPath = (idx: number) => `m/44'/60'/${idx}'/0'`;

const generateSolanaWallet = async (
  seed: Buffer<ArrayBufferLike>,
  idx: number
): Promise<AppWallet> => {
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
): Promise<AppWallet> => {
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(getEthereumDerivationPath(idx));
  const wallet = new EthersWallet(child.privateKey);
  return {
    address: wallet.address,
    name: `Wallet ${idx + 1}`,
    privateKey: wallet.privateKey.toString(),
  };
};

export const generateWalletForNetwork = async (
  network: networks,
  seed: Buffer<ArrayBufferLike>,
  idx: number
): Promise<AppWallet> => {
  switch (network) {
    case 'solana':
      return await generateSolanaWallet(seed, idx);
    case 'ethereum':
      return await generateEthereumWallet(seed, idx);
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};

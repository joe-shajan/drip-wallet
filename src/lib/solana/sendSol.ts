import { SOLANA_URL_DEVNET } from '@/api/balance';
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

export interface SendSolParams {
  fromPrivateKeyHex: string;
  toAddress: string;
  amountSol: number;
  rpcUrl?: string;
}

export async function sendSol({
  fromPrivateKeyHex,
  toAddress,
  amountSol,
  rpcUrl = SOLANA_URL_DEVNET,
}: SendSolParams): Promise<string> {
  // 1. Set up the connection
  const connection = new Connection(rpcUrl, 'confirmed');

  // 2. Re-create the signer Keypair from the hex secret key
  const secretKeyBytes = Buffer.from(fromPrivateKeyHex, 'hex');
  const fromKeypair = Keypair.fromSecretKey(secretKeyBytes);

  // 3. Build the transfer instruction
  const toPubkey = new PublicKey(toAddress);
  const lamports = Math.round(amountSol * LAMPORTS_PER_SOL);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey,
      lamports,
    })
  );

  // 4. Sign, send and wait for confirmation
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    fromKeypair,
  ]);

  return signature; // You can paste this into explorer.solana.com?cluster=devnet
}

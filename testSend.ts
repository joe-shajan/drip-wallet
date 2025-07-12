// testSend.ts
import { sendSol } from './src/lib/solana/sendSol';
// import wallets from './myDevnetSender.json'; // however you store keys

(async () => {
  const sig = await sendSol({
    fromPrivateKeyHex:
      'e6e98fc7f3212905264730c0133c4220817c9bdedb03739e49506778f016c1d74b84116bda656c0e5942243f7477bd148fd78e5d8012a0d568de3b65eb4118ee',
    toAddress: 'GMJZiMoRPULzbXKdmc7dtgJWppJjK5uKSL8VLWQMi1BS',
    amountSol: 0.05,
  });
  console.log('Tx signature:', sig);
})();

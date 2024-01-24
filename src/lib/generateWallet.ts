import { Wallet } from "ethers";
import { encryptData, decryptData } from "./encrypt";
import { getStoredKey } from "./generateKey";
import { encryptionKey } from "./config";

// Helper function to generate a new private key
export const generatePrivateKey = (): string => {
  return Wallet.createRandom().privateKey;
};

// Helper function to encrypt the wallet
export const encryptPrivateKey = async (
  privateKey: string
): Promise<{
  iv: ArrayBuffer; // Initialization Vector
  data: ArrayBuffer; // Encrypted Data
}> => {
  const key = await getStoredKey();

  const encryptedWallet = await encryptData(key, privateKey);

  return encryptedWallet;
};

// Helper function to decrypt the wallet
export const decryptPrivateKey = async (encryptedWallet: {
  iv: ArrayBuffer;
  data: ArrayBuffer;
}): Promise<string> => {
  const key = await getStoredKey(); // Retrieve the stored key

  const decryptedData = await decryptData(key, encryptedWallet);

  return decryptedData;
};

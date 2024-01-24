"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Wallet } from "ethers";
import {
  decryptPrivateKey,
  encryptPrivateKey,
  generatePrivateKey,
} from "@/lib/generateWallet";
import { usePathname } from "next/navigation";
import { useSession } from "./useSession";
import {
  getUserSecrets,
  updateUserSecrets,
} from "@/lib/database_actions/user_secrets";
import { UserSecretOptions } from "@/types/database";
import { toast } from "react-toastify";

// Create a context for the wallet
const WalletContext = createContext<{
  wallet: string | null;
  pk: string | null;
  loadWallet: () => Promise<void>;
  alreadyExist: boolean;
}>({
  wallet: "",
  pk: "",
  loadWallet: async () => {},
  alreadyExist: false,
});

// Custom hook to access the wallet context
export const useWallet = () => useContext(WalletContext);

// Wallet provider component
export const WalletProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { session } = useSession();
  const [wallet, setWallet] = useState<string | null>(null);
  const [pk, setPk] = useState<string | null>(null);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const pathname = usePathname();

  const loadWallet = useCallback(async () => {
    const options: UserSecretOptions = {
      selectedColumns: ["pk"],
    };
    const secrets = await getUserSecrets(session?.user.id!, options);
    if (secrets.error) toast.error("Error fetching data, please refresh app");

    const pk = secrets.data?.pk;

    // Check if encrypted wallet exists in local storage
    if (!!pk) {
      // Decrypt the wallet and set it
      const decryptedWallet = await decryptPrivateKey(JSON.parse(pk));
      console.log(decryptedWallet, "decrypted wallet");
      setPk(decryptedWallet);

      const wallet = new Wallet(decryptedWallet);
      console.log(wallet, "wallet");
      setWallet(wallet ? wallet.address : null);
      setAlreadyExist(true);
    } else {
      // Create a new private key
      const privateKey = generatePrivateKey();
      setPk(privateKey);
      // Encrypt the private key
      const encryptedWallet = await encryptPrivateKey(privateKey);

      const options: UserSecretOptions = {
        pk: JSON.stringify(encryptedWallet),
      };

      // Save the encrypted wallet in local storage
      await updateUserSecrets(session?.user.id!, options);

      // create wallet from private key
      const wallet = new Wallet(privateKey);

      // Set the wallet
      setWallet(wallet ? wallet.address : null);
    }
  }, [session?.user.id]);

  useEffect(() => {
    if (session?.user) loadWallet();
  }, [loadWallet, pathname, session?.user]);

  return (
    <WalletContext.Provider value={{ wallet, loadWallet, pk, alreadyExist }}>
      {children}
    </WalletContext.Provider>
  );
};

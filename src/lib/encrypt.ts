// Check if window is defined (we are on client side)
const crypto = typeof window !== "undefined" ? window.crypto : null;

// Encrypt data with a given key
export async function encryptData(key: CryptoKey, data: string) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);

  if (!crypto || !crypto.subtle) {
    throw new Error("Web Crypto API is not available");
  }

  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );

  return {
    iv: iv,
    data: new Uint8Array(encryptedData),
  };
}

// Decrypt data with a given key and IV
export async function decryptData(
  key: CryptoKey,
  encryptedData: {
    iv: object; // Initialization Vector
    data: object; // Encrypted Data
  }
) {
  const data = new Uint8Array(Object.values(encryptedData.data));
  const iv = new Uint8Array(Object.values(encryptedData.iv));

  if (!crypto || !crypto.subtle) {
    throw new Error("Web Crypto API is not available");
  }

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    data
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedData);
}

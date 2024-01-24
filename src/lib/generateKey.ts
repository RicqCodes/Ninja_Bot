import { encryptionKey } from "./config";

// Generate a random encryption key
async function generateKey() {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

// Store the generated key securely
async function storeKey() {
  const key = await generateKey();

  // Convert the key to an exportable format (e.g., ArrayBuffer)
  const exportedKey = await crypto.subtle.exportKey("raw", key);

  // Convert the exported key to a base64-encoded string for storage
  const base64Key = btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(exportedKey)))
  );

  // Store the base64Key in a secure location (e.g., local storage, secure storage)
  localStorage.setItem("encryptionKey", base64Key);
}

// Retrieve the stored key
export async function getStoredKey() {
  if (!encryptionKey) {
    // Key not found, generate a new one and store it
    await storeKey();
    return await getStoredKey();
  }

  // Convert the base64-encoded key back to ArrayBuffer
  const arrayBuffer = Uint8Array.from(atob(encryptionKey), (c) =>
    c.charCodeAt(0)
  ).buffer;

  // Import the key from the ArrayBuffer
  return await crypto.subtle.importKey(
    "raw",
    arrayBuffer,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

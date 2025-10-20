import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key-here'

export function encryptFile(fileBuffer: Buffer): string {
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.lib.WordArray.create(fileBuffer),
    ENCRYPTION_KEY,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return encrypted.toString()
}

export function decryptFile(encryptedData: string): Buffer {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      encryptedData,
      ENCRYPTION_KEY,
      {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    )
    
    // Convert to WordArray first, then to Buffer
    const wordArray = decrypted
    const uint8Array = new Uint8Array(wordArray.sigBytes)
    
    for (let i = 0; i < wordArray.sigBytes; i++) {
      uint8Array[i] = (wordArray.words[Math.floor(i / 4)] >>> (24 - (i % 4) * 8)) & 0xff
    }
    
    return Buffer.from(uint8Array)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt file')
  }
}

export function generateEncryptionKey(): string {
  return CryptoJS.lib.WordArray.random(32).toString()
}

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY_HEX   = process.env.ENCRYPTION_KEY;

function getKey() {
  if (!KEY_HEX || KEY_HEX.length !== 64) return null;
  return Buffer.from(KEY_HEX, 'hex');
}

export function encrypt(text) {
  const key = getKey();
  if (!key || !text) return text;
  const iv       = crypto.randomBytes(12);
  const cipher   = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(String(text), 'utf8'), cipher.final()]);
  const tag      = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(value) {
  const key = getKey();
  if (!key || !value || !value.includes(':')) return value;
  try {
    const [ivHex, tagHex, dataHex] = value.split(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()]);
    return decrypted.toString('utf8');
  } catch {
    return value;
  }
}

export function encryptQuote(data) {
  return {
    ...data,
    name:      encrypt(data.name),
    email:     encrypt(data.email),
    company:   encrypt(data.company),
    telephone: encrypt(data.telephone),
    location:  encrypt(data.location),
  };
}

export function decryptQuote(doc) {
  if (!doc) return doc;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  return {
    ...obj,
    name:      decrypt(obj.name),
    email:     decrypt(obj.email),
    company:   decrypt(obj.company),
    telephone: decrypt(obj.telephone),
    location:  decrypt(obj.location),
  };
}

import bcrypt from 'bcryptjs';
import { UserType } from '../datasources/users';
import base64url from 'base64url';
import crypto from 'crypto';

const createToken = (userInfo: UserType) => {
  if (!process.env.SECRET) {
    throw new Error('Secret is not defined');
  }
  const header = { typ: 'JWT', alg: 'HS256' };
  const payload = {
    id: userInfo.id,
    email: userInfo.email,
    role: userInfo.role,
    name: userInfo.name,
    exp: Math.floor(Date.now() / 1000) + 36000, // expires in 1 hour
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(payload));

  const signature = crypto
    .createHmac('sha256', process.env.SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest();

  const token = `${encodedHeader}.${encodedPayload}.${base64url(signature)}`;

  return token;
};

const verifyToken = (token: string) => {
  if (!process.env.SECRET) {
    throw new Error('Secret is not defined');
  }
  try {
    const [header, payload, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.SECRET)
      .update(`${header}.${payload}`)
      .digest();

      const signatureBuffer = Buffer.from(signature, 'base64');
      const expectedSignatureBuffer = Buffer.from(base64url(expectedSignature), 'base64');
      
      if (!crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)) {
        return false;
      }
    const decodedPayload = JSON.parse(base64url.toBuffer(payload).toString());
    if (decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    return decodedPayload;
  } catch (err) {
    console.log('Failed to verify token', err);
    return false;
  }
};

const verifyPassword = (attemptedPw: string, hashedPw: string) =>
  bcrypt.compareSync(attemptedPw, hashedPw);

const hashPassword = (password: string) => bcrypt.hashSync(password);

export { createToken, verifyPassword, hashPassword, verifyToken };
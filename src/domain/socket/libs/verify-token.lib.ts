import { verify } from 'jsonwebtoken';

export function verifyToken(token: string) {
  try {
    if (!token) return false;
    return verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return false;
  }
}

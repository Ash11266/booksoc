import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyTokenFromHeader(req: Request): JwtPayload {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing or malformed token');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ Cast it to JwtPayload to access fields like user_id
    if (typeof decoded === 'string') {
      throw new Error('Invalid token payload');
    }

    return decoded as JwtPayload;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

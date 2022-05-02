import jwt, { SignOptions, Algorithm, JwtPayload } from 'jsonwebtoken';

const privateKey = process.env.JWT_PRIVATE_KEY || 'pvtk_api_boilerplate';

const defaultExpiration = '12h';

const options: SignOptions = {
  algorithm: (process.env.JWT_ALGORITHM as Algorithm) || 'HS256',
  expiresIn: defaultExpiration,
};

function generateToken(data: object, opt?: SignOptions) {
  return jwt.sign(data, privateKey, { ...options, ...opt });
}

const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, privateKey, options);
};

interface IJWT {
  id: string;
  iat: number;
  exp: number;
}

export { generateToken, verifyToken, IJWT };

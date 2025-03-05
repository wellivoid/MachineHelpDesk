import * as jwt from 'jsonwebtoken';

interface IJWTDate {
  uid: number
}

const sign = (data: IJWTDate) => {
  if (!process.env.JWT_SECRET) return 'JTW_SECRET_NOT_FOUND';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2m' });
};

const verify = (token: string): IJWTDate | 'JTW_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  if (!process.env.JWT_SECRET) return 'JTW_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded as IJWTDate;
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sign,
  verify
};
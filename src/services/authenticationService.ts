import User from "../models/user";

import bcrypt from "bcrypt";

import { sign, verify } from "jsonwebtoken";
// secret key
const SECRET = Buffer.from("node-auth").toString('base64');
const OPTIONS = {
  expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
};
// bcrypt
const SALTROUNDS = 10;

export async function singupService(data: any): Promise<any> {
  const passwordHash = await generateHash(data.password);

  data.password = passwordHash;

  const user = new User(data);

  return await user.save();
}

export async function signinService(data: any): Promise<string> {
  const user: any = await User.findOne({ email: data.email });
  
  if (user != null) {
    const status = await compareHash(data.password, user.password);
    
    let token = {};

    if(status) {
      token = sign({ data: {
        _id: user._id,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      }}, SECRET, OPTIONS);
    };
    const res: any = {
      token: token
    };
    return res;
  }else {
    const res: any = {
      msg: "Usuario não encontrado"
    };
    return res;
  }
}

//verify token
export async function authService(token: string): Promise<any> {
  try {
    const decoded: any = verify(token, SECRET);
    return await decoded.data;
  } catch (err: any) {
    const error = new Error('Erro na verificação do token');
    error.name = err.name; // Exemplo: 'JsonWebTokenError', 'TokenExpiredError'
    error.message = err.message; // Exemplo: 'Token inválido', 'Token expirado'
    return error;
  }
}

export async function generateHash(password: string): Promise<string> {
  const passwordHash = await bcrypt.hash(password, SALTROUNDS)
  .then(response => {
    return response;
  });
  return passwordHash;
}

async function compareHash(password: string, passwordHash: string): Promise<boolean> {
  const statusCompare = await bcrypt.compare(password, passwordHash)
  return statusCompare;
}
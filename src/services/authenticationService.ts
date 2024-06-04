import user from "../models/user";

import bcrypt from "bcrypt";

import { sign, verify } from "jsonwebtoken";
// secret key
const SECRET = Buffer.from("node-auth").toString('base64');
const OPTIONS = {
  expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
};
// bcrypt
const SALTROUNDS = 10;

export async function signinService(data: any): Promise<string> {
  const users: any = await user.find({ user: data.user });
  const { _id, email, password } = users[0]

  if (users.length) {
    
    const status = await compareHash(data.password, password);
    
    let token = {};

    if(status) {
      token = sign({ data: {
        _id: _id,
        email: email
      } }, SECRET, OPTIONS);
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

export function authService(token: string): any {
  try {
    const decoded: any = verify(token, SECRET);
    return decoded.data;
  } catch (err: any) {
    const error = new Error('Erro na verificação do token');
    error.name = err.name;  // Exemplo: 'JsonWebTokenError', 'TokenExpiredError'
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
  console.log(passwordHash);
  
  const statusCompare = await bcrypt.compare(password, passwordHash)
  

  console.log(statusCompare);
  

  return statusCompare;
}
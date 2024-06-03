import user from "../models/user";

import { sign, verify } from "jsonwebtoken";
// secret key
const SECRET = Buffer.from("node-auth").toString('base64');
const OPTIONS = {
  expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
}

export async function signinService(data: any): Promise<string> {
  const users: any = await user.find({ user: data.user, password: data.password})

  if (users.length) {
    const token = sign({ data }, SECRET, OPTIONS);

    const res: any = {
      token: token
    }

    return res;
  }else {
    const res: any = {
      msg: "Usuario não encontrado"
    }
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
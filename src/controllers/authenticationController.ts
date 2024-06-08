import { singupService, signinService, authService } from "../services/authenticationService";

export const singup = async (request: any, response: any) => {
    try {
        const res = await singupService(request.body);

        response.status(200).json(res);
    } catch (error) {
        const res = {
            msg: "Error"
        };
        response.status(404).json(res);
    }
}

export const signin = async (request: any, response: any) => {
    try {
        const res = await signinService(request.body);

        response.status(200).json(res);
    } catch (error) {
        const res = {
            msg: "Error"
        };
        response.status(404).json(res);
    }
}

export const verify = async (request: any, response: any) => {
    console.log("verificando token...");
    
    const header = request.headers["authorization"];
    const token = header.substring(7);

    response.status(200).json(await authService(token));
}
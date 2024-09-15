import { RESPONSE_MESSAGER } from "../constants/enum"

export class ResponseDto {
    code: number;
    msg: string
}

export const ResponseValue = ( code?: number, msg?: string ) => {
    return {
        code: code ?? 200,
        msg: msg ?? RESPONSE_MESSAGER.SUCCESS
    }
}
import dotenv from "dotenv";
dotenv.config();

export const success = (res, code, message, data=[]) => {
    return res.status(code).json({message : message, data: data});
}

export const error = (res, code, errorCode='fatal_error', message, err=null, data=[]) => {
    if(process.env.APP_DEBUG) {
        return res.status(code).json({code: errorCode, message : message, detailMessage : (err === null) ? '' : err.message, data : data});
    }
    else {
        return res.status(500).json({code: errorCode, message : message, data: data});
    }
}
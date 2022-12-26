import dotenv from "dotenv";
dotenv.config();

export const success = (res, code, message, data=[]) => {
    return res.status(code).json({message : message, data: data});
}

export const error = (response, code, errorCode='fatal_error', message, error=null) => {
    let body = {
        code: errorCode,
        message: message
    };
    if(process.env.APP_DEBUG && error != null) {
        body.detailMessage = error.message;
    }
    
    if(error.name === "ValidationError") {
        body = validationError(body, error);
        code = 400;
    }
    
    return response.status(code).json(body);
}

function validationError(body, error) {
    // Catch all validation error
    let errors = {};
    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });

    // Update error body
    body.errors = errors;
    body.code = 'validation_error';
    
    return body;
}
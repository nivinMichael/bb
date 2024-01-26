import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next)=>{
    let error = {
        statusCode:err?.statusCode || 500,
        message:err?.message || "Internal server error"
    };

    //handle invalid mongoose ID Error
    if (err.name==="CastError"){
        const message = `Resource not found. Invalid: ${err?.path}`;
        error = new ErrorHandler(message,404);
    }

    //Handle mongoose duplicate key error
    if (err.code===11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message,404);
    }

    //Handle wrong JWT Error
    if (err.name==="JsonWebTokenError"){
        const message = `Token is Invalid`;
        error = new ErrorHandler(message,400);
    }

    //Handle Expired JWT Error
    if (err.name==="TokenExpiredError"){
        const message = `Token is expired. Try Again`;
        error = new ErrorHandler(message,400);
    }

    //handle validation error
    if (err.name==="ValidationError"){
        const message = Object.values(err.errors).map((value)=>value.message)
        error = new ErrorHandler(message,404);
    }

    if (process.env.NODE_ENV==="DEVELOPMENT") {
        res.status(error.statusCode).json({
            message:error.message,
            error:err,
            stack:err?.stack,
        })
    }

    if (process.env.NODE_ENV==="PRODUCTION") {
        res.status(error.statusCode).json({
            message:error.message
        });
    }

    res.status(error.statusCode).json({
        message:error.message
    });
}
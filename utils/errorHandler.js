class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message) //super is the constructor of the parent class used to set the message in the parent class ie the Error class
        this.statusCode = statusCode
        //optional
        Error.captureStackTrace(this , this.constructor)
    }
}

export default ErrorHandler
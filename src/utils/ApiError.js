class ApiError extends Error {
    constructor(
        statusCode,
        msg= "Something went wrong!!",
        errs = [],
        stack = ""
    ){
        super(msg)
        this.statusCode = statusCode
        this.data = null
        this.msg = msg
        this.success - false
        this.errs = errs

        if(stack) {
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}
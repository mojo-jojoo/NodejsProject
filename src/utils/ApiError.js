class ApiError extends Error {
    constructor(
        message="Something went wrong", 
        statusCode,
        errors={},
        stack = "",
        data = null,
        success = false
        

    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.succcess = false;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
        if (stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError
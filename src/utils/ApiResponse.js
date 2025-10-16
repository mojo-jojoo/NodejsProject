class ApiResponse {
    constructor(statusCode, message, data="success",) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = 400 <= statusCode && statusCode < 600 ? false : true;
    }
}

export default ApiResponse;

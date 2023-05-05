const STATUS = {
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204
    },
    REDIRECT: {
        FOUND: 302
    },
    ERROR: {
        BAD_REQUEST: 400, // Invalid request syntax
        UNAUTHORIZED: 401, // Not authentified
        FORBIDDEN: 403, // Use forbidden for all rights issues
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405, // HTTP method not implemented
        TIMEOUT: 408,
        // Specifics codes (not in range of HTTP codes)
        USER_NOT_FOUND: 460,
        USER_ALREADY_EXISTS: 461,
        USER_INCORRECT: 462,
        USER_DISABLED: 463,
        OBJECT_NOT_FOUND: 470, // For all other instances (activities ...)
        OBJECT_LINKED: 471,
        MAIL_SERVICE_UNAVAILABLE: 480,
        // End of specifics codes
        INVALID_TOKEN: 498
    },
    SERVER_ERROR: {
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        PROXY_ERR: 502,
        UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504,
        DATABASE_ERROR: 512
    }
};

export default STATUS
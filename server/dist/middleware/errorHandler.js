export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[${new Date().toISOString()}] Error:`, {
        status: statusCode,
        message,
        path: req.path,
        details: err.details,
    });
    res.status(statusCode).json({
        error: message,
        details: process.env.NODE_ENV === 'development' ? err.details : undefined,
        timestamp: new Date(),
    });
};
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=errorHandler.js.map
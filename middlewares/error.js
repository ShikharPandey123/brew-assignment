export const errorHandler = (res, status = 500, message = "Something went wrong") => {
  return res.status(status).json({
    success: false,
    error: message,
  });
};

export const asyncError = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (err) {
      const msg = err?.message || "Server error";
      return errorHandler(res, 500, msg);
    }
  };
};

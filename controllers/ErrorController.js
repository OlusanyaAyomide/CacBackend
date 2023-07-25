function SendEnv(err, req, res, next) {
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: `Input Value of type ${err.stringValue} is not valid`,
    });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  } else if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.mesage,
    });
  } else if (err.keyValue) {
    const key = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      status: "fail",
      message: `${key} already exists ,try something else`,
    });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(400).json({
      status: "fail",
      message: "token is not valid",
    });
  } else if (err.name === "TokenExpiredError") {
    return res.status(400).json({
      status: "fail",
      message: "token has expired",
    });
  }
  console.log(err);
  res.status(500).json({ err });
}

export default function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    SendEnv(err, req, res, next);
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.mesage,
    });
  }
}

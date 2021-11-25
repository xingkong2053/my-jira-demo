module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
      return res.status(200).json({
        user: {
          token: "1234",
        },
      });
    } else {
      return res.status(400).json({ msg: "用户名或者密码错误" });
    }
  }
  next();
};

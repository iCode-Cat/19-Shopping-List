module.exports.isAdmin = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(401).send('Please authenticate with an Admin account.');
  if (!req.user.admin) return res.status(401).send('You are not Admin.');
  next();
};

module.exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated())
    return res.status(401).send('Please authenticate with an account.');
  next();
};

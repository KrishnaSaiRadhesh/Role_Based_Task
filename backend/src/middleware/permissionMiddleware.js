const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.user || !req.user.permissions) {
      return res.status(403).json({ message: "No permissions" });
    }

    if (!req.user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Forbidden: no access" });
    }

    next();
  };
};

module.exports = checkPermission;

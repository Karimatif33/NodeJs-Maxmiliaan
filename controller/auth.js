
exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
      pageTitle: "Login",
      path: "/login",
      // editing: false,
    });
  
    // console.log(err)
  };
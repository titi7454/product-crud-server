const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const requireAuth = (req, res, next) => {
  //get token
  //const token = req.cookies.jwt;
  const token = req.body.jwt;
  const id = req.params.id;

  if (token) {
    //verify token
    jwt.verify(token, process.env.JWT_AUTH, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/get-token/" + id);
      } else {
        //continue
        next();
      }
    });
  } else {
    res.redirect("/get-token/" + id);
  }
};

module.exports = { requireAuth };

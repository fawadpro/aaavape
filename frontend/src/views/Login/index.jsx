import React from "react";

import "./loginInner";
import LoginHero from "../../images/login-hero.png";
import LoginLogo from "../../images/logo.png";
import "./login-style.scss";
import LoginInner from "./loginInner";

const Login = () => {
  return (
    <div className="login-page-container ">
      <div className="page-left-container">
        <img src={LoginLogo} alt="Logo" className="logo-image" />
        <div className="form-area">
          <div className="form-title">Log In</div>
          <div className="form-sub-title">
            Continue to AAAVAPE Official Website
          </div>

          <LoginInner />
        </div>
      </div>
      <div>
        <img
          src={LoginHero}
          alt="login hero"
          className="login-page-right-container-image "
        />
      </div>
    </div>
  );
};

export default Login;

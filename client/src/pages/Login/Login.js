import React from "react";
import Logo from "../../media/logo.png"
const Login = () => {
    return (
      <section className="h-100 gradient-form" style={{backgroundColor: '#eee'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={Logo} style={{width: '185px'}} alt="logo" />
                        <p className="mt-1 mb-5 pb-1">SQUIDIO</p>
                      </div>
                      <form className="login-form needs-validation" noValidate>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input type="text" id="username-login" className="form-control" placeholder="username" required />
                          <label className="form-label" htmlFor="username-login">Username</label>
                          <div className="invalid-feedback">
                            please enter the registered username!
                          </div>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="password-login" className="form-control" required />
                          <label className="form-label" htmlFor="password-login">Password</label>
                          <input type="checkbox" onclick="myFunction()" /><div className="text-white small">Show Password</div>
                          <div className="invalid-feedback">
                            Password can not be empty!
                          </div>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" onclick="loginFormHandler()">Log in<span uk-icon="sign-in" /></button>
                          {'{'}{'{'}! <a className="text-muted" href="#!">Forgot password?</a> {'}'}{'}'}
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger"><a href="/signup">Create new</a></button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4 text-white">We are more than just a company</h4>
                      <p className="small mb-0">
                        We provide our fulfillment solution services nationwide
                        throughout the United States, so don’t wait to get in touch
                        with us! No matter what type of business you run, we can store
                        and ship your items. We’ll take all the stress and hassle out
                        of shipping and receiving your inventory items. Your total
                        satisfaction is our goal, and we won’t stop until we get
                        there.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default Login;

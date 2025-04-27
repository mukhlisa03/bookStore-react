import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const LoginArea = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const status = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user.user);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (status) {
      Swal.fire({
        icon: "question",
        title: user.name,
        html:
          "You are already logged in <br />" + "You can go to <b>Shop</b> page",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        }
      });
    } else {
      dispatch({
        type: "user/login",
        payload: {
          name: nickname, // inputdan nickname olinmoqda
          password: password,
        },
      });

      let name = nickname || "Customer";
      Swal.fire({
        icon: "success",
        title: "Login Successfully",
        text: "Welcome " + name,
      });

      history.push("/");
    }
  };

  return (
    <section id="login_area" className="ptb-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
            <div className="account_form">
              <h3>Login</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                <div className="default-form-box">
                  <label>
                    MemberNick<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                <div className="default-form-box">
                  <label>
                    MemberPassword<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    minLength="8"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="login_submit">
                  <button
                    className="theme-btn-one btn-black-overlay btn_md"
                    type="submit"
                  >
                    login
                  </button>
                </div>
                <div className="remember_area">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="materialUnchecked"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="materialUnchecked"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link to="/register" className="active">
                  Create Your Account?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginArea;

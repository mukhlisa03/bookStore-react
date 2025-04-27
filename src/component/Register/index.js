import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const RegisterArea = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pass, setPass] = useState("");

  let status = useSelector((state) => state.user.status);
  let userData = useSelector((state) => state.user.user);

  // Add to cart
  const register = () => {
    if (status) {
      Swal.fire({
        icon: "question",
        title: userData.name,
        html:
          "You are already Registered <br />" +
          "You can go to <b>" +
          // 'Dashboard</b> ' +
          "or our <b>Shop</b> page",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/");
        } else {
          // not clicked
        }
      });
    } else {
      dispatch({ type: "user/register", payload: { user, phoneNumber, pass } });

      Swal.fire({
        icon: "success",
        title: "Registration Sucessfully",
        text: "Welcome " + user,
      });
      history.push("/");
    }
  };
  return (
    <>
      <section id="login_area" className="ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12">
              <div className="account_form">
                <h3>Register</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    register();
                  }}
                >
                  <div className="default-form-box">
                    <label>
                      MemberNick<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={user}
                      onChange={(e) => setUser(e.currentTarget.value)}
                      required
                    />
                  </div>
                  <div className="default-form-box">
                    <label>
                      MemberPhone<span className="text-danger">*</span>
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                      required
                    />
                  </div>
                  <div className="default-form-box">
                    <label>
                      MemberPassword<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={pass}
                      onChange={(e) => setPass(e.currentTarget.value)}
                      required
                      minLength="8"
                    />
                  </div>
                  <div className="login_submit">
                    <button
                      className="theme-btn-one btn-black-overlay btn_md"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterArea;

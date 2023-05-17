import { useFormik } from "formik";
import * as yup from "yup";
import UserService from "@/services/user.service.js";
import { AUTH_TOKEN } from "@/utils/constants.js";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import useUserInfo from "@/hooks/useUserInfo.js";

function SignIn() {
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const signOut = async () => {
    await UserService.signOut();
    location.reload();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required!").email("Invalid email format"),
      password: yup
        .string()
        .required("Required!")
        .min(8, "Minimum 8 characters"),
    }),
    onSubmit: async (values) => {
      const result = await UserService.signIn({
        identity: values.email,
        password: values.password,
      });
      localStorage.setItem(AUTH_TOKEN, result.data.token);
      navigate("/");

      // localStorage.setItem(AUTH_TOKEN, result.data.token);
      // let checkAdmin = localStorage.getItem(AUTH_TOKEN);
      // if (checkAdmin) {
      //   if (userInfo?.is_admin) {
      //     navigate("/");
      //   } else {
      //     localStorage.removeItem(AUTH_TOKEN);
      //   }
      // }
    },
  });
  return (
    <div classNameName="container-signin">
      <div className="wrapper-flex">
        <div className="wrapper">
          <div className="title">Login Form</div>
          <form action="#" onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <div className={"form-error"} style={{ marginTop: "5px" }}>
                  {formik.errors.email}
                </div>
              )}
              <label>Email Address</label>
            </div>
            <div className="field">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <div className={"form-error"} style={{ marginTop: "5px" }}>
                  {formik.errors.password}
                </div>
              )}
              <label>Password</label>
            </div>
            <div className="content" style={{ marginTop: "15px" }}>
              <div className="checkbox">
                <input type="checkbox" id="remember-me" />
                <label for="remember-me">Remember me</label>
              </div>
              <div className="pass-link">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <div className="field">
              <button className="field button-login" type="submit">
                Sign In
              </button>
            </div>
            <div className="signup-link">
              Not a member? <Link to="/sign-up">Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

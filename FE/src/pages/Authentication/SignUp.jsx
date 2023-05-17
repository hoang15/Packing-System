import { useFormik } from "formik";
import * as yup from "yup";
import UserService from "@/services/user.service.js";
import { useNavigate } from "react-router-dom";
import "../../assets/css/SignIn.css";

function SignUp() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      emailVisibility: "true",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required!").email("Invalid email format"),
      password: yup
        .string()
        .required("Required!")
        .min(8, "Minimum 8 characters"),
      passwordConfirm: yup
        .string()
        .required("Required!")
        .oneOf([yup.ref("password")], "Password's not match"),
    }),
    onSubmit: async (values) => {
      try {
        await UserService.signUp(values);
        navigate("/sign-in");
      } catch (e) {
        console.log(e);
      }
    },
  });
  return (
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
              <p classNameName={"form-error"}>{formik.errors.email}</p>
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
              <p classNameName={"form-error"}>{formik.errors.password}</p>
            )}
            <label>Password</label>
          </div>
          <div className="field">
            <input
              type="password"
              name="passwordConfirm"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
            />
            {formik.errors.passwordConfirm &&
              formik.touched.passwordConfirm && (
                <p className={"form-error"}>{formik.errors.passwordConfirm}</p>
              )}
            <label>Confirm Password</label>
          </div>
          <div className="field">
            <button className="field button-signup" type="submit">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

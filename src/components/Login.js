import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { userLogin } from "../services/service";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial Form Values
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle Form Submission
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
     const response = await userLogin(formData);
     console.log(response , "  response.token");
     localStorage.setItem("token" , response.data.token)
      // resetForm();
      navigate("/home");
    } catch (error) {
      // resetForm();
      console.error("Error fetching data:", error);
    }
  };
  
  return (
    <div>
       <h2>Login</h2>
      <br />
      <div></div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <br />
            <div>
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

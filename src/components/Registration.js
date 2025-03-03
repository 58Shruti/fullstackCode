import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { registration } from "../services/service";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    profileImage : Yup.mixed().required("file required")
  });

  // Initial Form Values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    profileImage: ""
  };

  // Handle Form Submission
  const handleSubmit = async (values, { resetForm }) => {
    // console.lnpm strog(values);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("name", values.name);
      formData.append("profileImage", values.profileImage);
       await registration(formData);
      resetForm();
      navigate("/login");
    } catch (error) {
      resetForm();
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="form-container">
      <h2>Register</h2>
      <br />
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div>
                <label>Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red", fontSize: "12px" }}
                />
              </div>
              <br />
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
              <div>
                <label>Profile Image:</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={(event) => {
                      setFieldValue("profileImage", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage
                  name="profileImage"
                  component="div"
                  style={{ color: "red" }}
                />
                <br />
                <br />
              </div>
              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Registration;

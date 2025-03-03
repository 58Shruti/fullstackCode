import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProfile } from "../services/service";

const Profile = () => {
  const initialValues = {
    name: "",
    username: "",
    bio: "",
    education: "",
    jobTitle: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    bio: Yup.string().max(200, "Bio should be under 200 characters"),
    education: Yup.string().required("Education level is required"),
    jobTitle: Yup.string().required("Job title is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const response = await createProfile(formData);
      console.log("Form Submitted Successfully:", response.data);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <br />
      <br />
      <h2>PROFILE</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Name Field */}
            <label>Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <br />
            {/* Username Field */}
            <label>Username:</label>
            <Field type="text" name="username" />
            <ErrorMessage
              name="username"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <br />
            {/* Bio Field */}
            <label>Bio:</label>
            <Field as="textarea" name="bio" />
            <ErrorMessage name="bio" component="div" style={{ color: "red" }} />
            <br />
            {/* Education Level Dropdown */}
            <label>Education Level:</label>
            <Field as="select" name="education">
              <option value="">Select Education</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </Field>
            <ErrorMessage
              name="education"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <br />
            {/* Job Title Dropdown */}
            <label>Job Title:</label>
            <Field as="select" name="jobTitle">
              <option value="">Select Job Title</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Designer">Designer</option>
            </Field>
            <ErrorMessage
              name="jobTitle"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <br />
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: "10px" }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;

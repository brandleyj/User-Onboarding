import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched }) => {
	const [form, setForm] = useState([]);
	useEffect(() => {
		if (status) {
			setForm([...form, status]);
		}
	}, [status]);
	return (
		<Form>
			<Field type="text" name="name" placeholder="Name" />
			{touched.name && errors.name && <p className="error">{errors.name}</p>}

			<Field type="text" name="email" placeholder="Email" />
			{touched.email && errors.email && <p className="error">{errors.email}</p>}

			<Field type="password" name="password" placeholder="Password" />
			{touched.password && errors.password && (
				<p className="error">{errors.password}</p>
			)}

			<label>
				<Field
					htmlFor="Terms of Service"
					type="checkbox"
					name="termsOfService"
					checked={values.termsOfService}
				/>
			</label>
			<button>Submit</button>
		</Form>
	);
};
const FormikUserForm = withFormik({
	mapPropsToValues({ name, email, password, termsOfService }) {
		return {
			name: name || "",
			email: email || "",
			password: password || "",
			termsOfService: termsOfService || false
		};
	},
	validationSchema: Yup.object().shape({
		name: Yup.string().required("You must enter your name"),
		email: Yup.string().required("You must enter a valid email address"),
		password: Yup.string().required("You must enter a password")
	}),

	handleSubmit(values, {}) {
		axios.post("https://reqres.in/api/users/", values).then(res => {
			console.log(res);
		});
	}
})(UserForm);

export default FormikUserForm;

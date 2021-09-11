import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
	// Context
	const { loginUser } = useContext(AuthContext);

	// State
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const [alert, setAlert] = useState(null);

	// Function
	const onChangeLoginForm = (event) => {
		setLoginData({
			...loginData,
			[event.target.name]: event.target.value,
		});
	};

	const login = async (event) => {
		// Prevent page loading on submit
		event.preventDefault();

		// Login with account user
		try {
			const loginDataResponse = await loginUser(loginData);

			if (!loginDataResponse.success) {
				setAlert({
					type: "danger",
					message: loginDataResponse.message,
				});

				setTimeout(() => setAlert(null), 3500);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Form className="my-2" onSubmit={login}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						required
						value={loginData.username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						required
						value={loginData.password}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Login
				</Button>
			</Form>
			<p>
				Don't have account?
				<Link to="/register">
					<Button variant="info" size="sm" className="ml-1">
						Register
					</Button>
				</Link>
			</p>
		</>
	);
};

export default LoginForm;

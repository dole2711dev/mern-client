import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AlertMessage from "../layout/AlertMessage";
import { AuthContext } from "../../contexts/AuthContext";

const RegisterForm = () => {
	// Context
	const { registerUser } = useContext(AuthContext);

	// State
	const [alert, setAlert] = useState(null);
	const [dataRegister, setDataRegister] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});

	// Function
	const onChangeData = (event) => {
		setDataRegister({
			...dataRegister,
			[event.target.name]: event.target.value,
		});
	};

	const register = async (event) => {
		event.preventDefault();

		if (dataRegister.password !== dataRegister.confirmPassword) {
			setAlert({
				type: "danger",
				message: "Password and confirm password do not match",
			});

			setTimeout(() => setAlert(null), 3500);
			return;
		}

		try {
			const response = await registerUser({
				username: dataRegister.username,
				password: dataRegister.password,
			});

			setAlert({
				type: response.success ? "success" : "danger",
				message: response.message,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Form className="my-2" onSubmit={register}>
				<AlertMessage info={alert} />
				<Form.Group>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						onChange={onChangeData}
						value={dataRegister.username}
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						onChange={onChangeData}
						value={dataRegister.password}
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={onChangeData}
						value={dataRegister.confirmPassword}
						required
					/>
				</Form.Group>
				<Button variant="success" type="submit">
					Regiter
				</Button>
			</Form>
			<p>
				Already have an account?{" "}
				<Link to="/login">
					<Button variant="info" size="sm" className="ml-1">
						Login
					</Button>
				</Link>
			</p>
		</>
	);
};

export default RegisterForm;

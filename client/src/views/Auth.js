import { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	let body = authLoading ? (
		<div className="d-flex justify-content-center mt2">
			<Spinner animation="border" variant="info" />
		</div>
	) : (
		<>{authRoute === "login" ? <LoginForm /> : <RegisterForm />}</>
	);

	return (
		<div className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1>Learn It</h1>
					<h4>Keep track of what you are learning</h4>
					{body}
				</div>
			</div>
		</div>
	);
};

export default Auth;

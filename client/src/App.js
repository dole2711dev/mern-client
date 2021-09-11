import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import ManagementContext from "./contexts/ManagementContext";
import Dashboard from "./views/Dashboard";
import About from "./views/About";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
	return (
		<ManagementContext>
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route
						path="/login"
						render={(props) => (
							<Auth {...props} authRoute="login" />
						)}
					/>
					<Route
						path="/register"
						render={(props) => (
							<Auth {...props} authRoute="register" />
						)}
					/>
					<ProtectedRoute path="/dashboard" component={Dashboard} />
					<ProtectedRoute path="/about" component={About} />
				</Switch>
			</Router>
		</ManagementContext>
	);
}

export default App;

import { useReducer, createContext, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_ACCESS } from "./constants";
import axios from "axios";
import setAuthToken from "../untils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	// Reducer
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	// Effect
	useEffect(() => loadUser(), []);

	// Function
	const loadUser = async () => {
		const userToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_ACCESS);
		if (userToken) {
			setAuthToken(userToken);
		}

		try {
			const response = await axios.get(`${apiUrl}/auth`);
			if (response.data.success) {
				dispatch({
					type: "SET_AUTH",
					payload: {
						isAuthenticated: true,
						user: response.data.user,
					},
				});
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_ACCESS);
			setAuthToken(null);
			dispatch({
				type: "SET_AUTH",
				payload: {
					isAuthenticated: false,
					user: null,
				},
			});
		}
	};

	const loginUser = async (userForm) => {
		try {
			const response = await axios.post(`${apiUrl}/auth/login`, userForm);
			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_ACCESS,
					response.data.accessToken
				);
			}

			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) {
				return error.response.data;
			} else {
				return {
					success: "false",
					message: error.message,
				};
			}
		}
	};

	const registerUser = async (registerForm) => {
		try {
			const response = await axios.post(
				`${apiUrl}/auth/register`,
				registerForm
			);

			if (response.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_ACCESS,
					response.data.accessToken
				);
			}

			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response.data) {
				return error.response.data;
			} else {
				return {
					success: "false",
					message: error.message,
				};
			}
		}
	};

	const logoutUser = async () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_ACCESS);
		dispatch({
			type: "SET_AUTH",
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
	};

	// Context data
	const authContextData = { loginUser, registerUser, logoutUser, authState };

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;

import React from "react";
import AuthContextProvider from "./AuthContext";
import PostContextProvider from "./PostContext";

const ManagementContext = ({ children }) => {
	return (
		<>
			<PostContextProvider>
				<AuthContextProvider>{children}</AuthContextProvider>
			</PostContextProvider>
		</>
	);
};

export default ManagementContext;

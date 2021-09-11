export const apiUrl =
	process.env.NODE_ENV !== "production"
		? "http://localhost:5000/api"
		: "somedeployUrl";

export const LOCAL_STORAGE_TOKEN_ACCESS = "token";
export const POST_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POST_LOAD_FAILED = "POSTS_LOAD_FAILED";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const FIND_POST = "FIND_POST";

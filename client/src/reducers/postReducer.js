import {
	ADD_POST,
	POST_LOADED_SUCCESS,
	POST_LOAD_FAILED,
	UPDATE_POST,
	DELETE_POST,
	FIND_POST,
} from "../contexts/constants";

export const postReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case POST_LOADED_SUCCESS:
			return { ...state, posts: payload, postLoading: false };

		case POST_LOAD_FAILED:
			return { ...state, posts: [], postLoading: true };

		case ADD_POST:
			return { ...state, posts: [...state.posts, payload] };

		case UPDATE_POST:
			const newPosts = state.posts.map((post) =>
				post._id === payload._id ? payload : post
			);

			return {
				...state,
				posts: newPosts,
			};

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
			};

		case FIND_POST:
			return {
				...state,
				postUpdate: payload,
			};

		default:
			return state;
	}
};

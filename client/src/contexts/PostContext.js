import React, { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
	ADD_POST,
	UPDATE_POST,
	apiUrl,
	DELETE_POST,
	POST_LOADED_SUCCESS,
	POST_LOAD_FAILED,
	FIND_POST,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	// Reducer
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
		postLoading: true,
		postUpdate: null,
	});

	const [showAddPostModal, setShowAddPostModal] = useState(false);
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
	const [showToast, setShowToast] = useState({
		show: false,
		message: "",
		type: "",
	});

	const getPosts = async () => {
		try {
			const postResponse = await axios.get(`${apiUrl}/posts`);

			if (postResponse.data.success) {
				dispatch({
					type: POST_LOADED_SUCCESS,
					payload: postResponse.data.posts,
				});
			}
		} catch (error) {
			dispatch({
				type: POST_LOAD_FAILED,
			});
		}
	};

	const registerPost = async (postForm) => {
		try {
			const response = await axios.post(`${apiUrl}/posts`, postForm);

			if (response.data.success) {
				dispatch({
					type: ADD_POST,
					payload: response.data.post,
				});

				return response.data;
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: "Server error" };
		}
	};

	const updatePost = async (postForm) => {
		try {
			const response = await axios.put(
				`${apiUrl}/posts/${postForm._id}`,
				postForm
			);

			if (response.data.success) {
				dispatch({
					type: UPDATE_POST,
					payload: response.data.updatedPost,
				});
			}

			return response.data;
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: "Server error" };
		}
	};

	const deletePost = async (postId) => {
		try {
			const response = await axios.delete(`${apiUrl}/posts/${postId}`);
			if (response.data.success) {
				dispatch({
					type: DELETE_POST,
					padload: postId,
				});
			}
			console.log(postState.posts);
			return response.data;
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: "Server error" };
		}
	};

	const findPostById = (postId) => {
		const post = postState.posts.find((post) => post._id === postId);

		dispatch({
			type: FIND_POST,
			payload: post,
		});

		return post;
	};

	const postData = {
		postState,
		getPosts,
		registerPost,
		updatePost,
		deletePost,
		showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
		showToast,
		setShowToast,
		findPostById,
	};

	return (
		<PostContext.Provider value={postData}>{children}</PostContext.Provider>
	);
};

export default PostContextProvider;

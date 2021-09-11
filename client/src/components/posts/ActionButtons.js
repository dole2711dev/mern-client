import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";

const ActionButton = ({ url, _id }) => {
	// useContext
	const {
		updatePost,
		deletePost,
		findPostById,
		setShowToast,
		setShowUpdatePostModal,
	} = useContext(PostContext);

	const reducerDeletePost = async (_id) => {
		const response = await deletePost(_id);
		console.log(response);
		setShowToast({
			show: true,
			message: response.message,
			type: response.success ? "bg-success" : "bg-danger",
		});
	};

	const reducerUpdatePost = async (id) => {
		const postUpdate = findPostById(id);
		setShowUpdatePostModal(true);
	};

	return (
		<>
			<Button className="post-button" href={url} target="_blank">
				<img src={playIcon} alt="play icon" width="24" height="24" />
			</Button>
			<Button
				className="post-button"
				onClick={reducerUpdatePost.bind(this, _id)}>
				<img src={editIcon} alt="edit icon" width="24" height="24" />
			</Button>
			<Button
				className="post-button"
				onClick={reducerDeletePost.bind(this, _id)}>
				<img
					src={deleteIcon}
					alt="delete icon"
					width="24"
					height="24"
				/>
			</Button>
		</>
	);
};

export default ActionButton;

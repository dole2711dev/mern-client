import { useState, useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const UpdatePostModal = () => {
	// Context
	const {
		updatePost,
		showUpdatePostModal,
		setShowUpdatePostModal,
		setShowToast,
		postState: { postUpdate },
	} = useContext(PostContext);

	// State
	const [postForm, setPostForm] = useState(postUpdate);

	// Function
	const postOnChange = (event) => {
		setPostForm({
			...postForm,
			[event.target.name]: event.target.value,
		});
	};

	const postDropdowlistOnChange = (event) => {
		setPostForm({
			...postForm,
			status: event,
		});
	};

	const updatePostReducer = async (event) => {
		event.preventDefault();
		if (!postForm.title) return;

		const response = await updatePost(postForm);
		setShowToast({
			show: true,
			message: response.message,
			type: response.success ? "bg-success" : "bg-danger",
		});

		clearDataPost();
	};

	const clearDataPost = () => {
		setPostForm(postUpdate);

		setShowUpdatePostModal(false);
	};

	return (
		<>
			<Modal show={showUpdatePostModal} onHide={clearDataPost}>
				<Modal.Header closeButton>
					<Modal.Title>What do you want to update?</Modal.Title>
				</Modal.Header>
				<Form onSubmit={updatePostReducer}>
					<Modal.Body>
						<Form.Group className="mb-2">
							<Form.Label title="field is required">
								Title
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-asterisk icon-required"
									viewBox="0 0 16 16">
									<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
								</svg>
							</Form.Label>
							<Form.Control
								name="title"
								type="text"
								value={postForm.title}
								onChange={postOnChange}
								required
							/>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								row={3}
								name="description"
								value={postForm.description}
								onChange={postOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label>Url</Form.Label>
							<Form.Control
								name="url"
								value={postForm.url}
								onChange={postOnChange}
							/>
						</Form.Group>
						<Form.Group className="mb-2">
							<Form.Label>Status</Form.Label>
							<DropdownButton
								id="dropdown-basic-button"
								title={postForm.status}
								name="status"
								value={postForm.status}
								onSelect={postDropdowlistOnChange}>
								<Dropdown.Item eventKey="TO LEARN">
									TO LEARN
								</Dropdown.Item>
								<Dropdown.Item eventKey="LEARNING">
									LEARNING
								</Dropdown.Item>
								<Dropdown.Item eventKey="LEARNED">
									LEARNED
								</Dropdown.Item>
							</DropdownButton>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="success" type="submit">
							Update
						</Button>
						<Button
							className="ml-1"
							variant="danger"
							onClick={clearDataPost}>
							Cancel
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default UpdatePostModal;

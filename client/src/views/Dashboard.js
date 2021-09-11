import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import addIcon from "../assets/plus-circle-fill.svg";

const Dashboard = () => {
	// Context
	const {
		authState: {
			user: { username },
		},
	} = useContext(AuthContext);

	const {
		postState: { posts, postLoading, postUpdate },
		getPosts,
		setShowAddPostModal,
		showToast: { type, message, show },
		setShowToast,
	} = useContext(PostContext);

	// Effect
	useEffect(() => getPosts());

	let body;
	if (postLoading) {
		body = (
			<div className="spinner-container">
				<Spinner animation="border" variant="info" />
			</div>
		);
	} else if (posts.length === 0) {
		body = (
			<>
				<Card className="text-center mx-5 my-5">
					<Card.Header as="h1">Hello {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to Learn IT</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to
							learn
						</Card.Text>
						<Button
							variant="primary"
							onClick={setShowAddPostModal.bind(this, true)}>
							Learn IT
						</Button>
					</Card.Body>
				</Card>
			</>
		);
	} else {
		body = (
			<>
				<Row className="row-cols-1 row-cols-md-3 mt-3 mx-auto g-4">
					{posts.map((post) => (
						<Col key={post._id} className="my-2">
							<SinglePost post={post} />
						</Col>
					))}
				</Row>
				<Button
					className="btn-floating"
					onClick={setShowAddPostModal.bind(this, true)}>
					<img
						src={addIcon}
						alt="Add post"
						height="40px"
						width="40px"
					/>
				</Button>
			</>
		);
	}

	return (
		<>
			<AddPostModal />
			{postUpdate !== null && <UpdatePostModal />}
			<h1>{body}</h1>;
			<Toast
				className={type}
				show={show}
				style={{
					position: "fixed",
					top: "10%",
					right: "10px",
				}}
				onClose={setShowToast.bind(this, {
					show: false,
					message: "",
					type: "",
				})}
				delay={3000}
				autohide
				animation={false}>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	);
};

export default Dashboard;

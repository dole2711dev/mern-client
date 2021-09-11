import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";

const SinglePost = ({ post }) => {
	const { _id, title, status, description, url } = post;
	let border;
	switch (status) {
		case "TO LEARN":
			border = "danger";
			break;

		case "LEARNING":
			border = "warning";
			break;

		default:
			border = "success";
			break;
	}

	return (
		<>
			<Card className="shadow" border="danger">
				<Card.Body className="card-body-course">
					<Card.Title>
						<Row>
							<Col>
								<p className="post-title">{title}</p>
								<Badge pill variant={border}>
									{status}
								</Badge>
							</Col>
							<Col className="text-right display-end">
								<ActionButtons _id={_id} url={url} />
							</Col>
						</Row>
					</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

export default SinglePost;

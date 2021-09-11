import Alert from "react-bootstrap/Alert";

const AlertMessage = ({ info }) => {
	if (info === null) return null;

	return (
		<Alert size="sm" variant={info.type}>
			{info.message}
		</Alert>
	);
};

export default AlertMessage;

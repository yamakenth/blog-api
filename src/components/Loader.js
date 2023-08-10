import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center position-fixed top-0 start-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Spinner animation="border" variant="secondary" className="mb-3" />
      <span>This might take up to 30 seconds.</span>
      <span>Thank you for your patience!</span>
    </div>
  );
}

export default Loader;

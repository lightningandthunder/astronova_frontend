import React from "react";
import Alert from "react-bootstrap/Alert";

export default function ErrorAlert(props) {
  return (
    <div>
      {
        props.err &&
        <Alert variant={"danger"}
          onClose={() => props.resetError()}
          dismissible
        >
          {props.err}
        </Alert>
      }
    </div>
  );
}
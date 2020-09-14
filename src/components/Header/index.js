import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function Header(props) {
  const [developerLink, setdeveloperLink] = useState(
    props.link ? props.link : ""
  );
  return (
    <Row style={{ marginBottom: "32px" }}>
      <Col md={4}>
        <p className="Logo">Scrum Poker</p>
      </Col>
      {props.link ? (
        <Col
          md={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Form.Row style={{ width: "100%" }}>
            <Form.Label column lg={2.5}>
              please share link of developers panel to the teammates:
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                value={developerLink}
                onChange={(event) => {
                  if (developerLink.length >= props.link.length - 1) {
                    setdeveloperLink(event.target.value);
                  }
                }}
              />
              <small
                className="form-text text-muted"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                Change id value for share to different developers. Note: Id
                number increases consecutively. Example: Second developer id=2.
              </small>
            </Col>
          </Form.Row>
        </Col>
      ) : null}
    </Row>
  );
}

export default Header;

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function ScrumMasterPanel(props) {
  const [isFinished, setisFinished] = useState(false);
  const [isVotedEveryone, setisVotedEveryone] = useState(false);
  const [finalScore, setfinalScore] = useState("");
  const [isVoteSame, setisVoteSame] = useState(false);
  const handleFinishVote = () => {
    setisFinished(true);
  };

  useEffect(() => {
    let counter = 0;
    let prevVote = 0;
    let checkSameCounter = 0;
    props.data.map((item, index) => {
      if (index === 0) {
        prevVote = item.vote;
        checkSameCounter++;
      } else if (prevVote === item.vote) {
        checkSameCounter++;
      } else;
      if (item.vote !== "") {
        return counter++;
      } else return counter;
    });
    if (counter === props.data.length) {
      setisVotedEveryone(true);
    }
    if (checkSameCounter === props.data.length) {
      setisVoteSame(true);
    } else {
      setisVoteSame(false);
    }
  }, [props.data]);

  const submitFinalScore = () => {
    let newData = props.sprintData;
    let checkVoted = false;
    newData.data.map((item) => {
      if (item.name === props.storyName) {
        item.status = "Voted";
        item.storyPoint = finalScore;
        return (checkVoted = true);
      } else if (checkVoted) {
        checkVoted = false;
        return (item.status = "Active");
      } else {
        return null;
      }
    });
    window.localStorage.setItem("SprintDetail", JSON.stringify(newData));
  };

  return (
    <div>
      <Card
        style={{
          padding: "48px 8px",
          borderWidth: "5px",
          borderColor: "black",
        }}
      >
        <Col style={{ padding: 0, marginBottom: 16 }}>
          <h5>{`${props.storyName} is active`}</h5>
        </Col>
        {props.data.map((item, index) => {
          if (isFinished) {
            return (
              <Col key={index}>
                <Row>{`${item.name}:${item.vote}`}</Row>
              </Col>
            );
          } else {
            return (
              <Col key={index}>
                <Row>{`${item.name}: ${
                  item.vote !== "" ? `Voted` : `Not Voted`
                }`}</Row>
              </Col>
            );
          }
        })}

        {isFinished ? (
          <Col style={{ marginTop: 32 }}>
            <p style={{ textAlign: "center" }}>
              {`${
                isVoteSame
                  ? `Seems team has same votes`
                  : `Seems team has different votes`
              }`}
            </p>
            <p style={{ textAlign: "center" }}>
              Please discuss and finalize the score below textbox
            </p>
            <Form.Group
              controlId="formBasicEmail"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Form.Label style={{ color: "grey", fontWeight: "bold" }}>
                Final Score
              </Form.Label>
              <Form.Control
                style={{ width: "33%" }}
                type="number"
                value={finalScore}
                onChange={(event) => setfinalScore(event.target.value)}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {finalScore !== "" && finalScore > 0 ? (
                <Button
                  variant="outline-dark"
                  style={{ display: "flex", alignSelf: "center" }}
                  onClick={submitFinalScore}
                >{`End Voiting For ${props.storyName}`}</Button>
              ) : (
                <Button
                  disabled
                  variant="outline-dark"
                  style={{ display: "flex", alignSelf: "center" }}
                >{`End Voiting For ${props.storyName}`}</Button>
              )}
            </div>
          </Col>
        ) : (
          <Col
            style={{ marginTop: 32, display: "flex", justifyContent: "center" }}
          >
            {isVotedEveryone ? (
              <Button
                variant="outline-dark"
                onClick={handleFinishVote}
              >{`End Voiting For ${props.storyName}`}</Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  disabled
                  variant="outline-dark"
                >{`End Voiting For ${props.storyName}`}</Button>
                <p style={{ textAlign: "center", marginTop: "10px" }}>
                  You can not end voting till eact teammate voted
                </p>
              </div>
            )}
          </Col>
        )}
      </Card>
    </div>
  );
}

export default ScrumMasterPanel;

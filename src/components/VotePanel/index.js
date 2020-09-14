import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function VotePanel(props) {
  const [storyScore, setstoryScore] = useState(
    props.smVote !== "" ? props.smVote : ""
  );
  const voteData = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, "?"];

  const handleClick = (number) => {
    setstoryScore(number);
    let newData = props.data;
    newData.data.map((item, index) => {
      if (item.name === props.storyName) {
        if (props.id === 0) {
          return (item.votes[item.votes.length - 1].vote = number);
        } else {
          return (item.votes[props.id - 1].vote = number);
        }
      } else return null;
    });
    window.localStorage.setItem("SprintDetail", JSON.stringify(newData));
  };

  return (
    <div style={{ marginRight: "32px", width: "100%", marginBottom: "10px" }}>
      <Card
        style={{
          padding: "48px 8px",
          borderWidth: "5px",
          borderColor: "black",
        }}
      >
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          {props.storyName}
        </Col>
        <Col>
          <Row>
            {voteData.map((value, index) => {
              if (index < 4) {
                return (
                  <Col
                    key={index}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="outline-dark"
                      active={storyScore === value ? true : false}
                      style={{
                        width: 30,
                        padding: 0,
                      }}
                      onClick={() => handleClick(value)}
                    >
                      {value}
                    </Button>
                  </Col>
                );
              } else {
                return null;
              }
            })}
          </Row>
          <Row style={{ marginTop: "16px" }}>
            {voteData.map((value, index) => {
              if (index < 8 && index > 3) {
                return (
                  <Col
                    key={index}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="outline-dark"
                      active={storyScore === value ? true : false}
                      style={{
                        width: 30,
                        padding: 0,
                      }}
                      onClick={() => handleClick(value)}
                    >
                      {value}
                    </Button>
                  </Col>
                );
              } else {
                return null;
              }
            })}
          </Row>
          <Row style={{ marginTop: "16px" }}>
            {voteData.map((value, index) => {
              if (index < 12 && index > 7) {
                return (
                  <Col
                    key={index}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="outline-dark"
                      active={storyScore === value ? true : false}
                      style={{
                        width: 30,
                        padding: 0,
                      }}
                      onClick={() => handleClick(value)}
                    >
                      {value}
                    </Button>
                  </Col>
                );
              } else {
                return null;
              }
            })}
          </Row>
          <Row style={{ marginTop: "16px", justifyContent: "center" }}>
            {storyScore !== "" ? `${storyScore} Voted` : `Please Vote!!!`}
          </Row>
        </Col>
      </Card>
    </div>
  );
}

export default VotePanel;

import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import Header from "../../components/Header";

function CreatePlanning(props) {
  const [validated, setValidated] = useState(false);
  const [sprintDetail, setsprintDetail] = useState({
    sessionName: "",
    numberOfVoters: [],
    storyList: [],
  });
  const [storyListValue, setstoryListValue] = useState("");
  const [numberOfDeveloper, setnumberOfDeveloper] = useState("");

  const convertArrayDevelopers = () => {
    let tempArray = [];
    for (let i = 0; i < numberOfDeveloper; i++) {
      tempArray.push({
        id: i + 1,
        name: `Voter ${i + 1}`,
        vote: "",
      });
    }
    tempArray.push({
      id: 0,
      name: `Scrum Master`,
      vote: "",
    });
    setsprintDetail({
      ...sprintDetail,
      numberOfVoters: tempArray,
    });
  };

  const changeTextArea = (event) => {
    setstoryListValue(event.target.value);
  };
  const convertList = () => {
    let textAreaArray = [];
    storyListValue.split("\n").map((item) => {
      if (item !== "") {
        return textAreaArray.push({
          name: item,
          score: "",
        });
      } else return null;
    });
    setsprintDetail({
      ...sprintDetail,
      storyList: textAreaArray,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleClick = () => {
    if (
      sprintDetail.sessionName.length <= 200 &&
      sprintDetail.sessionName.length > 0
    ) {
      if (numberOfDeveloper.length > 0 && numberOfDeveloper > 0) {
        if (
          sprintDetail.storyList.length > 0 &&
          sprintDetail.storyList !== []
        ) {
          let sprint = { name: sprintDetail.sessionName, data: [] };
          for (let i = 0; i < sprintDetail.storyList.length; i++) {
            if (i === 0) {
              sprint.data.push({
                name: sprintDetail.storyList[i].name,
                storyPoint: sprintDetail.storyList[i].score,
                status: "Active",
                votes: sprintDetail.numberOfVoters,
              });
            } else {
              sprint.data.push({
                name: sprintDetail.storyList[i].name,
                storyPoint: sprintDetail.storyList[i].score,
                status: "Not Voted",
                votes: sprintDetail.numberOfVoters,
              });
            }
          }
          window.localStorage.setItem("SprintDetail", JSON.stringify(sprint));
          props.history.push("/poker-planning-view-as-scrum-master");
        }
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} sm={5} style={{ padding: 0 }}>
            <Form.Row>
              <Form.Label column xs={5} lg={2.5}>
                Session Name
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  required
                  value={sprintDetail.sessionName}
                  onChange={(event) => {
                    if (event.target.value.length <= 200) {
                      setsprintDetail({
                        ...sprintDetail,
                        sessionName: event.target.value,
                      });
                    }
                  }}
                />
                <small
                  className="form-text text-muted"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {sprintDetail.sessionName.length}/200
                </small>
              </Col>
            </Form.Row>
          </Col>
          <Col xs={12} sm={{ span: 6, offset: 1 }} style={{ padding: 0 }}>
            <Form.Row>
              <Form.Label column xs={5} lg={3}>
                Number of voters
              </Form.Label>
              <Col>
                <Form.Control
                  required
                  min={1}
                  type="number"
                  value={numberOfDeveloper}
                  onChange={(event) => {
                    setnumberOfDeveloper(event.target.value);
                  }}
                  onBlur={convertArrayDevelopers}
                />
              </Col>
            </Form.Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Form.Group
            style={{ width: "100%" }}
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>
              Paste your story List (Each line will be converted as a story)
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="5"
              value={storyListValue}
              onChange={changeTextArea}
              onBlur={convertList}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col
            md={{ span: 3, offset: 9 }}
            xs={{ span: 6, offset: 6 }}
            style={{ padding: 0 }}
          >
            <Button
              variant="outline-dark"
              type="submit"
              style={{ width: "100%" }}
              onClick={handleClick}
            >
              Start Session
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreatePlanning;

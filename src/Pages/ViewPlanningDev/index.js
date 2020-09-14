import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";
import StoryList from "../../components/StoryList";
import VotePanel from "../../components/VotePanel";

function ViewPlanningDev() {
  let query = useQuery();

  const [sprintData, setSpringData] = useState(
    JSON.parse(window.localStorage.getItem("SprintDetail"))
  );

  const [developerId] = useState(query.get("id"));

  useEffect(() => {
    const interval = setInterval(() => {
      setSpringData(JSON.parse(window.localStorage.getItem("SprintDetail")));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header></Header>
      {sprintData.data.map((item, index) => {
        if (item.status === "Active") {
          return (
            <Row key={index}>
              <Col sm={12} md={8}>
                <StoryList data={sprintData.data}></StoryList>
              </Col>
              <Col sm={12} md={4}>
                <VotePanel
                  id={developerId}
                  smVote={item.votes[developerId - 1].vote}
                  storyName={item.name}
                  data={sprintData}
                ></VotePanel>
              </Col>
            </Row>
          );
        } else return null;
      })}
    </div>
  );
}

export default ViewPlanningDev;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

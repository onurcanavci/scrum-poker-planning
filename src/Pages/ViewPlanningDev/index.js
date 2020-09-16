import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../../components/Header";
import StoryList from "../../components/StoryList";
import VotePanel from "../../components/VotePanel";
import { fetchSprints } from "../../redux/actions/sprint";

function ViewPlanningDev(props) {
  let query = useQuery();
  const { sprintData } = props;
  const [developerId] = useState(query.get("id"));

  useEffect(() => {
    const interval = setInterval(() => {
      props.actions.fetchSprints();
    }, 2000);
    return () => clearInterval(interval);
  }, [props, props.actions]);

  return (
    <>
      {sprintData !== "" ? (
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
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  ...state,
  sprintData: state.sprint.sprintData,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    fetchSprints: () => {
      dispatch(fetchSprints());
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlanningDev);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

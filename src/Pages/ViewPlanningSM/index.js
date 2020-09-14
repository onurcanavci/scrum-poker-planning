import React, { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { connect } from "react-redux";

import Header from "../../components/Header";
import ScrumMasterPanel from "../../components/ScrumMasterPanel";
import StoryList from "../../components/StoryList";
import VotePanel from "../../components/VotePanel";
import { fetchSprints } from "../../redux/actions/sprint";

function ViewPlanningSM(props) {
  const { sprintData } = props;

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
          <Header
            link={"http://localhost:3000/poker-planning-view-as-developer?id=1"}
          ></Header>

          {sprintData.data.map((item, index) => {
            if (item.status === "Active") {
              return (
                <Row key={index}>
                  <Col sm={12} md={6}>
                    <StoryList data={sprintData.data}></StoryList>
                  </Col>
                  <Col sm={12} md={3}>
                    <VotePanel
                      id={0}
                      smVote={item.votes[item.votes.length - 1].vote}
                      storyName={item.name}
                      data={sprintData}
                    ></VotePanel>
                  </Col>
                  <Col sm={12} md={3}>
                    <ScrumMasterPanel
                      storyName={item.name}
                      data={item.votes}
                      sprintData={sprintData}
                    ></ScrumMasterPanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPlanningSM);

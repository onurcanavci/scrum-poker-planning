import React from "react";
import { Table } from "react-bootstrap";

function StoryList(props) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Story</th>
            <th>Story Point</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.storyPoint}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StoryList;

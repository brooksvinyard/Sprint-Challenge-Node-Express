import React from 'react';
import { Link } from 'react-router-dom';

const Project = props => {
  return (
    <div className="project">
      <Link to={`/project/${props.id}`} key={props.id}>
      <h3>{props.name}</h3>
      {/* <strong>{props.description}</strong>
      <p>{props.completed} </p> */}
      </Link>
    </div>
  );
};

Project.defaultProps = {
  name: '',
  description: '',
  completed: false
};

export default Project;
import React, { Component } from 'react';

import Project from './Project';

class ProjectList extends Component {

  render() {
    return (
      <div className="Projects">
      <h2>Projects List</h2>
        <div className="project-List" >
          {this.props.projects.map(project => {
            return (
              <Project
                name={project.name}
                id={project.id}
                description={project.description}
                completed={project.completed}
                key={project.id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProjectList;
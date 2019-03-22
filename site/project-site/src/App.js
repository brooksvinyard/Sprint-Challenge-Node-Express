import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import './components/Projects.css';

import ProjectList from './components/ProjectList';
import ProjectCard from './components/ProjectCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      actions: []
    };
  } 

  componentDidMount() {
    axios
      .get('http://localhost:4444/api/projects')
      .then(res => {
        console.log(res);
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });

      axios
      .get('http://localhost:4444/api/actions')
      .then(res => {
        console.log(res);
        this.setState({ actions: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }

  getActionsOfProject = (id) => {
    console.log('getActionsOfProject');
    axios
    .get(`http://localhost:4444/api/projects/${id}/actions`)
    .then(res => {
        console.log(res);
        // this.setState({ actions: res.data });
        return res.data;
    })
    .catch(err => {
        console.log(err);
        this.setState({ error: err });
    });
}


  render() {
    return (
      <div className="App">
      <h2> Welcome to the projects!</h2>
        <Route exact path="/" render={props => <ProjectList {...props} projects={this.state.projects} />} />
        <Route path="/project/:id" render={props =>  <ProjectCard {...props} projects={this.state.projects}  getActionsOfProject={this.getActionsOfProject}/> } />
      </div>
    );
  }
}

export default App;

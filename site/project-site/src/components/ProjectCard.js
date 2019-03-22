import React, { Component } from 'react';

class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [],
            project: []
        };
    }

    componentDidMount() {
        const id = this.props.match.params;
        let project = this.props.projects.find(thing => `${thing.id}` === id.id);
        
        this.setState({ project: project });

        // let projectActions = this.props.getActionsOfProject(id.id);
        // console.log("projectActions", projectActions);
        // this.setState({ actions: projectActions });

    }


    render() {
        if (!this.state.project) {
            return <h3>Loading Project...</h3>;
        } else {
            return (
                <div className="Project-List">
                    <div className="project">
                        <h3>{this.state.project.name}</h3>
                        <strong>{this.state.project.description}</strong>
                        {/* <p>Completed: {this.state.project.completed}</p> */}
                    </div>
                </div>
            )
    }}
};


export default ProjectCard;
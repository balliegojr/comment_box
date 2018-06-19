import React, { Component } from 'react';
import { Role } from '../authorization';
import PlanChooser from './planChooser';
import PlanForm from './planForm';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handlePlanChoose = this.handlePlanChoose.bind(this);
        this.state = {

        }
    }

    handlePlanChoose(plan) {
        this.setState({ plan: plan });
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-header">
                    <h2> Welcome to Comment Box</h2>
                    <p>Comments made easy</p>
                </div> 

                <Role roles={["Admin"]}> Admin </Role>
                <Role roles={["Owner"]}> Owner </Role>
                <Role roles={["Moderator"]}> Moderator </Role>
                <Role roles={[]}>
                    <div className="row">
                        <div className="col-sm-12 text-center alert">
                            <p> To use the Comment Box on your own site, you need to choose a plan and then create a new api key </p>
                        </div>
                    </div>
                    <PlanChooser onChoose={ this.handlePlanChoose }/>
                    <hr />
                    { this.state.plan ? <PlanForm plan={ this.state.plan } /> : null}

                </Role>
            </React.Fragment>
        )
    }
}

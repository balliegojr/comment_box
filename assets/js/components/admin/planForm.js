import React, { Component } from 'react';
import { connect } from 'react-redux';

import { accountActions } from '../../store/actions'
import withValidation from '../../hoc/withValidation';


class PlanForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            domain: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(ev) {
        ev.preventDefault();
        if (!this.props.validation.validateForm(this.form)) {
            return;
        }

        this.props.doJoinPlan({ plan: this.props.plan.name, domain: this.state.domain })
            .then(() => {
                
            }, (reason) => {
                
            });
    }

    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value});
    }

    render() {
        return (
            <form className="plan-form" onSubmit={(ev) => this.handleSubmit(ev)} ref={(form) => this.form = form } >
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <img className="img img-responsive center-block" src={this.props.plan.image} />
                        <p> <b> { this.props.plan.title } </b> </p>
                        <p> There is just one step left, insert your domain in the field bellow, so we can generate a brand new api key for you</p>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-sm-4 col-sm-offset-4">
                        <input className="form-control" placeholder="www.mydomain.com" name="domain" value={this.state.domain} onChange={this.handleChange} required />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4 text-center">
                        <button className="btn btn-primary" type="submit">Join Plan</button>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        doJoinPlan: (plan_info) => dispatch(accountActions.joinPlan(plan_info))
    }
}

export default withValidation(connect(mapStateToProps, mapDispatchToProps)(PlanForm));
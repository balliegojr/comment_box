import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewDomain } from '../../store/actions/domainActions';

class NewDomainForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            domain: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev) {
        const { name, value } = ev.target;
        this.setState({ [name]: value });
    }
    handleSubmit(ev) {
        ev.preventDefault();

        this.props.doAddNewDomain({ address: this.state.domain })
            .then(() => {
                if (this.props.onHideForm) {
                    this.props.onHideForm();
                }
            });

    }
    handleCancelClick() {
        if (this.props.onHideForm) {
            this.props.onHideForm();
        }
    }
    render() {
        return (
            <form className="" onSubmit={(ev) => this.handleSubmit(ev)}>
                <div className="row form-group">
                    <div className="col-sm-2 text-right">
                        <label className="control-label"> Domain  </label>
                    </div>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" placeholder="www.domain.com" onChange={this.handleChange} name="domain" value={this.state.domain} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12 text-right">
                        <button className="btn btn-link" type="button" onClick={() => this.handleCancelClick()}> Cancel </button>
                        <button className="btn btn-default" type="submit"> Save </button>
                    </div>
                </div>
                <hr />
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doAddNewDomain: (domain_info) => dispatch(addNewDomain(domain_info))
    }
}

export default connect(null, mapDispatchToProps)(NewDomainForm);
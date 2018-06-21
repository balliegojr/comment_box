import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultHandleChange, handleCheckedChange } from '../../utility';
import SwitchToggle from '../switchToggle';
import notifiable from '../../hoc/notifiable';
import { editDomain, updateDomain } from '../../store/actions/domainActions';

export class DomainEdit extends Component {
    constructor(props) {
        super(props)
        
        this.state = { }

        this.handleChange = defaultHandleChange(this);
        this.handleCheckedChange = handleCheckedChange.bind(this);
    }

    componentDidMount() {
        this.props.doSetEditingDomain(+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.doSetEditingDomain(null);
    }

    componentWillReceiveProps(receivedProps) {
        if (receivedProps.domain) {
            const { allowComments, allowAnonymousComments, allowAnonymousView } = receivedProps.domain;
            this.setState({
                allowComments,
                allowAnonymousComments,
                allowAnonymousView
            });
        }
    }

    handleCancelClick() {
        this.props.history.goBack();
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const domain_info = {
            id: this.props.domain.id,
            allowComments: this.state.allowComments,
            allowAnonymousComments: this.state.allowAnonymousComments,
            allowAnonymousView: this.state.allowAnonymousView
        };
        
        this.setState({ saving: true});
        this.props.doUpdateDomain(domain_info)
        .then(() => {
            this.props.notifiable.info('Domain saved');
            this.props.history.goBack();
        }, () => {
                this.setState({ saving: false });
                this.props.notifiable.error('Oops, something went wrong!');
            });
    }


    render() {
        if (!this.props.domain) {
            return <div>Loading</div>
        }

        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <div className=" text-right">
                    <h5 className="h4"> Editing Domain </h5>
                </div>

                <div className="row form-group">
                    <div className="col-sm-4 text-right">
                        <label className="control-label"> Address </label>
                    </div>
                    <div className="col-sm-8">
                        <input className="form-control" value={this.props.domain.address} readOnly="true" />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-4 text-right">
                        <label className="control-label"> App Key </label>
                    </div>
                    <div className="col-sm-8">
                        <input className="form-control" value={this.props.domain.app_key} readOnly="true" />
                    </div>
                </div>
                <hr />
                
                <fieldset disabled={this.state.saving}>
                    <div className="row form-group">
                        <div className="col-xs-12 col-sm-12 text-center">
                            <p>Default values for page creation</p>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="form-group col-xs-8 col-sm-4 text-right ">
                            <label className="control-label"> Allow Comments </label>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <SwitchToggle checked={this.state.allowComments} onChange={this.handleCheckedChange} name="allowComments" />
                        </div>

                        <div className="form-group col-xs-8 col-sm-4 text-right">
                            <label className="control-label"><span className="hidden-xs">Allow</span> Anonymous Comments </label>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <SwitchToggle checked={this.state.allowAnonymousComments} onChange={this.handleCheckedChange}   name="allowAnonymousComments" />
                        </div>

                        <div className="form-group col-xs-8 col-sm-4 text-right">
                            <label className="control-label"><span className="hidden-xs">Allow</span> Anonymous View </label>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <SwitchToggle checked={this.state.allowAnonymousView} onChange={this.handleCheckedChange}   name="allowAnonymousView" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xs-12">
                            <hr />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12 text-right">
                            <button className="btn btn-link" type="button" onClick={() => this.handleCancelClick()}> Cancel </button>
                            <button className="btn btn-default" type="submit"> Save </button>
                        </div>
                    </div>
                </fieldset>

            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        domain: state.domains.editing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSetEditingDomain: (domain_id) => dispatch(editDomain(domain_id)),
        doUpdateDomain: (domain_info) => dispatch(updateDomain(domain_info))
    }
}

export default notifiable(connect(mapStateToProps, mapDispatchToProps)(DomainEdit));
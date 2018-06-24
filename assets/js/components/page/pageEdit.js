import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultHandleChange, handleCheckedChange } from '../../utility';
import SwitchToggle from '../switchToggle';
import notifiable from '../../hoc/notifiable';
import { editPage, updatePage } from '../../store/actions/pagesActions';

export class PageEdit extends Component {
    constructor(props) {
        super(props);

        this.state = { };
        this.handleChange = defaultHandleChange(this);
        this.handleCheckedChange = handleCheckedChange.bind(this);
    }
    
    componentDidMount() {
        this.props.doSetEditingPage(+this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.doSetEditingPage(null);
    }

    componentWillReceiveProps(receivedProps) {
        if (receivedProps.page) {
            const { allowComments, allowAnonymousComments, allowAnonymousView } = receivedProps.page;
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

        const page_info = {
            id: this.props.page.id,
            allowComments: this.state.allowComments,
            allowAnonymousComments: this.state.allowAnonymousComments,
            allowAnonymousView: this.state.allowAnonymousView
        };

        this.setState({ saving: true });
        this.props.doUpdatePage(page_info)
            .then(() => {
                this.props.notifiable.info('Page saved');
                this.props.history.goBack();
            }, () => {
                this.setState({ saving: false });
                this.props.notifiable.error('Oops, something went wrong!');
            });
    }

    render() {
        if (!this.props.page) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info text-center">
                            Loading
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
                <div className=" text-right">
                    <h5 className="h4"> Editing Page </h5>
                </div>

                <div className="row form-group">
                    <div className="col-sm-4 text-right">
                        <label className="control-label"> Domain </label>
                    </div>
                    <div className="col-sm-8">
                        <input className="form-control" value={this.props.page.domain.address} readOnly="true" />
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-sm-4 text-right">
                        <label className="control-label"> Url </label>
                    </div>
                    <div className="col-sm-8">
                        <input className="form-control" value={this.props.page.url} readOnly="true" />
                    </div>
                </div>
                <hr />

                <fieldset disabled={this.state.saving}>
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
                            <SwitchToggle checked={this.state.allowAnonymousComments} onChange={this.handleCheckedChange} name="allowAnonymousComments" />
                        </div>

                        <div className="form-group col-xs-8 col-sm-4 text-right">
                            <label className="control-label"><span className="hidden-xs">Allow</span> Anonymous View </label>
                        </div>
                        <div className="col-xs-4 col-sm-2">
                            <SwitchToggle checked={this.state.allowAnonymousView} onChange={this.handleCheckedChange} name="allowAnonymousView" />
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
        page: state.pages.editing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doSetEditingPage: (page_id) => dispatch(editPage(page_id)),
        doUpdatePage: (page_info) => dispatch(updatePage(page_info))
    }
}

export default notifiable(connect(mapStateToProps, mapDispatchToProps)(PageEdit));
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadDomains, deleteDomain, setDomainPage } from '../../store/actions/domainActions';
import NewDomainForm from './newDomainForm';
import notifiable from '../../hoc/notifiable';
import Switcher from '../pagination/switcher';

export const DomainRow = ({ domain, canDelete, handleDelete, handleCopy }) => {
    return (
        <tr>
            <td> {domain.address} </td>
            <td className="key"> {domain.app_key} </td>
            <td className="text-right"> 
                <small> 
                    <a onClick={() => handleCopy(domain.app_key)}> Copy Key </a> 
                    | <Link to={`/domains/${domain.id}`}> Edit </Link>
                    { canDelete ? ( <span> |  <a onClick={() => handleDelete(domain.id)}> Delete </a> </span>) : null }
                </small>
            </td>
        </tr>
    )
}

export class CopyKey extends Component {
    componentDidMount() {
        this.copyContent();
    }
    copyContent() {
        this.input.select();
        document.execCommand("copy");
    }

    render() {
        return (
            <div>
                Key copied to your clipboard!!!
                <input value={this.props.appKey} style={{ position: 'absolute', left: '-9999px'}} readOnly="true" ref={(input) => this.input = input } />
            </div>
        );
    }
}

export class DomainList extends Component {
    constructor(props){
        super(props);

        this.state = {};

        this.handleCopy = this.handleCopy.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onHideForm = this.onHideForm.bind(this);
    }
    componentDidMount() {
        this.props.doLoadDomains();
    }

    handleCopy(key) {
        this.props.notifiable.info(<CopyKey appKey={key} />);
    }

    handleDelete(domain_id) {
        this.props.doDeleteDomain(domain_id);
    }

    handleNew() {
        this.setState({ showNewForm: true });
    }

    onHideForm() {
        this.setState({ showNewForm: false });
    }


    render() {
        if (this.props.domains.fetching) {
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

        if (!this.props.domains.pagination.current.length) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info text-center">
                            There are no domains to show
                        </div>
                    </div>
                </div>
            )
        }


        const canDelete = this.props.domains.pagination.all.length > 1;
        const domains = this.props.domains.pagination.current.map(domain => (
            <DomainRow 
                key={domain.id}
                domain={domain}
                canDelete={canDelete}
                handleDelete={this.handleDelete}
                handleCopy={this.handleCopy}
                />
        ));
        
        return (
            <div className="domain-list"> 
                <div className="">
                    <a className="pull-right" onClick={() => this.handleNew()}> Add New </a>
                    <h4>Domains</h4>
                </div>
                <hr />

                { this.state.showNewForm ? <NewDomainForm onHideForm={this.onHideForm}/> : null }

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Address </th>
                            <th className="key"> Key </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {domains}
                    </tbody>
                </table>

                <Switcher pagination={this.props.domains.pagination} setPage={this.props.setPage} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        domains: state.domains
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLoadDomains: () => dispatch(loadDomains()),
        doDeleteDomain: (domain_id) => dispatch(deleteDomain(domain_id)),
        setPage: (page) => dispatch(setDomainPage(page))
    }
}

export default notifiable(connect(mapStateToProps, mapDispatchToProps)(DomainList));
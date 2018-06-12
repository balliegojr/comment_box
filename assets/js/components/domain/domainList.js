import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDomains, deleteDomain } from '../../store/actions/domainActions';
import NewDomainForm from './newDomainForm';

const DomainRow = ({ domain, canDelete, handleDelete, handleCopy }) => {
    return (
        <tr>
            <td> {domain.address} </td>
            <td className="key"> {domain.app_key} </td>
            <td className="text-right"> 
                <small> 
                    <a onClick={() => handleCopy(domain.app_key)} disabled="disabled"> Copy Key </a> 
                    { canDelete ? ( <span> |  <a onClick={() => handleDelete(domain.id)}> Delete </a> </span>) : null }
                </small>
            </td>
        </tr>
    )
}



class DomainList extends Component {
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
        const canDelete = this.props.domains.length > 1;
        const domains = this.props.domains.map(domain => <DomainRow key={domain.id} domain={domain} canDelete={canDelete} handleDelete={this.handleDelete} handleCopy={this.handleCopy} />)
        
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

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        domains: state.domains.loadedDomains
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLoadDomains: () => dispatch(loadDomains()),
        doDeleteDomain: (domain_id) => dispatch(deleteDomain(domain_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainList);
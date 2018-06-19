import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDomains, deleteDomain } from '../../store/actions/domainActions';
import NewDomainForm from './newDomainForm';
import notifiable from '../../hoc/notifiable';

export const DomainRow = ({ domain, canDelete, handleDelete, handleCopy }) => {
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
        const canDelete = this.props.domains.length > 1;
        const domains = this.props.domains.map(domain => (
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

export default notifiable(connect(mapStateToProps, mapDispatchToProps)(DomainList));
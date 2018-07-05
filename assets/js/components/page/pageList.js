import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pagesActions } from '../../store/actions';
import Switcher from '../pagination/switcher';

const PageRow = ({ page: page}) => {
    return (
        <tr>
            <td>{page.domain.address}</td>
            <td><a href={`http://${page.domain.address}${page.url}`} target="_blank">{page.url}</a></td>
            <td> {page.allowComments ? 'Yes' : 'No' } </td>
            <td> {page.allowAnonymousComments ? 'Yes' : 'No' } </td>
            <td> {page.allowAnonymousView ? 'Yes' : 'No' } </td>
            <td>{moment(page.inserted_at).format('L LT') }</td>
            <td>
                <Link to={`/pages/${page.id}`}>
                    edit
                </Link>
            </td>
        </tr>
    )
}

export class PageList extends Component {
    componentDidMount() {
        this.props.doLoadPages();
    }
    render() {
        if (this.props.pages.fetching) {
            return (<div></div>);
        }

        if (!this.props.pages.pagination.all.length) {
            return (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="alert alert-info text-center">
                            There are no pages to show
                        </div>
                    </div>
                </div>
            )
        }

        const pages = this.props.pages.pagination.current.map(page => <PageRow key={page.id} page={page} />);

        return (
            <div className="page-list">
                <div className="">
                    {/* <a className="pull-right" onClick={() => this.handleNew()}> Add New </a> */}
                    <h4>Pages</h4>
                </div>
                <hr />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> Domain </th>
                            <th> Url </th>
                            
                            <th title="Allow Comments"> C </th>
                            <th title="Allow Anonymous Comments"> AC </th>
                            <th title="Allow Anonymous Views"> AV </th>
                            
                            <th> Created </th>
                            <th>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages}
                    </tbody>
                </table>

                <Switcher pagination={this.props.pages.pagination} setPage={this.props.setPage} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pages: state.pages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doLoadPages: () => dispatch(pagesActions.loadPages()),
        setPage: (page) => dispatch(pagesActions.setCurrentPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
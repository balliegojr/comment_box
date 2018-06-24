import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { pagesActions } from '../../store/actions';


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
        if (this.props.pages.isLoading) {
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

        if (!this.props.pages.loadedPages.length) {
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

        const pages = this.props.pages.loadedPages.map(page => <PageRow key={page.id} page={page} />);

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
        doLoadPages: () => dispatch(pagesActions.loadPages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
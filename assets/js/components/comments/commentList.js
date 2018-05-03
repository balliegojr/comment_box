import React from "react";
import Comment from "./comment";
import * as commentActions from "../../store/actions/commentActions";
import { connect } from "react-redux";

class CommentList extends React.Component {
    componentDidMount() {
        this.props.onLoadComments();
    }


    render() {
        if (this.props.comments.loadedComments.length === 0) {
            return (
                <ul className="comments">
                    There are no comments yet
                </ul>
            )
        }

        const comments = this.props.comments.loadedComments.map((comment) => (<Comment key={comment.id} comment={comment} />))
        return (
            <ul className="comments">
                {comments}
            </ul>
        )
    }
    
}


const mapStateToProps = state => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadComments: () => dispatch(commentActions.loadComments())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
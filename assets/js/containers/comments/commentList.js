import React from "react";
import { Comment } from "../../components/comments/comment";
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

        const comments = this.props.comments.loadedComments.map((comment) => (<Comment comment={comment} />))
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
        // onIncrementCounter: () => dispatch(actionCreators.increment()),
        // onDecrementCounter: () => dispatch(actionCreators.decrement()),
        // onAddCounter: () => dispatch(actionCreators.add(10)),
        // onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        // onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        // onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
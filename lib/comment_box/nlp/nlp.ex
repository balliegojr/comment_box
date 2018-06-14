defmodule CommentBox.Nlp do
    
    alias CommentBox.Comments
    alias CommentBox.Comments.Comment
    
    @nlp_engine Application.get_env(:comment_box, :nlp_engine)
    
    def sentment_analysis(%Comment{} = comment) do
        @nlp_engine.sentiment(comment, &handle_comment_sentment_analysis/2)
    end
    
    defp handle_comment_sentment_analysis(comment, sentiment) do
        with {:ok, comment} <- Comments.update_comment(comment, %{ sentiment_polarity: sentiment["polarity"], sentiment_confidence: sentiment["polarity_confidence"] }) do
            CommentBoxWeb.Endpoint.broadcast("page:#{comment.page_id}", "comment_updated",  CommentBoxWeb.CommentView.render("show.json", comment: comment))
        end
    end
end
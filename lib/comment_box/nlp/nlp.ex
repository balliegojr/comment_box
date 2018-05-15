defmodule CommentBox.Nlp do
    alias CommentBox.Nlp.Aylien
    alias CommentBox.Comments
    alias CommentBox.Comments.Comment

    def sentment_analysis(%Comment{} = comment) do
        Task.Supervisor.start_child(CommentBox.TaskSupervisor, fn -> handle_comment_sentment_analysis(comment) end)
    end
    
    defp handle_comment_sentment_analysis(comment) do
        sentiment = Aylien.sentiment(comment.content)
        with {:ok, comment} <- Comments.update_comment(comment, %{ sentiment_polarity: sentiment["polarity"], sentiment_confidence: sentiment["polarity_confidence"] }) do
            CommentBoxWeb.Endpoint.broadcast("page:#{comment.page_id}", "comment_updated",  CommentBoxWeb.CommentView.render("show.json", comment: comment))
        end
    end
end
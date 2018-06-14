defmodule CommentBox.Nlp.NlpEngine do
  @doc "..."
  @callback sentiment(comment :: CommentBox.Comments.Comment) :: %{}
end
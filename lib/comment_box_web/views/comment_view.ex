defmodule CommentBoxWeb.CommentView do
  use CommentBoxWeb, :view
  alias CommentBoxWeb.CommentView

  def render("index.json", %{comment: comment}) do
    render_many(comment, CommentView, "comment.json")
  end

  def render("show.json", %{comment: comment}) do
    render_one(comment, CommentView, "comment.json")
  end

  def render("comment.json", %{comment: comment}) do
    %{
      id: comment.id,
      content: comment.content,
      status: comment.status,

      inserted_at: comment.inserted_at,
      user: render_user(comment.user)
    }
  end

  defp render_user(nil), do: nil
  defp render_user(user) do 
    %{
      id: user.id,
      username: user.username
    }
  end
end

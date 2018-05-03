defmodule CommentBoxWeb.CommentController do
  use CommentBoxWeb, :controller

  alias CommentBox.Comments
  alias CommentBox.Comments.Comment
  alias CommentBox.Auth.Guardian
  

  action_fallback CommentBoxWeb.FallbackController

  defp user_id(conn)  do
     case Guardian.Plug.authenticated?(conn) do
      true -> Guardian.Plug.current_resource(conn)["id"]
      _ -> nil
    end
  end


  def index(conn, _params) do
    comment = Comments.list_comment()
    render(conn, "index.json", comment: comment)
  end

  def create(conn, %{"comment" => comment_params}) do
    with {:ok, %Comment{} = comment} <- Comments.create_comment(Map.put(comment_params, "user_id", user_id(conn))) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", comment_path(conn, :show, comment))
      |> render("show.json", comment: comment)
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

  def update(conn, %{"id" => id, "comment" => comment_params}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{} = comment} <- Comments.update_comment(comment, comment_params) do
      render(conn, "show.json", comment: comment)
    end
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end

  def get_page_comments(conn, %{"page_id" => page_id}) do
      comment = Comments.list_comment_by_page(page_id)
      render(conn, "index.json", comment: comment)
  end
end

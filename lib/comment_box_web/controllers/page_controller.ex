defmodule CommentBoxWeb.PageController do
  use CommentBoxWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end

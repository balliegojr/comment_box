defmodule CommentBoxWeb.PageController do
  use CommentBoxWeb, :controller

  def index(conn, _params) do
    redirect conn, to: "/examples/awesome"
  end

  def app(conn, _params) do
    render conn, "index.html"
  end

  def awesome_example(conn, _params) do
    render conn, "awesome.html"
  end
end

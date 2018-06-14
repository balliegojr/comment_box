defmodule CommentBoxWeb.PageController do
  use CommentBoxWeb, :controller

  alias CommentBox.Comments

  action_fallback CommentBoxWeb.FallbackController
  
  def index(conn, _params) do
    redirect conn, to: "/examples/awesome"
  end

  def app(conn, _params) do
    render conn, "index.html"
  end

  def admin(conn, _params) do
    render conn, "admin.html"
  end

  def awesome_example(conn, _params) do
    domain = Comments.get_domain_by_address("#{conn.host}:#{conn.port}")
    render conn, "awesome.html", domain: domain
  end
end

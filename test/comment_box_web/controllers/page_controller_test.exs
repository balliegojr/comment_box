defmodule CommentBoxWeb.PageControllerTest do
  use CommentBoxWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert redirected_to(conn) == page_path(conn, :awesome_example)
  end

  test "GET /app", %{conn: conn} do
    conn = get conn, "/app"
    assert html_response(conn, 200) =~ "hello-react"    
    
  end

  test "GET /examples/awesome", %{conn: conn} do
    conn = get conn, "/examples/awesome"
    assert html_response(conn, 200) =~ "This is an awesome example"    
  end
end

defmodule CommentBoxWeb.PageControllerTest do
  use CommentBoxWeb.ConnCase

  alias CommentBox.Comments

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert redirected_to(conn) == page_path(conn, :awesome_example)
  end

  test "GET /app", %{conn: conn} do
    conn = get conn, "/app"
    assert html_response(conn, 200) =~ "hello-react"    
    
  end

  test "GET /admin", %{conn: conn} do
    conn = get conn, "/admin"
    assert html_response(conn, 200) =~ "admin.js"    
    
  end

  describe "get example page" do
    setup [:create_domain]
    test "GET /examples/awesome", %{conn: conn} do
      conn = get conn, "/examples/awesome"
      assert html_response(conn, 200) =~ "This is an awesome example"    
    end
  end

  @create_attrs %{address: "www.example.com:80"}
    
  def domain_fixture(attrs \\ %{}) do
    {:ok, domain} =
        attrs
        |> Enum.into(@create_attrs)
        |> Comments.create_domain()

    domain
  end

  defp create_domain(_) do
    %{id: user_id} = get_default_user()

    domain = domain_fixture(%{user_id: user_id})
    {:ok, domain: domain}
  end
end

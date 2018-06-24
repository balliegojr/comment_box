defmodule CommentBoxWeb.PageSettingsControllerTest do
  use CommentBoxWeb.ConnCase

  alias CommentBox.Comments

  @create_attrs %{address: "www.example.com:80"}

  describe "get page settings" do
    setup [:create_domain]
    
    test "GET /api/page", %{conn: conn, domain: %{app_key: key}} do
      conn = get conn, "/api/page"
      assert %{ "errors" => "Necessary parameters are missing"} = json_response(conn, 400)


      conn = get conn, "/api/page", u: "some strange url", k: key, h: @create_attrs[:address]
      assert response = json_response(conn, 200)
  
      assert response["url"] == "some strange url"
      assert response["id"]
      assert response["hashed_url"]
    end
  end

  describe "get all pages of the current user" do
    setup [:authenticate]

    test "GET /api/pages", %{conn: conn} do
      conn = get conn, page_settings_path(conn, :index)
      assert json_response(conn, 200) == []
    end
  end

  describe "update page" do
    setup [:authenticate, :create_page]

    test "PUT /api/pages/:id", %{conn: conn, page: page} do
      conn = put conn, page_settings_path(conn, :update, page.id), %{ page: %{ allowComments: false, allowAnonymousComments: false, allowAnonymousView: false }}
      
      assert %{
          "id" => page_id,
          "allowAnonymousComments" => false,
          "allowAnonymousView" => false,
          "allowComments" => false
      } = json_response(conn, 200)
    
      assert page_id == page.id
    end
  end

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

  defp create_page(_) do
    {:ok, domain: domain} = create_domain(nil)
    
    page = Comments.get_page_by_url_or_create("/someurl", domain)
    {:ok, page: page}
  end
 
end

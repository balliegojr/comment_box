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

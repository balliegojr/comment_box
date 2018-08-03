defmodule CommentBoxWeb.AuthControllerTests do
  use CommentBoxWeb.ConnCase
  alias CommentBox.Accounts

  @user_attrs %{username: "user", email: "user@email.com", password: "123", password_confirmation: "123"}
  
  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "signup" do
    test "create an user and return a token", %{conn: conn} do
        conn = post conn, user_path(conn, :sign_up), %{ user: @user_attrs }
        assert %{ "access_token" => _token} = json_response(conn, 200)

        assert Accounts.find_by_username("user")
    end
      
    test "return errors when there are missing info", %{conn: conn} do
        conn = post conn, user_path(conn, :sign_up), %{user: %{username: "john"}}
        assert %{ "errors" => _ } = json_response(conn, 422)
    end
  end

  describe "signin" do
      test "return an user token", %{conn: conn} do
          Accounts.create_user(@user_attrs)

          conn = post conn, user_path(conn, :sign_in), %{ user: %{ username: "user", password: "123"}}
          assert %{ "access_token" => _token} = json_response(conn, 200)
      end

      test "return unauthorized", %{conn: conn} do
          Accounts.create_user(@user_attrs)

          conn = post conn, user_path(conn, :sign_in), %{ user: %{ username: "user", password: "1234"}}
          assert %{ "error" => _ } = json_response(conn, :unauthorized)
      end
  end
end

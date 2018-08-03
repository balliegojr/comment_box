defmodule CommentBoxWeb.UserControllerTests do
  use CommentBoxWeb.ConnCase
  alias CommentBox.Accounts

  @user_attrs %{username: "user", email: "user@email.com", password: "123", password_confirmation: "123"}
  
  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "me" do
      setup [:authenticate]
      test "return the current authenticated user", %{conn: conn, user: %{ id: user_id, username: username, email: email }} do
          conn = get conn, user_path(conn, :me)
          assert %{
            "id" => ^user_id,
            "username" => ^username,
            "email" => ^email
          } = json_response(conn, 200)
      end
  end

  describe "index" do
    setup [:authenticate]
    test "return all users", %{conn: conn} do
        conn = get conn, user_path(conn, :index)
        assert [_] = json_response(conn, 200)
    end
  end

  describe "user_by_type" do
    setup [:authenticate_admin]
    
    test "return all users of given type", %{conn: conn} do
        conn = get conn, user_path(conn, :user_by_type, "admin")
        assert [%{ "username" => "admin"}] = json_response(conn, 200)

        {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()})

        conn = get conn, user_path(conn, :user_by_type, "admin")
        assert json_response(conn, 401)
    end
  end


  describe "admin_update" do
    setup [:authenticate_admin]
    
    test "update the information of the given user", %{conn: conn, user: user} do
        update_info = %{ id: user.id, username: user.username, roles: [%{name: "Owner", add: true}]}
      
        conn = put conn, user_path(conn, :admin_update, user.id), user: update_info
        assert %{
          "username" => "admin",
          "roles" => [%{"name" => "Admin"}, %{"name" => "Owner"}]
          } = json_response(conn, 200)

        {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()})

        conn = put conn, user_path(conn, :admin_update, user.id)
        assert json_response(conn, 401)
    end
  end

  describe "update" do
    setup [:authenticate]
    
    test "update the information of the current user", %{conn: conn, user: user} do
      update_info = %{id: user.id, name: "updated name"}
      conn = put conn, user_path(conn, :update, user.id), user: update_info
      assert %{
        "username" => "user",
        "name" => "updated name"
        } = json_response(conn, 200)

      {:ok, [conn: conn, user: _]} = authenticate_admin(%{conn: build_conn()})

      conn = put conn, user_path(conn, :update, user.id), user: update_info
      inspect response(conn, 403)
    end
  end


  describe "set_plan" do
    setup [:authenticate]
    
    test "set the plan of the current user", %{conn: conn} do
      conn = put conn, user_path(conn, :set_plan), plan: %{ plan: "some plan" }
      assert %{
        "plan" => "some plan",
        "roles" => [%{"name" => "Owner"}]
        } = json_response(conn, 200)
    end
  end
end

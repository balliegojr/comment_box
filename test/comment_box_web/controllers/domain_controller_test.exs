defmodule CommentBoxWeb.DomainControllerTest do
    use CommentBoxWeb.ConnCase

    alias CommentBox.Comments

    @create_attrs %{address: "localhost"}
    
    def domain_fixture(attrs \\ %{}) do
        {:ok, domain} =
            attrs
            |> Enum.into(@create_attrs)
            |> Comments.create_domain()

        domain
    end


    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end


    describe "index" do
        setup [:authenticate]

        test "list user domains", %{conn: conn} do
            conn = get conn, domain_path(conn, :index)
            assert json_response(conn, 200) == []
        end
    end


    describe "create domain" do
        setup [:authenticate]
        
        test "renders domain when data is valid", %{conn: conn} do
            conn = post conn, domain_path(conn, :create), domain: @create_attrs
            assert %{
                "address" => "localhost", 
                "app_key" => app_key
                } = json_response(conn, 201)

            assert app_key
        end 
    end


    describe "delete domain" do
        setup [:authenticate, :create_domain]

        test "deletes chosen domain", %{conn: conn, domain: domain} do
            conn = delete conn, domain_path(conn, :delete, domain)
            assert response(conn, 204)

            {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()}) 

            conn = get conn, domain_path(conn, :index)
            assert json_response(conn, 200) == []

        end
    end

    defp create_domain(%{user: %{id: user_id}}) do
        domain = domain_fixture(%{user_id: user_id})
        {:ok, domain: domain}
    end

end
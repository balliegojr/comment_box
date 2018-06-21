defmodule CommentBoxWeb.CommentControllerTest do
  use CommentBoxWeb.ConnCase

  alias CommentBox.Comments
  alias CommentBox.Comments.{Comment}

  @create_attrs %{content: "some content", status: 42}
  @update_attrs %{content: "some updated content", status: 43}
  @invalid_attrs %{content: nil, status: nil}

  def fixture(:domain, user_id) do
    {:ok, domain} = Comments.create_domain(%{ address: "some domain", user_id: user_id})
    domain
  end
  def fixture(:comment, page_id) do
    {:ok, comment} = Comments.create_comment(Map.put(@create_attrs, :page_id, page_id))
    comment
  end

  def fixture(:page, url, domain) do
    Comments.get_page_by_url_or_create(url, domain)
  end


  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:authenticate]

    test "lists all comment", %{conn: conn} do
      conn = get conn, comment_path(conn, :index)
      assert json_response(conn, 200) == []
    end
  end

  describe "create comment" do
    setup [:authenticate]
    
    test "renders comment when data is valid", %{conn: conn, user: %{id: user_id}} do
      domain = fixture(:domain, user_id)
      %{id: page_id} = fixture(:page, "www.example.com", domain)
      conn = post conn, comment_path(conn, :create), comment: Map.put(@create_attrs, "page_id", page_id)
      
      assert %{"id" => id} = json_response(conn, 201)

      {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()}) 

      conn = get conn, comment_path(conn, :show, id)
      assert %{
        "id" => ^id,
        "content" => "some content",
        "user" => %{ "username" => "user" }
        } = json_response(conn, 200) 
    end

    test "renders errors when data is invalid", %{conn: conn} do
   
      conn = post conn, comment_path(conn, :create), comment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update comment" do
    setup [:authenticate, :create_comment]

    test "renders comment when data is valid", %{conn: conn, comment: %Comment{id: id} = comment} do
      conn = put conn, comment_path(conn, :update, comment), comment: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)

      {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()}) 

      conn = get conn, comment_path(conn, :show, id)
      assert %{
        "id" => ^id,
        "content" => "some updated content",
        "user" => nil,
        "status" => 43
        } = json_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, comment: comment} do
      conn = put conn, comment_path(conn, :update, comment), comment: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete comment" do
    setup [:authenticate, :create_comment]

    test "deletes chosen comment", %{conn: conn, comment: comment} do
      conn = delete conn, comment_path(conn, :delete, comment)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        {:ok, [conn: conn, user: _]} = authenticate(%{conn: build_conn()}) 
        get conn, comment_path(conn, :show, comment)
      end
    end
  end

  describe "get_page_comments" do
    setup [:authenticate]

    test "lists all comments of a given page", %{conn: conn, user: %{id: user_id}} do
      domain = fixture(:domain, user_id)
      %{id: page_id} = fixture(:page, "www.example.com", domain)
      
      conn = get conn, comment_path(conn, :get_page_comments, page_id)
      assert json_response(conn, 200) == []
    end
  end

  defp create_comment(%{user: %{id: user_id}}) do
    
    domain = fixture(:domain, user_id)
    page_id = fixture(:page, "www.example.com", domain).id
    comment = fixture(:comment, page_id)
    {:ok, comment: comment}
  end
end

defmodule CommentBox.CommentsTest do
  use CommentBox.DataCase

  alias CommentBox.Comments

  setup %{} do
    %{ id: user_id} = CommentBoxWeb.AuthenticateHelper.get_default_user()
    
    %{ user_id: user_id}
  end


  describe "pages" do
    alias CommentBox.Comments.Page

    @valid_attrs %{reputation: 42, status: 42, url: "some url", hashed_url: "B19EACCD2D7354CFB67986AA657A28C9", allowAnonymousComments: false, allowAnonymousView: true, allowComments: true }
    @update_attrs %{url: "some updated url", allowAnonymousComments: true, allowAnonymousView: false, allowComments: false}
    @invalid_attrs %{reputation: nil, status: nil, url: nil}

    def page_fixture(attrs \\ %{}) do
      %{ id: user_id} = CommentBoxWeb.AuthenticateHelper.get_default_user()
      
      {:ok, %{id: domain_id}} =
        %{ address: "teste", user_id: user_id}
        |> Comments.create_domain()
        
        {:ok, page} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Enum.into(%{ domain_id: domain_id})
        |> Comments.create_page()

      page
    end

    test "list_pages/0 returns all pages" do
      %{ id: user_id} = CommentBoxWeb.AuthenticateHelper.get_default_user()
      page = page_fixture()
        |> CommentBox.Repo.preload(:domain)

      assert Comments.list_pages(user_id) == [page]
    end

    test "get_page!/1 returns the page with given id" do
      page = page_fixture()
        |> CommentBox.Repo.preload(:domain)
        
      assert Comments.get_page!(page.id) == page
    end

    test "get_page_by_url_or_create/2 returns the page with a given url or create a new one", %{user_id: user_id} do
      {:ok, domain} =
      %{ address: "teste", user_id: user_id, allowAnonymousComments: false, allowAnonymousView: true, allowComments: true}
        |> Comments.create_domain()

      page = Comments.get_page_by_url_or_create("a magnific url", domain);
      assert page.url == "a magnific url"
      assert page.hashed_url  == Page.hash_url("a magnific url")
      assert page.allowAnonymousComments == false
      assert page.allowAnonymousView == true

      assert page.id == Comments.get_page_by_url_or_create("a magnific url", domain).id;
      assert page.id != Comments.get_page_by_url_or_create("another magnific url", domain).id;
    end

    test "create_page/1 with valid data creates a page", %{user_id: user_id} do
      {:ok, domain} =
      %{ address: "teste", user_id: user_id, allowAnonymousComments: false, allowAnonymousView: true, allowComments: true}
       |> Comments.create_domain()

      assert {:ok, %Page{} = page} = Comments.create_page(Map.put(@valid_attrs, :domain_id, domain.id))
      assert page.reputation == 42
      assert page.status == 42
      assert page.url == "some url"
    end

    test "create_page/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_page(@invalid_attrs)
    end

    test "update_page/2 with valid data updates the page" do
      page = page_fixture()
      assert {:ok, page} = Comments.update_page(page, @update_attrs)
      assert %Page{} = page
      assert page.url == "some url"
      assert page.allowComments == false
      assert page.allowAnonymousComments == true
      assert page.allowAnonymousView == false
    end

    test "delete_page/1 deletes the page" do
      page = page_fixture()
      assert {:ok, %Page{}} = Comments.delete_page(page)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_page!(page.id) end
    end

    test "change_page/1 returns a page changeset" do
      page = page_fixture()
      assert %Ecto.Changeset{} = Comments.change_page(page)
    end
  end

  describe "comment" do
    alias CommentBox.Comments.Comment

    @valid_attrs %{content: "some content", status: 42}
    @update_attrs %{content: "some updated content", status: 43}
    @invalid_attrs %{content: nil, status: nil}

    def comment_fixture(attrs \\ %{}) do
      %{ id: user_id} = CommentBoxWeb.AuthenticateHelper.get_default_user()
      
      {:ok, domain} =
        %{ address: "teste", user_id: user_id}
        |> Comments.create_domain()

      page = Comments.get_page_by_url_or_create("default url", domain)

      {:ok, comment} =
        attrs
        |> Enum.into(Map.put(@valid_attrs, :page_id, page.id))
        |> Comments.create_comment()

      comment
    end

    test "list_comment/0 returns all comment" do
      comment = comment_fixture()
      assert [%{ content: "some content", id: comment_id }] = Comments.list_comment()
      assert comment.id == comment_id
    end

    test "list_comment_by_page/1 returns all comments of given page" do
      comment = comment_fixture()
      assert [%{ content: "some content", id: id }] = Comments.list_comment_by_page(comment.page_id)
      assert id == comment.id
      assert Comments.list_comment_by_page(0) == []
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert %{ content: "some content", id: id } = Comments.get_comment!(comment.id) 
      assert id == comment.id
    end

    test "create_comment/1 with valid data creates a comment", %{user_id: user_id} do
      {:ok, domain} =
        %{ address: "teste", user_id: user_id}
        |> Comments.create_domain()

      page = Comments.get_page_by_url_or_create("default url", domain)
      valid_attr = Map.put(@valid_attrs, :page_id, page.id)   
      
      assert {:ok, %Comment{ id: comment_id }} = Comments.create_comment(valid_attr)
      assert %Comment{ 
        content: "some content",
        status: 42,
        sentiment_polarity: "positive",
        sentiment_confidence: 0.5
      } = Comments.get_comment!(comment_id)
      
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      assert {:ok, comment} = Comments.update_comment(comment, @update_attrs)
      assert %Comment{} = comment
      assert comment.content == "some updated content"
      assert comment.status == 43
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Comments.update_comment(comment, @invalid_attrs)
      assert %{ content: "some content" } = Comments.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Comments.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Comments.change_comment(comment)
    end
  end

  describe "domains" do
    alias CommentBox.Comments.Domain

    @valid_attrs %{address: "some address", allowAnonymousComments: false, allowAnonymousView: true, allowComments: true}
    @update_attrs %{ allowAnonymousComments: true, allowAnonymousView: false, allowComments: false}
    @invalid_attrs %{address: nil, app_key: nil}

    def domain_fixture(attrs \\ %{}) do
      {:ok, domain} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Comments.create_domain()

      domain
    end

    test "list_domains/1 returns all domains that belongs to a given user", %{ user_id: user_id } do
      domain = domain_fixture(%{user_id: user_id})
      assert Comments.list_domains(user_id) == [domain]
    end

    test "get_domain!/1 returns the domain with given id", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert Comments.get_domain!(domain.id) == domain
    end

    test "get_domain_by_address/1 returns the domain with given address", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert Comments.get_domain_by_address("some address") == domain
    end

    test "get_domain_by_address_and_key/2 returns the domain with given address and key", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert Comments.get_domain_by_address_and_key("some address", domain.app_key) == domain
    end

    test "create_domain/1 with valid data creates a domain", %{ user_id: user_id } do
      assert {:ok, %Domain{ 
        address: "some address", 
        app_key: app_key
        }} = Comments.create_domain(Enum.into(@valid_attrs, %{ user_id: user_id }))
      
      assert app_key
    end

    test "create_domain/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Comments.create_domain(@invalid_attrs)
    end

    test "update_domain/2 with valid data updates the domain", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert {:ok, %{  allowAnonymousComments: true, allowAnonymousView: false, allowComments: false }} = Comments.update_domain(domain, @update_attrs)
    end


    test "delete_domain/1 deletes the domain", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert {:ok, %Domain{}} = Comments.delete_domain(domain)
      assert_raise Ecto.NoResultsError, fn -> Comments.get_domain!(domain.id) end
    end

    test "change_domain/1 returns a domain changeset", %{ user_id: user_id } do
      domain = domain_fixture(%{ user_id: user_id })
      assert %Ecto.Changeset{} = Comments.change_domain(domain)
    end
  end
end

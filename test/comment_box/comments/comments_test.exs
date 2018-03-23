defmodule CommentBox.CommentsTest do
  use CommentBox.DataCase

  alias CommentBox.Comments

  describe "pages" do
    alias CommentBox.Comments.Page

    @valid_attrs %{reputation: 42, status: 42, url: "some url"}
    @update_attrs %{reputation: 43, status: 43, url: "some updated url"}
    @invalid_attrs %{reputation: nil, status: nil, url: nil}

    def page_fixture(attrs \\ %{}) do
      {:ok, page} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Comments.create_page()

      page
    end

    test "list_pages/0 returns all pages" do
      page = page_fixture()
      assert Comments.list_pages() == [page]
    end

    test "get_page!/1 returns the page with given id" do
      page = page_fixture()
      assert Comments.get_page!(page.id) == page
    end

    test "create_page/1 with valid data creates a page" do
      assert {:ok, %Page{} = page} = Comments.create_page(@valid_attrs)
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
      assert page.reputation == 43
      assert page.status == 43
      assert page.url == "some updated url"
    end

    test "update_page/2 with invalid data returns error changeset" do
      page = page_fixture()
      assert {:error, %Ecto.Changeset{}} = Comments.update_page(page, @invalid_attrs)
      assert page == Comments.get_page!(page.id)
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
      {:ok, comment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Comments.create_comment()

      comment
    end

    test "list_comment/0 returns all comment" do
      comment = comment_fixture()
      assert Comments.list_comment() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Comments.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      assert {:ok, %Comment{} = comment} = Comments.create_comment(@valid_attrs)
      assert comment.content == "some content"
      assert comment.status == 42
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
      assert comment == Comments.get_comment!(comment.id)
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
end

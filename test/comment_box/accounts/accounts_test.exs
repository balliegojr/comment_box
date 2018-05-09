defmodule CommentBox.AccountsTest do
  use CommentBox.DataCase

  alias CommentBox.Accounts

  describe "users" do
    alias CommentBox.Accounts.User

    @valid_attrs %{account_status: 42, email: "some email", name: "some name", password: "some password", password_confirmation: "some password", username: "some username"}
    @update_attrs %{account_status: 43, email: "some updated email", name: "some updated name", password: "updated password", password_confirmation: "updated password", username: "some updated username"}
    @invalid_attrs %{account_status: nil, email: nil, name: nil, password_hash: nil, username: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil})
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil})
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      # assert user.account_status == 0 #not casting account status right now
      assert user.email == "some email"
      assert user.name == "some name"
      assert user.username == "some username"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      # assert user.account_status == 0
      assert user.email == "some updated email"
      assert user.name == "some updated name"
      
      assert user.username == "some updated username"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil})
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end

    test "find_by_username/1 returns a user byt its username" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil})
      assert Accounts.find_by_username(user.username) == user
    end

    test "authenticate/2 check a user for its password and return a token" do
      user = user_fixture()
      assert { :ok, _, _ } = Accounts.authenticate(user, "some password")
      assert { :error, :unauthorized} = Accounts.authenticate(user, "wrong password")
    end
  end
end

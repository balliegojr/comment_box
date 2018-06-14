defmodule CommentBox.AccountsTest do
  use CommentBox.DataCase

  alias CommentBox.Accounts
  alias CommentBox.Accounts.Role

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
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil, :user_roles => []})
      assert Accounts.list_users() == [user]
    end

    test "list_users/1 returns users in given roles" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil, :user_roles => []})
      assert Accounts.list_users([Role.admin]) == []

      {:ok , user } = Accounts.admin_update_user(user, %{"roles" => [%{"name" => Role.admin, "add" => true}]})
      [%{ } = admin_user] = Accounts.list_users([Role.admin])
      assert admin_user.id == user.id
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil, :user_roles => []})
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

    test "update_user/2 with valid data changes user password" do
      user = user_fixture()
      hash = user.password_hash

      update_attrs = for {k, v} <- Map.put(@update_attrs, :current_password, "wrong password"),
        do: {to_string(k), v}, into: %{}

      assert {:error, :unauthorized} = Accounts.update_user(user, update_attrs)

      update_attrs = for {k, v} <- Map.put(@update_attrs, :current_password, "some password"),
        do: {to_string(k), v}, into: %{}

      assert {:ok, user} = Accounts.update_user(user, update_attrs)
      assert %User{} = user
      assert hash != user.password_hash
      assert user.email == "some updated email"
      assert user.name == "some updated name"
      
      assert user.username == "some updated username"
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
      assert %{ name: "some name", email: "some email" } = Accounts.get_user!(user.id)
    end

    test "admin_update_user/2 update user and its roles" do
      user = user_fixture()
      
      update_info = %{
        "name" => "updated name", 
        "roles" => [%{"name" => Role.admin, "add" => true}]
      }

      Accounts.admin_update_user(Accounts.get_user!(user.id), update_info)
      assert %{ name: "updated name", user_roles: [%{ role: %{ name: "Admin" }}]} = Accounts.get_user!(user.id)
    end

    test "set_user_plan/2 update user plan and set Onwer role" do
      user = user_fixture()
      assert {:ok, %{ plan: "test plan"}} = Accounts.set_user_plan(Accounts.get_user!(user.id), %{"plan" => "test plan"})
      assert %{ name: "some name", user_roles: [%{ role: %{ name: "Owner" }}]} = Accounts.get_user!(user.id)

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
      user = user_fixture() |> Map.merge(%{:password => nil, :password_confirmation => nil, :user_roles => []})
      assert Accounts.find_by_username(user.username) == user
    end

    test "authenticate/2 check a user for its password and return a token" do
      user = user_fixture()
      assert { :ok, _, _ } = Accounts.authenticate(Accounts.get_user!(user.id), "some password")
      assert { :error, :unauthorized} = Accounts.authenticate(user, "wrong password")
    end
  end
end

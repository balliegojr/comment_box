defmodule CommentBoxWeb.AuthenticateHelper do
    alias CommentBox.Accounts
    alias CommentBox.Accounts.{Role, User, UserRole}
    alias CommentBox.Repo

    use Phoenix.ConnTest
    
    def get_default_user do
        {:ok, user} = case Accounts.find_by_username("user") do
            nil -> 
                {:ok, %{id: user_id}} = Accounts.create_user(%{"email" => "user@email.com", "username" => "user", "password" => "123", "password_confirmation" => "123", "auth_provider" => "identity"})
                {:ok, Accounts.get_user!(user_id)}
            user -> {:ok, user}
        end

        user
    end
    
    def authenticate(%{conn: conn}) do
        user = get_default_user()
       
        with {:ok, token, _claims} <- Accounts.authenticate(user, "123") do
            conn = conn |> put_req_header("authorization", "Bearer #{token}")
            {:ok, conn: conn, user: user}
        end
    end

    def create_admin_user do 
        admin_role = Repo.get_by!(Role, name: "Admin")

        %User{}
            |> User.changeset(%{username: "admin", email: "admin", password: "admin", password_confirmation: "admin"})
            |> Ecto.Changeset.put_assoc(:user_roles, [%UserRole{ role: admin_role}])

            |> Repo.insert!()
    end


    def get_admin_user do
        {:ok, user} = case Accounts.find_by_username("admin") do
            nil -> 
                %{id: user_id} = create_admin_user()
                {:ok, Accounts.get_user!(user_id)}
            user -> {:ok, user}
        end

        user
    end

    def authenticate_admin(%{conn: conn}) do
        user = get_admin_user()
       
        with {:ok, token, _claims} <- Accounts.authenticate(user, "admin") do
            conn = conn |> put_req_header("authorization", "Bearer #{token}")
            {:ok, conn: conn, user: user}
        end
    end
end
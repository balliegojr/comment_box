defmodule CommentBoxWeb.UserController do
    use CommentBoxWeb, :controller

    alias CommentBox.Accounts
    alias CommentBox.Accounts.User

    action_fallback CommentBoxWeb.FallbackController
    @valid_user_types ~w(admin owner moderator)

    def sign_up(conn, %{"user" => user_info}) do
        with {:ok, %User{} = user} <- Accounts.create_user(user_info) do
            {:ok, token, _claims} = CommentBox.Auth.Guardian.encode_and_sign(user)

            conn
                |> put_resp_header("authorization", "Bearer #{token}")
                |> json(%{access_token: token}) # Return token to the client
        end
    end

    def show(conn, %{"id" => id}) do
        user = Accounts.get_user!(id)
        render(conn, "show.json", user: user)
    end


    def sign_in(conn, %{"user" => user_info}) do
        response = case Accounts.find_by_username(user_info["username"]) do
            nil -> {:error, :unauthorized}
            user -> Accounts.authenticate(user, user_info["password"])
        end

        case response do
            {:ok, token, _claims} -> conn
                        |> put_resp_header("authorization", "Bearer #{token}")
                        |> json(%{access_token: token}) # Return token to the client
            {:error, _} -> conn |> put_status(:unauthorized) |> json(%{error: "Username or password are invalid"})
        end
    end

    def me(conn, _) do
        user = conn
        |> Guardian.Plug.current_resource

        show(conn, user)
    end

    def index(conn, _) do
        users = Accounts.list_users()
        render conn, "index.json", user: users
    end

    def user_by_type(conn, %{"type" => type}) do
        
        types = 
            String.split(type, ",") 
            |> Enum.filter(fn(t) -> Enum.any?(@valid_user_types, fn(x) -> x == t end) end)
            |> Enum.map(&String.capitalize/1)

        
        users = Accounts.list_users(types)
        render conn, "index.json", user: users
    end

    def admin_update(conn, %{"id" => id, "user" => user_params}) do
        user = Accounts.get_user!(id)
        with {:ok, %User{} = user} <- Accounts.admin_update_user(user, user_params) do
            render(conn, "show.json", user: Accounts.get_user!(id))
        end
    end

end
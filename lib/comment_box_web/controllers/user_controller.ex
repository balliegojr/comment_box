defmodule CommentBoxWeb.UserController do
    use CommentBoxWeb, :controller

    alias CommentBox.Accounts
    alias CommentBox.Accounts.User

    action_fallback CommentBoxWeb.FallbackController

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
            user -> Accounts.authenticate(%{user: user, password: user_info["password"]})
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
end
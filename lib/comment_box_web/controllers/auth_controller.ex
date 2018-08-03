defmodule CommentBoxWeb.AuthController do
    use CommentBoxWeb, :controller
    plug Ueberauth

    alias Ueberauth.Auth
    alias CommentBox.Accounts
    alias CommentBox.Accounts.User

    defp basic_info(%Auth{} = auth) do
        {:ok, %{
                "avatar" => auth.info.image,
                "email" => auth.info.email,
                "name" => auth.info.name,
                "username" => auth.info.nickname || Enum.at(String.split(auth.info.email, "@"), 0),
                "auth_provider" => Atom.to_string(auth.provider)
            }
        }
    end

    def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
        conn
            |> put_status(401)
            |> render(CommentBoxWeb.AuthView, :unauthorized)
    end

    def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
        {:ok, user_info } = basic_info(auth)

        {:ok, user } = case CommentBox.Accounts.find_by_username(user_info["username"]) do
            nil -> Accounts.create_user(user_info)
            user -> { :ok, user }
        end

        case user_info["auth_provider"] == user.auth_provider do
            true -> sign_in(conn, user)
            false -> conn |> put_status(401) |> render(CommentBoxWeb.AuthView, :unauthorized)
        end
    end

    def identity_callback(%{assigns: %{ueberauth_auth: _auth}} = conn,  %{"user" => user_info}) do
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

    def sign_in(conn, %User{} = user) do
        {:ok, token, _claims} = CommentBox.Auth.Guardian.encode_and_sign(user)

        conn
        |> put_resp_header("authorization", "Bearer #{token}")
        |> render(CommentBoxWeb.AuthView, :authorized, %{access_token: token})
    end

    def sign_up(conn, %{"user" => user_info}) do
        with {:ok, %User{} = user} <- Accounts.create_user(Map.put(user_info, "auth_provider", "identity")) do
            {:ok, token, _claims} = CommentBox.Auth.Guardian.encode_and_sign(user)

            conn
                |> put_resp_header("authorization", "Bearer #{token}")
                |> json(%{access_token: token}) # Return token to the client
        end
    end
end
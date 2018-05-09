defmodule CommentBoxWeb.AuthenticateHelper do
    alias CommentBox.Accounts

    use Phoenix.ConnTest
    
    def get_default_user do
        {:ok, user} = case Accounts.find_by_username("user") do
            nil -> Accounts.create_user(%{email: "user@email.com", username: "user", password: "123", password_confirmation: "123"})
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
end
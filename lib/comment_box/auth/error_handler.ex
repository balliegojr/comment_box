defmodule CommentBox.Auth.ErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do
    body = Poison.encode!(%{message: to_string(type)})
    conn |> put_status(401) |> Phoenix.Controller.json(body)
    
  end
end

defmodule CommentBoxWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use CommentBoxWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(CommentBoxWeb.ChangesetView, "error.json", changeset: changeset)
  end


  def call(conn, {:error, :unauthorized}) do
    conn
    |> put_status(:unauthorized)
    |> render(CommentBoxWeb.ErrorView, :"401")
  end

  def call(conn, {:error, :forbidden}) do
    conn
    |> put_status(:forbidden)
    |> render(CommentBoxWeb.ErrorView, :"403")
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(CommentBoxWeb.ErrorView, :"404")
  end
end

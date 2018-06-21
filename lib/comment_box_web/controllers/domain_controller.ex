defmodule CommentBoxWeb.DomainController do
  use CommentBoxWeb, :controller

  alias CommentBox.Comments
  alias CommentBox.Comments.Domain
  alias CommentBox.Auth.Guardian
  

  action_fallback CommentBoxWeb.FallbackController

  defp user_id(conn)  do
     case Guardian.Plug.authenticated?(conn) do
      true -> Guardian.Plug.current_resource(conn)["id"]
      _ -> nil
    end
  end


  def index(conn, _params) do
    domain = Comments.list_domains(user_id(conn))
    render(conn, "index.json", domain: domain)
  end

  def create(conn, %{"domain" => domain_params}) do
    with {:ok, %Domain{} = domain} <- Comments.create_domain(Map.put(domain_params, "user_id", user_id(conn))) do
      conn
        |> put_status(:created)
        |> render("show.json", domain: domain)
    end
  end

  def delete(conn, %{"id" => id}) do
    domain = Comments.get_domain!(id)
    with {:ok, %Domain{}} <- Comments.delete_domain(domain) do
      send_resp(conn, :no_content, "")
    end
  end

   def update(conn, %{"id" => id, "domain" => domain_params}) do
    domain = Comments.get_domain!(id)

    with {:ok, %Domain{} = domain} <- Comments.update_domain(domain, domain_params) do
      render(conn, "show.json", domain: domain)
    end
  end
end

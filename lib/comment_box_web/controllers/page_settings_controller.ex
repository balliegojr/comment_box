defmodule CommentBoxWeb.PageSettingsController do
    use CommentBoxWeb, :controller
    alias CommentBox.Comments
    alias CommentBox.Comments.Page
    alias CommentBox.Auth.Guardian

    action_fallback CommentBoxWeb.FallbackController

    defp user_id(conn)  do
        case Guardian.Plug.authenticated?(conn) do
            true -> Guardian.Plug.current_resource(conn)["id"]
            _ -> nil
        end
    end

    def get_page_settings(conn, %{ "u" => url, "k" => app_key, "h" => host}) do
        case Comments.get_domain_by_address_and_key(host, app_key) do
            nil -> { :error, :forbidden }
            domain ->
                page_settings = Comments.get_page_by_url_or_create(url, domain)
                render(conn, "page_settings.json", page_settings: page_settings)
        end

        # {_, url} = Enum.find(conn.req_headers, fn({key, _}) -> key == "referer" end)
        
    end

    def get_page_settings(conn, _) do
        conn |> put_status(400) |> json(%{ errors: "Necessary parameters are missing" })
    end

    def index(conn, _params) do
        page = Comments.list_pages(user_id(conn))
        render(conn, "index.json", page: page)
    end
    
    def update(conn, %{"id" => id, "page" => page_params}) do
        %{ domain: domain } = page = Comments.get_page!(id)
        
        with {:ok, %Page{} = page} <- Comments.update_page(page, page_params) do
            notify_page_update(page)
            render(conn, "show.json", page: Map.put(page, :domain, domain))
        end
    end    
    
    def notify_page_update(page) do
        CommentBoxWeb.Endpoint.broadcast("page:#{page.id}", "page_updated",  CommentBoxWeb.PageSettingsView.render("show.json", page: page))
    end
end
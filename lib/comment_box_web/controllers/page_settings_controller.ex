defmodule CommentBoxWeb.PageSettingsController do
    use CommentBoxWeb, :controller
    alias CommentBox.Comments

    action_fallback CommentBoxWeb.FallbackController

    def get_page_settings(conn, %{ "u" => url}) do
        # {_, url} = Enum.find(conn.req_headers, fn({key, _}) -> key == "referer" end)
        page_settings = Comments.get_page_by_url_or_create(url)

        render(conn, "page_settings.json", page_settings: page_settings)
    end

    def get_page_settings(conn, _) do
        conn |> put_status(400) |> json(%{ errors: "Necessary parameters are missing" })
    end
    
end
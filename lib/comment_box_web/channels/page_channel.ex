defmodule CommentBoxWeb.PageChannel do
    use Phoenix.Channel
    
    def join("page:" <> _page_id, _message, socket) do
        {:ok, socket}
    end
end
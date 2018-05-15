defmodule CommentBox.Nlp.Aylien do
    use HTTPoison.Base
    
    @endpoint Application.fetch_env!(:comment_box, CommentBox.Nlp.Aylien)[:endpoint]
    @secret_key Application.fetch_env!(:comment_box, CommentBox.Nlp.Aylien)[:secret_key]
    @app_id Application.fetch_env!(:comment_box, CommentBox.Nlp.Aylien)[:app_id]
    
    defp process_url(url), do: build_url url
    defp build_url("/" <> url), do: @endpoint <> url
    defp build_url(url), do: @endpoint <> url

    defp process_request_headers(headers) do
        Enum.concat(headers, [
            {"X-AYLIEN-TextAPI-Application-Key", @secret_key}, 
            {"X-AYLIEN-TextAPI-Application-ID", @app_id}
            ])
    end

    def sentiment(text) do
        get!("/sentiment?" <> URI.encode_query(%{text: text})).body 
            |> Poison.decode!
            |> Map.take(~w(polarity polarity_confidence))
            # |> Enum.map(fn({k, v}) -> {String.to_atom(k), v} end)
    end
end
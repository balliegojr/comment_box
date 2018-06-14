defmodule CommentBox.Nlp.Aylien do
    @behaviour CommentBox.Nlp.NlpEngine
    
    use HTTPoison.Base
    
    @conf Application.get_env(:comment_box, CommentBox.Nlp.Aylien)

    defp process_url(url), do: build_url url
    
    defp build_url("/" <> url), do: @conf[:endpoint] <> url
    defp build_url(url), do: @conf[:endpoint] <> url

    defp process_request_headers(headers) do
        Enum.concat(headers, [
            {"X-AYLIEN-TextAPI-Application-Key", @conf[:secret_key]}, 
            {"X-AYLIEN-TextAPI-Application-ID", @conf[:app_id]}
            ])
    end

    def sentiment(%{ content: text } = comment, handle_comment_sentment_analysis) do
        Task.Supervisor.start_child(CommentBox.TaskSupervisor, fn -> 
            # IO.inspect "/sentiment?" <> URI.encode_query(%{text: text})
            sentiment = get!("/sentiment?" <> URI.encode_query(%{text: text})).body 
            |> Poison.decode!
            |> Map.take(~w(polarity polarity_confidence))
            
            handle_comment_sentment_analysis.(comment, sentiment) 
        end)
    end
end
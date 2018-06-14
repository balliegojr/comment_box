defmodule CommentBox.Nlp.Fake do
    @behaviour CommentBox.Nlp.NlpEngine
    
    def sentiment(comment, handle_comment_sentment_analysis) do
        sentiment = %{
            "polarity" => "positive",
            "polarity_confidence" => 0.5
        }

        handle_comment_sentment_analysis.(comment, sentiment) 
    end
end
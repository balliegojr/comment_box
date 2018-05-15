defmodule CommentBox.Repo.Migrations.AddCommentSentiment do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :sentiment_polarity, :string, size: 10
      add :sentiment_confidence, :float

      remove :reputation
    end
  end
end

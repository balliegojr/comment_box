defmodule CommentBox.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  alias CommentBox.Accounts.User

  schema "comments" do
    field :content, :string
    field :status, :integer
    # field :user_id, :id
    field :page_id, :id
    field :reply_to, :id
    
    field :sentiment_polarity, :string
    field :sentiment_confidence, :float

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:content, :status, :page_id, :user_id, :reply_to, :sentiment_polarity, :sentiment_confidence])
    |> validate_required([:content, :status, :page_id])
  end
end

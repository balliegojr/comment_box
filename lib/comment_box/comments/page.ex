defmodule CommentBox.Comments.Page do
  use Ecto.Schema
  import Ecto.Changeset


  schema "pages" do
    field :reputation, :integer
    field :status, :integer
    field :url, :string
    field :hashed_url, :string
    field :allowAnonymousComments, :boolean
    field :allowAnonymousView, :boolean
    

    timestamps()
  end

  def hash_url(url), do: :crypto.hash(:md5, url) |> Base.encode16()

  @doc false
  def changeset(page, attrs) do
    page
    |> cast(attrs, [:url, :status, :reputation, :hashed_url, :allowAnonymousComments, :allowAnonymousView])
    |> validate_required([:url, :status, :hashed_url])
  end
end

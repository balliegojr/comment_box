defmodule CommentBox.Comments.Page do
  use Ecto.Schema
  import Ecto.Changeset


  schema "pages" do
    field :reputation, :integer
    field :status, :integer
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(page, attrs) do
    page
    |> cast(attrs, [:url, :status, :reputation])
    |> validate_required([:url, :status])
  end
end

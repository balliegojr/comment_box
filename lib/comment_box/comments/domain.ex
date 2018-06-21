defmodule CommentBox.Comments.Domain do
  use Ecto.Schema
  import Ecto.Changeset

  @app_key_length 64

  schema "domains" do
    field :address, :string
    field :app_key, :string
    field :user_id, :id
    
    field :allowComments, :boolean
    field :allowAnonymousComments, :boolean
    field :allowAnonymousView, :boolean
        
    timestamps()
  end

  @doc false
  def changeset(domain, attrs) do
    domain
    |> cast(attrs, [:address, :user_id, :allowAnonymousComments, :allowAnonymousView, :allowComments])
    |> put_app_key()
    |> validate_required([:address, :app_key, :user_id])
  end

  def update_changeset(domain, attrs) do
    domain
    |> cast(attrs, [:allowAnonymousComments, :allowAnonymousView, :allowComments])
  end

  def put_app_key(%Ecto.Changeset{} = changeset) do
    change(changeset, app_key: :crypto.strong_rand_bytes(@app_key_length) |> Base.url_encode64 |> binary_part(0, @app_key_length))
  end
end

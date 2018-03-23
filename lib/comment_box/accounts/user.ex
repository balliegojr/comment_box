defmodule CommentBox.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :account_status, :integer
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :username, :string
    field :reputation, :integer

    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email, :password_hash, :account_status])
    |> validate_required([:name, :username, :email, :password_hash, :account_status])
    |> unique_constraint(:username)
  end
end

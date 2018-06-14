defmodule CommentBox.Accounts.Role do
  use Ecto.Schema
  import Ecto.Changeset

  def admin, do: "Admin"
  def owner, do: "Owner"
  def moderator, do: "Moderator"


  schema "roles" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end

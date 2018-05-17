defmodule CommentBox.Accounts.UserRole do
  use Ecto.Schema
  import Ecto.Changeset

  alias CommentBox.Accounts.{Role, User}


  schema "user_roles" do
    # field :user_id, :id
    # field :role_id, :id

    belongs_to :user, User
    belongs_to :role, Role

    timestamps()
  end

  @doc false
  def changeset(user_role, attrs) do
    user_role
    |> cast(attrs, [:user_id, :role_id])
    |> validate_required([:user_id, :role_id])
  end
end

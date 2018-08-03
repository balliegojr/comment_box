defmodule CommentBox.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Comeonin.Bcrypt
  alias CommentBox.Accounts.UserRole

  schema "users" do
    field :account_status, :integer
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :username, :string
    field :reputation, :integer
    field :plan, :string

    field :auth_provider, :string
    field :avatar, :string

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true

    has_many :user_roles, UserRole, on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(user, %{ "auth_provider" => "identity" } = attrs) do
    user
      |> cast(attrs, [:name, :username, :email, :password, :password_confirmation, :account_status, :auth_provider, :avatar])
      |> validate_required([:username, :email, :password, :password_confirmation, :auth_provider])
      |> validate_confirmation(:password, message: "Password does not match")
      |> unique_constraint(:username, message: "Username already in use")
      |> unique_constraint(:email, message: "Email already in use")
      |> put_pass_hash()
  end

  def changeset(user, attrs) do
    user
      |> cast(attrs, [:name, :username, :email, :password, :password_confirmation, :account_status, :auth_provider, :avatar])
      |> validate_required([:username, :email, :auth_provider])
      |> unique_constraint(:username, message: "Username already in use")
      |> unique_constraint(:email, message: "Email already in use")
  end

  def update_nopassword_changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email, :account_status])
    |> validate_required([:username, :email])
    |> unique_constraint(:username, message: "Username already in use")
    |> unique_constraint(:email, message: "Email already in use")
    
  end

  def update_plan_only_changeset(user, attrs) do
    user
    |> cast(attrs, [:plan])
  end

  def admin_update_changeset(user, attrs) do
    
    user
    |> cast(attrs, [:name, :account_status])
    |> validate_required([:account_status])
    
  end

  defp put_pass_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, password_hash: Bcrypt.hashpwsalt(password))
  end
  defp put_pass_hash(changeset), do: changeset
end

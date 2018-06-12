defmodule CommentBox.Repo.Migrations.CreateUserRoles do
  use Ecto.Migration

  alias CommentBox.Repo
  alias CommentBox.Accounts.{User, UserRole, Role}

  def change do
    create table(:user_roles) do
      add :user_id, references(:users, on_delete: :nothing)
      add :role_id, references(:roles, on_delete: :nothing)

      timestamps()
    end

    create index(:user_roles, [:user_id])
    create index(:user_roles, [:role_id])
  end
end

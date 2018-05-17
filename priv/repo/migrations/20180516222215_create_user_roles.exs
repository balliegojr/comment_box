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

    flush 

    admin_role = Repo.get_by!(Role, name: "Admin")
    user = %User{}
        |> User.changeset(%{username: "admin", email: "admin", password: "admin", password_confirmation: "admin"})
        |> Ecto.Changeset.put_assoc(:user_roles, [%UserRole{ role: admin_role}])

        |> Repo.insert!()

    # %UserRole{}
    #   |> UserRole.changeset(%{})


  end
end

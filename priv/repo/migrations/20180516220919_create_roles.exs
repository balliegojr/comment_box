defmodule CommentBox.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add :name, :string

      timestamps()
    end

    create unique_index(:roles, [:name])

    flush
    
    Enum.each ~w(Admin Owner Moderator), fn role ->
      %CommentBox.Accounts.Role{}
        |> CommentBox.Accounts.Role.changeset(%{ name: role})
        |> CommentBox.Repo.insert()
     
    end


  end
end

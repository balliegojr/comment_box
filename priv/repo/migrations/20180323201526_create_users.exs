defmodule CommentBox.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :username, :string
      add :email, :string
      add :password_hash, :string
      add :account_status, :integer, default: 0
      add :reputation, :integer

      timestamps()
    end

    create unique_index(:users, [:username])
  end
end

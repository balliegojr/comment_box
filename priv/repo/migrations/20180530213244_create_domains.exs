defmodule CommentBox.Repo.Migrations.CreateDomains do
  use Ecto.Migration

  def change do
    create table(:domains) do
      add :address, :string, size: 200
      add :app_key, :string, size: 100
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:domains, [:user_id])
    create index(:domains, [:address], unique: true)
    
  end
end

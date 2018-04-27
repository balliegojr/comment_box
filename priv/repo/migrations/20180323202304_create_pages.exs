defmodule CommentBox.Repo.Migrations.CreatePages do
  use Ecto.Migration

  def change do
    create table(:pages) do
      add :url, :string
      add :status, :integer
      add :reputation, :integer
      add :hashed_url, :string
      add :allowAnonymousComments, :boolean, default: false
      add :allowAnonymousView, :boolean, default: true

      timestamps()
    end

    
    create index(:pages, [:hashed_url], unique: true)
    # create index(:pages, [:user_id, :hashed_url], unique: true)
  end
end

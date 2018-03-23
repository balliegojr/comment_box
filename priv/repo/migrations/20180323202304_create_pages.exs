defmodule CommentBox.Repo.Migrations.CreatePages do
  use Ecto.Migration

  def change do
    create table(:pages) do
      add :url, :string
      add :status, :integer
      add :reputation, :integer

      timestamps()
    end

  end
end

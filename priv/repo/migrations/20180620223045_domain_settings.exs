defmodule CommentBox.Repo.Migrations.DomainSettings do
  use Ecto.Migration

  def change do
    alter table(:domains) do
      add :allowAnonymousComments, :boolean, default: false
      add :allowAnonymousView, :boolean, default: true
      add :allowComments, :boolean, default: true
    end

    alter table(:pages) do
      modify :allowAnonymousComments, :boolean
      modify :allowAnonymousView, :boolean

      add :allowComments, :boolean
      add :domain_id, references(:domains, on_delete: :nothing)
    end

    create index(:pages, [:domain_id])
  end
end

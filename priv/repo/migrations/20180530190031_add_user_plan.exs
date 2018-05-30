defmodule CommentBox.Repo.Migrations.AddUserPlan do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :plan, :string, size: 100
    end
  end
end

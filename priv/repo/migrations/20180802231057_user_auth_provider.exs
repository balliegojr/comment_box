defmodule CommentBox.Repo.Migrations.UserAuthProvider do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :auth_provider, :string, size: 100, default: "identity"
      add :avatar, :string, size: 400
    end
  end
end

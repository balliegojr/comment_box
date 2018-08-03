# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     CommentBox.Repo.insert!(%CommentBox.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias CommentBox.Repo
alias CommentBox.Accounts.{Role, User, UserRole}
alias CommentBox.Comments.Domain


admin_role = Repo.get_by!(Role, name: "Admin")
owner_role = Repo.get_by!(Role, name: "Owner")

user = %User{}
    |> User.changeset(%{username: "admin", email: "admin", password: "admin", password_confirmation: "admin", auth_provider: "identity"})
    |> Ecto.Changeset.put_assoc(:user_roles, [%UserRole{ role: admin_role}, %UserRole{ role: owner_role}])

    |> Repo.insert!()

domain = %Domain{}
    |> Domain.changeset(%{user_id: user.id, address: "localhost:4000"})
    |> Repo.insert!()
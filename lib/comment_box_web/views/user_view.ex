defmodule CommentBoxWeb.UserView do
  use CommentBoxWeb, :view
  alias CommentBoxWeb.UserView

  def render("index.json", %{user: user}) do
    render_many(user, UserView, "user.json")
  end

  def render("show.json", %{user: user}) do
    render_one(user, UserView, "user.json")
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,

      roles: render_many(user.user_roles, UserView, "user_role.json")
    }
  end

  def render("user_role.json", %{user: user_role}) do
    %{
      name: user_role.role.name
    }
  end
end

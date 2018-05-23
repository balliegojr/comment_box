defmodule CommentBox.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias CommentBox.Repo

  alias CommentBox.Accounts.{User, UserRole, Role}

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users() do
    Repo.all from user in User,
      left_join: user_roles in assoc(user, :user_roles),
      left_join: role in assoc(user_roles, :role),
      preload: [user_roles: {user_roles, role: role}]
  end

  @doc """
  Returns the list of users of the given roles.

  ## Examples

      iex> list_users(roles)
      [%User{}, ...]

  """
  def list_users(roles) do
    Repo.all from user in User,
      left_join: user_roles in assoc(user, :user_roles),
      left_join: role in assoc(user_roles, :role),
      
      left_join: user_roles2 in assoc(user, :user_roles),
      left_join: role2 in assoc(user_roles2, :role),
      
      where: role.name in ^roles,
      preload: [user_roles: {user_roles2, role: role2}]
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id) do
    Repo.one from user in User,
      where: user.id == ^id,
      left_join: user_roles in assoc(user, :user_roles),
      left_join: role in assoc(user_roles, :role),
      preload: [user_roles: {user_roles, role: role}]
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Updates a user roles and account status

  ## Examples

      iex> admin_update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> admin_update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def admin_update_user(%User{} = user, %{ "roles" => roles} = attrs) do
    add_roles = roles |> Enum.filter(fn role -> role["add"] === true end) |> Enum.map(fn role -> role["name"] end)
    
    add_roles = 
    if Enum.count(add_roles) > 0 do
      Repo.all(from r in Role, where: r.name in ^add_roles, select: r.id) 
      |> Enum.map(fn role_id -> UserRole.changeset(%UserRole{}, %{ user_id: user.id, role_id: role_id }) end)
    else
      add_roles
    end
    
    user
    |> User.admin_update_changeset(attrs)
    |> Ecto.Changeset.put_assoc(:user_roles, 
      Enum.filter(user.user_roles, fn ur -> !Enum.any?(roles, fn role -> role["name"] === ur.role.name && role["remove"] === true end) end)
      ++ add_roles)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end


  def find_by_username(username) do
    Repo.one from user in User,
      where: user.username == ^username,
      left_join: user_roles in assoc(user, :user_roles),
      left_join: role in assoc(user_roles, :role),
      preload: [user_roles: {user_roles, role: role}]

  end

  def authenticate(user, password) do
    
    # Does password match the one stored in the database?
    case Comeonin.Bcrypt.checkpw(password, user.password_hash) do
      true ->
        roles = case Enum.any?(user.user_roles, fn ur -> ur.role.name === "Admin" end) do
          true -> %{ is_admin: true }
          _ -> %{}
        end

        # Yes, create and return the token
        CommentBox.Auth.Guardian.encode_and_sign(user, roles)
      _ ->
        # No, return an error
        {:error, :unauthorized}
    end
  end
end

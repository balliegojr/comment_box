defmodule CommentBox.Comments do
  @moduledoc """
  The Comments context.
  """

  import Ecto.Query, warn: false
  alias CommentBox.Repo

  alias CommentBox.Comments.Page
  alias CommentBox.Accounts.User

  @doc """
  Returns the list of pages.

  ## Examples

      iex> list_pages()
      [%Page{}, ...]

  """
  def list_pages do
    Repo.all(Page)
  end

  @doc """
  Gets a single page.

  Raises `Ecto.NoResultsError` if the Page does not exist.

  ## Examples

      iex> get_page!(123)
      %Page{}

      iex> get_page!(456)
      ** (Ecto.NoResultsError)

  """
  def get_page!(id), do: Repo.get!(Page, id)

  def get_page_by_url_or_create(url) do
    hash_url = Page.hash_url(url)
    case Repo.get_by(Page, hashed_url: hash_url) do
        nil -> 
            case create_page(%{ :hashed_url => hash_url, :url => url, :status => 0, :reputation => 0, :allowAnonymousComments => false, :allowAnonymousView => true}) do
                {:ok, page} -> page
            end
        page -> page
    end
  end

  @doc """
  Creates a page.

  ## Examples

      iex> create_page(%{field: value})
      {:ok, %Page{}}

      iex> create_page(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_page(attrs \\ %{}) do
    %Page{}
    |> Page.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a page.

  ## Examples

      iex> update_page(page, %{field: new_value})
      {:ok, %Page{}}

      iex> update_page(page, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_page(%Page{} = page, attrs) do
    page
    |> Page.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Page.

  ## Examples

      iex> delete_page(page)
      {:ok, %Page{}}

      iex> delete_page(page)
      {:error, %Ecto.Changeset{}}

  """
  def delete_page(%Page{} = page) do
    Repo.delete(page)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking page changes.

  ## Examples

      iex> change_page(page)
      %Ecto.Changeset{source: %Page{}}

  """
  def change_page(%Page{} = page) do
    Page.changeset(page, %{})
  end

  alias CommentBox.Comments.Comment

  @doc """
  Returns the list of comment.

  ## Examples

      iex> list_comment()
      [%Comment{}, ...]

  """
  def list_comment do
    Repo.all(Comment) |> Repo.preload(:user)
  end

  def list_comment_by_page(page_id) do
    query = from c in Comment, 
        preload: [:user],
        where: c.page_id == ^page_id,
        order_by: [desc: c.inserted_at],
        select: c

    Repo.all(query)
  end

  @doc """
  Gets a single comment.

  Raises `Ecto.NoResultsError` if the Comment does not exist.

  ## Examples

      iex> get_comment!(123)
      %Comment{}

      iex> get_comment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_comment!(id) do
     Repo.get!(Comment, id) |> Repo.preload(:user)

  end

  @doc """
  Creates a comment.

  ## Examples

      iex> create_comment(%{field: value})
      {:ok, %Comment{}}

      iex> create_comment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_comment(attrs \\ %{}) do
    with {:ok, comment} <- %Comment{} |> Comment.changeset(attrs) |> Repo.insert() do
        comment = Repo.preload(comment, :user)
        CommentBox.Nlp.sentment_analysis(comment)
        {:ok, comment}
    end
  end



  @doc """
  Updates a comment.

  ## Examples

      iex> update_comment(comment, %{field: new_value})
      {:ok, %Comment{}}

      iex> update_comment(comment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_comment(%Comment{} = comment, attrs) do
    comment
    |> Comment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Comment.

  ## Examples

      iex> delete_comment(comment)
      {:ok, %Comment{}}

      iex> delete_comment(comment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_comment(%Comment{} = comment) do
    Repo.delete(comment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking comment changes.

  ## Examples

      iex> change_comment(comment)
      %Ecto.Changeset{source: %Comment{}}

  """
  def change_comment(%Comment{} = comment) do
    Comment.changeset(comment, %{})
  end

  alias CommentBox.Comments.Domain

  @doc """
  Returns the list of domains.

  ## Examples

      iex> list_domains(1)
      [%Domain{}, ...]

  """
  def list_domains(user_id) do
    domain_query = from d in Domain, where: d.user_id == ^user_id
    
    Repo.all(domain_query)
  end

  @doc """
  Gets a single domain.

  Raises `Ecto.NoResultsError` if the Domain does not exist.

  ## Examples

      iex> get_domain!(123)
      %Domain{}

      iex> get_domain!(456)
      ** (Ecto.NoResultsError)

  """
  def get_domain!(id), do: Repo.get!(Domain, id)

  def get_domain_by_address(address) do
      Repo.get_by(Domain, address: address)
  end

  def get_domain_by_address_and_key(address, app_key) do
      Repo.get_by(Domain, address: address, app_key: app_key)
  end


  @doc """
  Creates a domain.

  ## Examples

      iex> create_domain(%{field: value})
      {:ok, %Domain{}}

      iex> create_domain(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_domain(attrs \\ %{}) do
    %Domain{}
    |> Domain.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a domain.

  ## Examples

      iex> update_domain(domain, %{field: new_value})
      {:ok, %Domain{}}

      iex> update_domain(domain, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_domain(%Domain{} = domain, attrs) do
    domain
    |> Domain.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Domain.

  ## Examples

      iex> delete_domain(domain)
      {:ok, %Domain{}}

      iex> delete_domain(domain)
      {:error, %Ecto.Changeset{}}

  """
  def delete_domain(%Domain{} = domain) do
    Repo.delete(domain)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking domain changes.

  ## Examples

      iex> change_domain(domain)
      %Ecto.Changeset{source: %Domain{}}

  """
  def change_domain(%Domain{} = domain) do
    Domain.changeset(domain, %{})
  end
end

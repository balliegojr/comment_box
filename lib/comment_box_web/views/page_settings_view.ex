defmodule CommentBoxWeb.PageSettingsView do
  use CommentBoxWeb, :view

  alias CommentBoxWeb.PageSettingsView

  def render("index.json", %{page: page}) do
    render_many(page, PageSettingsView, "page_settings.json")
  end

  def render("show.json", %{page: page}) do
    render_one(page, PageSettingsView, "page_settings.json")
  end

  def render("page_settings.json", %{page_settings: page_settings}) do
    %{
        id: page_settings.id,
        allowAnonymousComments: page_settings.allowAnonymousComments,
        allowAnonymousView: page_settings.allowAnonymousView,
        allowComments: page_settings.allowComments,
        
        domain: get_domain(page_settings.domain),
        hashed_url: page_settings.hashed_url,
        url: page_settings.url,
  
        reputation: page_settings.reputation,
        status: page_settings.status,
        inserted_at: page_settings.inserted_at
      }
  end

  defp get_domain(%CommentBox.Comments.Domain{} =  domain) do
    %{
      id: domain.id,
      address: domain.address
    }
  end
  defp get_domain(_), do: nil
end
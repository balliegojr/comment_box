defmodule CommentBoxWeb.PageSettingsView do
  use CommentBoxWeb, :view

  def render("page_settings.json", %{page_settings: page_settings}) do
    %{
        id: page_settings.id,
        allowAnonymousComments: page_settings.allowAnonymousComments,
        allowAnonymousView: page_settings.allowAnonymousView,
        
        hashed_url: page_settings.hashed_url,
        url: page_settings.url,
  
        reputation: page_settings.reputation,
        status: page_settings.status,
        inserted_at: page_settings.inserted_at
      }
  end
end
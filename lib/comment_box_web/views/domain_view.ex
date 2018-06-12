defmodule CommentBoxWeb.DomainView do
  use CommentBoxWeb, :view
  alias CommentBoxWeb.DomainView

  def render("index.json", %{domain: domain}) do
    render_many(domain, DomainView, "domain.json")
  end

  def render("show.json", %{domain: domain}) do
    render_one(domain, DomainView, "domain.json")
  end

  def render("domain.json", %{domain: domain}) do
    %{
      id: domain.id,
      address: domain.address,
      app_key: domain.app_key
    }
  end

 
  
end

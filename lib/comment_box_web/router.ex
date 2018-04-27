defmodule CommentBoxWeb.Router do
  use CommentBoxWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  
  
  # Other scopes may use custom stacks.
  scope "/api", CommentBoxWeb do
    pipe_through :api
    
    resources "/comment", CommentController, except: [:new, :edit]
    get "/page", PageSettingsController, :get_page_settings
  end

  scope "/", CommentBoxWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/app/*routepath", PageController, :app
  end
end

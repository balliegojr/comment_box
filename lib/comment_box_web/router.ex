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

  # defp put_user_token(conn, _) do
  #   if current_user = Guardian.Plug.current_resource(conn) do
  #     token = Phoenix.Token.sign(conn, "user socket", current_user.id)
  #     assign(conn, :user_token, token)
  #   else
  #     conn
  #   end
  # end


  pipeline :api_auth do
    # plug :api
    plug :accepts, ["json"]
    

    plug CommentBox.Auth.Pipeline
    plug Guardian.Plug.EnsureAuthenticated
    # plug :put_user_token
  end

  
  
  # Other scopes may use custom stacks.
  scope "/api", CommentBoxWeb do
    pipe_through :api
    
    get "/page", PageSettingsController, :get_page_settings
    get "/page/:page_id/comment", CommentController, :get_page_comments

    post "/auth/signin", UserController, :sign_in
    post "/user", UserController, :sign_up
  end
  
  scope "/api", CommentBoxWeb do
    pipe_through :api_auth
    
    get "/auth/me", UserController, :me
    resources "/comment", CommentController, except: [:new, :edit]
  end

  scope "/", CommentBoxWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/app/*routepath", PageController, :app
  end
end

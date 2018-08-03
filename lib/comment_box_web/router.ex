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

  pipeline :api_auth do
    # plug :api
    plug :accepts, ["json"]
    
    plug CommentBox.Auth.Pipeline
    plug Guardian.Plug.EnsureAuthenticated
    # plug :put_user_token
  end

  pipeline :api_auth_admin do
    plug :accepts, ["json"]
    plug CommentBox.Auth.PipelineAdmin
  end
  
  scope "/auth", CommentBoxWeb do
    pipe_through :browser

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end
  scope "/auth", CommentBoxWeb do
    pipe_through :api
    
    post "/identity/callback", AuthController, :identity_callback
  end
  
  # Other scopes may use custom stacks.
  scope "/api", CommentBoxWeb do
    pipe_through :api
    
    get "/page", PageSettingsController, :get_page_settings
    get "/page/:page_id/comment", CommentController, :get_page_comments
    
    post "/user", AuthController, :sign_up
  end
  
  scope "/api", CommentBoxWeb do
    pipe_through :api_auth
    
    get "/auth/me", UserController, :me
    resources "/comment", CommentController, except: [:new, :edit]
    
    put "/user/plan", UserController, :set_plan
    resources "/user", UserController, except: [:new, :edit]
    resources "/domain", DomainController, only: [:create, :index, :delete, :update]
    resources "/pages", PageSettingsController, only: [:index, :update]
  end
  
  scope "/api", CommentBoxWeb do
    pipe_through :api_auth_admin
    
    get "/user/byType/:type", UserController, :user_by_type
    put "/user/:id/admin", UserController, :admin_update
  end

  scope "/", CommentBoxWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/app/*routepath", PageController, :app

    get "/admin/*routepath", PageController, :admin
    get "/examples/awesome", PageController, :awesome_example
  end
end

defmodule CommentBox.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :comment_box,
    error_handler: CommentBox.Auth.ErrorHandler, 
    module: CommentBox.Auth.Guardian
  
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource, allow_blank: true
end

defmodule CommentBox.Auth.PipelineAdmin do
  use Guardian.Plug.Pipeline,
    otp_app: :comment_box,
    error_handler: CommentBox.Auth.ErrorHandler, 
    module: CommentBox.Auth.Guardian
  
    plug Guardian.Plug.VerifyHeader, realm: "Bearer", claims: %{ is_admin: true }
    plug Guardian.Plug.LoadResource
    plug Guardian.Plug.EnsureAuthenticated
end
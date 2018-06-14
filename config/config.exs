# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :comment_box,
  ecto_repos: [CommentBox.Repo]

# Configures the endpoint
config :comment_box, CommentBoxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "8IjTmsefL4l39hlUm2XWdeftRfOxqveWrOKjXVH0cOYpg/xKWmBKYRZkVuvvM/hu",
  render_errors: [view: CommentBoxWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CommentBox.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :comment_box, CommentBox.Auth.Guardian,
  issuer: "comment_box",
  secret_key: "dxGFAvd4m8cn58nGfNweQiEifcZIjl3Ce89pwOgCY8UzfIGviEU6abdP2HufVsPZ"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

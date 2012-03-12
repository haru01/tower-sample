Tower.Route.draw ->
  @resources "users"
  @resources "posts"
  # @match "(/*path)", to: "application#index"
  @match "/", to: "application#welcome"
defmodule TasktrackWeb.TokenController do
  use TasktrackWeb, :controller
  alias Tasktrack.Users.User

  action_fallback TasktrackWeb.FallbackController

  def create(conn, %{"name" => name, "pass" => pass}) do
    with {:ok, %User{} = user} <- Tasktrack.Users.get_and_auth_user(name, pass) do
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end

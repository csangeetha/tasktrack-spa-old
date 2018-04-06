# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktrack.Repo.insert!(%Tasktrack.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktrack.Repo
  alias Tasktrack.Users.User
  alias Tasktrack.Tasks.Task

  def run do
    p = Comeonin.Argon2.hashpwsalt("password1")
    Repo.delete_all(User)
    a = Repo.insert!(%User{email: "alice@example.com", name: "Alice", password_hash: p})
    b = Repo.insert!(%User{email: "bob@example.com", name: "Bob", password_hash: p})

    Repo.delete_all(Task)
    Repo.insert!(%Task{title: "Task1", description: "task 1 desc", status: false, assigned_by_id: a.id, assigned_to_id: b.id})
  end

end

Seeds.run

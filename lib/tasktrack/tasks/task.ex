defmodule Tasktrack.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :status, :boolean, default: false
    field :time_taken, :time
    field :title, :string
    belongs_to :assigned_to, Tasktrack.Users.User
    belongs_to :assigned_by, Tasktrack.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :time_taken, :status, :assigned_by_id, :assigned_to_id])
    |> validate_required([:title, :description, :time_taken, :status, :assigned_by_id, :assigned_to_id])
  end
end

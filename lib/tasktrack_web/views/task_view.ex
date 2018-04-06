defmodule TasktrackWeb.TaskView do
  use TasktrackWeb, :view
  alias TasktrackWeb.TaskView
  alias TasktrackWeb.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      description: task.description,
      time_taken: task.time_taken,
      status: task.status,
      assigned_to: render_one(task.assigned_to, UserView, "user.json"),
      assigned_by: render_one(task.assigned_by, UserView, "user.json")
    }
  end
end

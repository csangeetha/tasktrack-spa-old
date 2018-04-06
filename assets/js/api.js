import store from './store.js';

class SeverAPI {
  request_tasks(){
    $.ajax("api/v1/tasks" , {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success :(resp)=> {

        store.dispatch({
          type: 'ALL_TASKS',
          tasks: resp.data,
        });
      }
    });
  }

  request_users(){
    $.ajax("api/v1/users" , {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success :(resp)=> {
        store.dispatch({
          type: 'ALL_USERS',
          users: resp.data,
        });
      }
    });
  }

  submit_signup(data){
    let newData = {
      email: data.signup_email,
      name: data.signup_name,
      password: data.signup_pass
    }
    $.ajax("api/v1/users" , {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: newData}),
      success :(resp)=> {
        store.dispatch({
          type: 'CREATE_USER',
          user: resp.data,
        });
      alert('successfully registered, log in now')
      }
    });
  }

  create_task(data) {
    let newTime = data.time_taken
    if(data.time_taken != "")
    {
      newTime = data.time_taken + ":00.000000"
    }
    let dataNew = {
      assigned_to_id: data.assigned_to_id,
      assigned_by_id: data.assigned_by_id,
      title: data.title,
      description: data.description,
      time_taken: newTime,
      status: data.status
    }
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: dataNew }),
      success: (resp) => {
        store.dispatch({
          type: 'CREATE_TASK',
          task: resp.data,
        });
      },
    });
  }

  update_task(data , id) {
    let newTime = data.time_taken
    if(data.time_taken != "")
    {
      newTime = data.time_taken + ":00.000000"
    }
    let dataNew = {
      assigned_to_id: data.assigned_to_id,
      assigned_by_id: data.assigned_by_id,
      title: data.title,
      description: data.description,
      time_taken: newTime,
      status: data.status
    }
    $.ajax("/api/v1/tasks/"+id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: dataNew }),
      success: (resp) => {
        request_tasks();
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }


  update_task(data , id) {

    let newTime = data.time_taken
    if(data.time_taken != "")
    {
      newTime = data.time_taken + ":00.000000"
    }
    let dataNew = {
      assigned_to_id: data.assigned_to_id,
      assigned_by_id: data.assigned_by_id,
      title: data.title,
      description: data.description,
      time_taken: newTime,
      status: data.status
    }
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ token: data.token, task: dataNew }),
      success: (resp) => {
        store.dispatch({
          type: 'CREATE_TASK',
          task: resp.data,
        });
      },
    });
  }
}

export default new SeverAPI();

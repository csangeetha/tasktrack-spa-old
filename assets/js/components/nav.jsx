import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router'
import { Provider, connect } from 'react-redux';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import api from '../api';
import TaskFeed from './taskFeed';
import UserFeed from './userFeed';
import CreateTask from './create-task';
import UpdateTask from './update-task';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
          value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
          value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

let Signup = connect(({signup}) => {return {signup};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_SIGNUP_FORM',
      data: data,
    });
  }

  function create_signup(ev) {
    api.submit_signup(props.signup).
    console.log(props.signup);

  }

  return <div className="card" style={{width: '60%', marginLeft: '20%'}}>
    <div className="card-header">
      <h4> Sign Up</h4>
    </div>
    <div className="card-body">
      <Form >
        <FormGroup>
          <Input type="email" name="signup_email" placeholder="email"
            value={props.signup.signup_email} onChange={update} />
        </FormGroup>
        <FormGroup>
          <Input type="text" name="signup_name" placeholder="name"
            value={props.signup.signup_name} onChange={update} />
        </FormGroup>
        <FormGroup>
          <Input type="password" name="signup_pass" placeholder="password"
            value={props.signup.signup_pass} onChange={update} />
        </FormGroup>
        <Button onClick={create_signup}>Sign up</Button>
      </Form>
    </div>
  </div>;
});


let Session = connect(({token}) => {return {token};})((props) => {
  console.log(props.token);
  return <div className="navbar-text">
    Welcome, { props.token.user_name }
    <ul className="navbar-nav mr-auto">
      <NavItem>
        <NavLink to=" " exact={true} className="nav-link">Logout</NavLink>
      </NavItem>
    </ul>
  </div>;
});

function Nav(props) {
  let session_info;
  let create_task;
  let show_links;
  let show_signup;


  if (props.token) {
    show_links =   <ul className="navbar-nav mr-auto">
      <NavItem>
        <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/users" className="nav-link">All Users</NavLink>
      </NavItem>
    </ul>
    session_info =
    <Session token={props.token} />
    create_task =  <div>
      <Route path="/" exact={true} render={() =>
          <div className="col">
            <CreateTask  users={props.users} />
            <TaskFeed tasks={props.tasks} />
          </div>
        }/>
        <Route path="/users" exact={true} render={() =>
            <div className="col">
              <UserFeed users={props.users} />
            </div>
          }/>
          <Route path="/users/:user_id" render={({match}) =>
            <TaskFeed tasks={_.filter(props.tasks, (taskVar) =>{
                if(taskVar.assigned_to){
                  return match.params.user_id == taskVar.assigned_to.id
                }
                else {
                  return false;
                }})} />
              } />
              <Route path="/update/:task_id" render={({match}) =>
                <UpdateTask users={props.users} taskId={match.params.task_id} task={_.filter(props.tasks, (taskVar) =>{
                    if(taskVar.id){
                      return match.params.task_id == taskVar.id
                    }
                    else {
                      return false;
                    }})} />
                  }/>
                </div>;

              }
              else {
                session_info =<div style={{marginLeft: '55%'}}>
                  <ul className="navbar-nav mr-auto">
                    <NavItem>
                      <NavLink to="/signup" exact={true} activeClassName="active" className="nav-link">Signup</NavLink>
                    </NavItem>
                    <NavItem>
                      <LoginForm />
                    </NavItem>
                  </ul>
                </div>
                create_task = <div>
                  <h1 style={{padding : '5% 38% 0%'}}> Welcome to Tasktracker</h1>
                  <h3 style={{padding : '0% 40% 0%'}}> Login or Signup to begin</h3>
                </div>
                show_signup =   <Route path="/signup" exact={true} render={() =>
                    <Signup />
                  }/>
                }

                return (
                  <Router>
                    <div>
                      <nav className="navbar navbar-light bg-old navbar-expand">
                        <span className="navbar-brand brand">
                          Tasktracker
                        </span>
                        { show_links }


                        { session_info }
                      </nav>
                      { create_task }
                      { show_signup }
                    </div></Router>
                  );
                }

                function state2props(state) {
                  return {
                    token: state.token,
                    users: state.users,
                    tasks: state.tasks,
                    redirect: false
                  };
                }

                export default connect(state2props)(Nav);

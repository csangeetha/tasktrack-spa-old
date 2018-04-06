import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input} from 'reactstrap';
import api from '../api';

function UpdateTask(params){
  function submit(ev) {
    api.update_task(params.task, params.taskId);
    clear(ev)
  }
  function clear(ev) {
    params.dispatch({
      type: 'CLEAR_FORM',
    });
  }

  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    params.dispatch(action);
  }
   let users = _.map(params.users, (uu) =>
   <option key={uu.id} value={uu.id}>{uu.name}</option>);
    return <div className="card" style={{margin : '4ex'}}>
      <div className="card-header bg-success text-white text-center">
        <h4>Update Task</h4></div>
        <div className="card-body bg-light">
          <FormGroup>
            <Label for="assigned_to_id">Assigned To</Label>
            <Input type="select" name="assigned_to_id"
              value={params.task.assigned_to_id} onChange={update}>
              <option></option>
              {users}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="assigned_by_id">Assigned By</Label>
            <Input type="select" name="assigned_by_id"
              value={params.task.assigned_by_id} onChange={update}>
              <option></option>
              {users}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" name="title" value={params.task.title}
              onChange={update}>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Description</Label>
            <Input type="textarea" name="description"
              value={params.task.description}onChange={update}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Time taken</Label>
            <Input type="time" name="time_taken" step="900"
              value={params.task.time_taken} onChange={update}></Input>
          </FormGroup>
          <FormGroup>
            <Label for="title">Task Complete ?</Label>
            <Input style={{marginLeft : '4ex', width : '3ex', height : '3ex'}}
              type="checkbox" name="status" value={params.task.status}
              onChange={update}></Input>
          </FormGroup>
          <Button onClick={submit} className="bg-primary">Update Task</Button>
          <Button onClick={clear} style={{marginLeft : '2ex'}}>Clear</Button>
        </div>
      </div>;
    }

    function state2params(state){
      return {
        task : state.form
      }
    }
    export default connect(state2params)(UpdateTask);

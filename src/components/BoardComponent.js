import * as React from "react";
import TicketComponent from "./TicketComponent";

function BoardComponent(props) {
  const { board, deleteBoard, updateBoard } = props;
  const { toDos, inProgress, completed } = board;

  /** 
 * ***update board***
 * @param id: string
 * @param name: string
 * @param toDos: array
 * @param inProgress: array
 * @param completed: array
 *  */ 
  const onUpdateBoard = (board) => {
    updateBoard({...board})
  }

  // render TODos
  const renderToDos = () => {
    return toDos && toDos.map(ticket => <TicketComponent transferToBoard={onUpdateBoard} board={board} ticket={ticket} />)
  };
  // render InProgress
  const renderInProgress = () => {
    return (
      inProgress &&
      inProgress.map(ticket => <TicketComponent transferToBoard={onUpdateBoard} board={board} ticket={ticket} />)
    );
  };
  // render Completed
  const renderCompleted = () => {
    return (
      completed && completed.map(ticket => <TicketComponent transferToBoard={onUpdateBoard} board={board} ticket={ticket} />)
    );
  };

  return (
    <React.Fragment>
      <div className="col-sm-8 board">
        <div className="right">
          <button type="button" className="btn btn-danger" onClick={() => deleteBoard(board.key)}>
            Delete
          </button>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add ticket
          </button>
        </div>
        <h2>{board.name}</h2>

        <div className="row">
          <div className="col color1">
            <h4>To Do</h4>
            {renderToDos()}
          </div>
          <div className="col color2">
            <h4>In Progress</h4>
            {renderInProgress()}
          </div>
          <div className="col color3">
            <h4>Completed</h4>
            {renderCompleted()}
          </div>
        </div>

        <br />
      </div>
    </React.Fragment>
  );
}

export default BoardComponent;

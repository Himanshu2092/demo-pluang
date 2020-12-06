import * as React from "react";
import { status, generateNextId } from "../utils";
 
function TicketComponent(props) {
  const { ticket, board, transferToBoard } = props;
  /** 
 * ***ticket***
 * @param id: string
 * @param description: string
 * @param state: string
 *  */
  const { description, state, id } = ticket || {};
  const _cloneBoard = () => board;
  const _cloneTicket = () => ticket;
  const keys = {
    1: 'toDos',
    2: 'inProgress',
    3: 'completed'
  }
  // delete ticket
  const onDelete = () => {
    const _clonedBoard = _cloneBoard();
    if (_clonedBoard) {
     let index = _clonedBoard[keys[state]].findIndex(item => item.id === id);
      if (index !== -1) _clonedBoard[keys[state]].splice(index, 1);
      transferToBoard(_clonedBoard)
    }
  };

  // forward ticket
  const onForward = () => {
    const _clonedBoard = _cloneBoard();
    let index = _clonedBoard[keys[state]].findIndex(item => item.id === id);
    if (index !== -1) {
    let updatedTicket = _cloneTicket()
    updatedTicket.state++
    updatedTicket.id = generateNextId(_clonedBoard[keys[updatedTicket.state]])
     _clonedBoard[keys[updatedTicket.state]].push(updatedTicket)
     _clonedBoard[keys[state]].splice(index, 1);
    }
    transferToBoard(_clonedBoard)
  }

  // backward ticket
  const onBackward = () => {
    const _clonedBoard = _cloneBoard();
    let index = _clonedBoard[keys[state]].findIndex(item => item.id === id);
    if (index !== -1) {
      let updatedTicket = _cloneTicket()
      updatedTicket.state--
      updatedTicket.id = generateNextId(_clonedBoard[keys[updatedTicket.state]])
      _clonedBoard[keys[updatedTicket.state]].push(updatedTicket)
      _clonedBoard[keys[state]].splice(index, 1);
    } 
    transferToBoard(_clonedBoard)
  }

  return (
    <React.Fragment>
      <div className="col-sm-12 ticket">
        <div className="left">
          <button className="btn btn-light" disabled={state === status.TODO} onClick={onBackward}>back</button>
        </div>
        <span>{description}</span>
        <div className="right">
          <button className="btn btn-light" disabled={state === status.COMPLETED} onClick={onForward}>go</button>
          <br />
          <button className="btn btn-light" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TicketComponent;

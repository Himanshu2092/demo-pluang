import * as React from "react";
import * as classnames from "classnames";

import * as boardFactory from "../boardFactory";

function BoardListComponent(props) {
  const { selectedId, selectBoard, boards, createBoard } = props;

  // create board
  const onCreateBoard = () => {
    const board = boardFactory.generateBoard(boards);
    createBoard({ ...boards, ...board });
    if(!selectedId)
    selectBoard(boardFactory.getNextBoard(boards))
  };

/** 
 * ***select board***
 * @param id: string
 * @param name: string
 * @param toDos: array
 * @param inProgress: array
 * @param completed: array
 *  */ 
  const onSelectBoard = board => {
    selectBoard(board);
  };

  // renderBoard
  const renderBoards = () => {
    let list = [];
    for (let key in boards) {
      list.push(
        <li
          key={boards[key].id}
          className="nav-item"
          onClick={() => onSelectBoard(boards[key])}
        >
          <span
            className={classnames({
              "nav-link": true,
              active: selectedId === boards[key].id
            })}
          >
            {boards[key].name}
          </span>
        </li>
      );
    }
    return list;
  };

  return (
    <React.Fragment>
      <div className="col-sm-4">
        <h2>Boards</h2>

        <div className="sideBar">
          <ul className="nav nav-pills flex-column">
            {renderBoards()}
            <li className="nav-item">
              <button
                type="button"
                onClick={onCreateBoard}
                className="btn btn-success"
              >
                Add
              </button>
            </li>
          </ul>
        </div>

        <hr className="d-sm-none" />
      </div>
    </React.Fragment>
  );
}

export default BoardListComponent;

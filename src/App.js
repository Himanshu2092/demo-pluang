import * as React from "react";
import "./App.css";
import ModalComponent from "./components/ModalComponent";
import BoardListComponent from "./components/BoardListComponent";
import BoardComponent from "./components/BoardComponent";
import * as boardFactory from "./boardFactory";
import { getCount } from "./utils";

function App() {
  const [boards, setBoards] = React.useState({});
  const [selectedBoard, setSelectedBoard] = React.useState({});
  const _cloneBoards = () => boards;
  React.useEffect(() => {
    if (!selectedBoard.id) setSelectedBoard(boardFactory.getNextBoard(boards));
    // eslint-disable-next-line
  }, [boards]);

  React.useEffect(() => {
    let boards = localStorage.getItem("boards") || {};
    let selectedBoard = localStorage.getItem("selectedBoard") || {};
    boards = JSON.parse(boards);
    selectedBoard = JSON.parse(selectedBoard);
    setBoards(boards);
    setSelectedBoard(selectedBoard);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("selectedBoard", JSON.stringify(selectedBoard));
  }, [boards, selectedBoard]);

  // delete board
  const onDeleteBoard = () => {
    let clonedBoards = _cloneBoards();
    delete clonedBoards[selectedBoard.id];
    const nextBoard = boardFactory.getNextBoard(clonedBoards);
    setBoards(clonedBoards);
    setSelectedBoard({ ...nextBoard });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <BoardListComponent
            selectedId={selectedBoard.id}
            boards={boards}
            createBoard={setBoards}
            selectBoard={setSelectedBoard}
          />
          {getCount(boards) > 0 ? (
            <BoardComponent
              board={selectedBoard}
              deleteBoard={onDeleteBoard}
              updateBoard={setSelectedBoard}
            />
          ) : (
            <h1>Please Create Board</h1>
          )}
        </div>
      </div>
      <ModalComponent board={selectedBoard} createTicket={setSelectedBoard} />
    </React.Fragment>
  );
}

export default App;

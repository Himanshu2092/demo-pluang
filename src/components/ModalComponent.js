import * as React from "react";
import { generateNextId, status } from "../utils";

function ModalComponent(props) {
  const [description, setDescription] = React.useState("");
  const { board, createTicket } = props;
  const _cloneBoard = () => board;

  const onCreateTicket = () => {
    const _clonedBoard = _cloneBoard();
    if (_clonedBoard) {
      _clonedBoard.toDos.push({
        id: generateNextId(_clonedBoard.toDos),
        state: status.TODO,
        description
      });
      createTicket({ ..._clonedBoard });
    }
    resetForm()
  };

  const resetForm = () => {
    setDescription("");
  }

  return (
    <React.Fragment>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add description</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={resetForm}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label for="usr">Description</label>
                <textarea
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  id="usr"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                disabled={!description}
                onClick={onCreateTicket}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ModalComponent;

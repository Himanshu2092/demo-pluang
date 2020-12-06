import {generateNextId} from './utils'

const generateBoard = boards => {
  let nextID = generateNextId(boards)
  return {
    [nextID]: {
      id: nextID,
      name: `Board ${nextID}`,
      toDos: [],
      inProgress: [],
      completed: []
    }
  };
};

const getNextBoard = (boards = {}) => {
  try {
    let key = Object.keys(boards)[0];
    return boards[parseInt(key)] || {};
  } catch (e) {
    return {};
  }
};

export { generateBoard, getNextBoard };

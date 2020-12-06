const generateNextId = (data) => {
  try {
    if (data instanceof Object) {
      let keys = Object.keys(data)
      if(keys.length === 0) return 1
      let count = () => data[parseInt(keys[keys.length-1])].id
      count = count() + 1
      return count
    } 
    else if (data instanceof Array) {
      if(data.length === 0) return 1 
      let count = () => data[parseInt(data.length-1)].id
      count = count() + 1
      return count
    }
    else throw new Error("type is neither array nor object");
  } catch (e) {
    return undefined;
  }
};

const getCount = data => {
  try {
    if (data instanceof Object) return Object.keys(data).length;
    else if (data instanceof Array) return data.length;
    else throw new Error("type is neither array nor object");
  } catch (e) {
    return undefined;
  }
};

const status = {
  TODO: 1,
  INPROGRESS: 2,
  COMPLETED: 3,
}
export { generateNextId, getCount, status };

module.exports = (res, status = 200, data = [], condition = [], error = {}, stack = {}) => {
  let objData = {
    status: status,
    data: data,
    condition: condition,
    error: error,
    stack: stack
  }

  if (process.env.NODE_ENV === 'production') delete objData.stack;
  if (status) {
    delete objData.error;
    delete objData.stack;
  }
  if (!data) delete objData.data;
  if (!condition) delete objData.condition
  res.send(objData);
}
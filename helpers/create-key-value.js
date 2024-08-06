module.exports = ( data) => {
  return data.map((value) => {
    return {
      key: value[0],
      value: value[1],
      created_at : Math.floor(new Date().getTime() / 1000),
      updated_at : Math.floor(new Date().getTime() / 1000)
    }
  })
}
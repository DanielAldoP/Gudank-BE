module.exports = {
  encodeBase64ToJson: async (base64String) => {
    const jsonString = Buffer.from(base64String, 'base64').toString()
    return JSON.parse(jsonString)
  }
}

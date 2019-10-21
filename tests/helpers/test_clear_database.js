const Question = require('../../models').Question;

module.exports = async function cleanup() {
  await Question.destroy({ where: {} })
}

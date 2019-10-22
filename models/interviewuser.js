'use strict';
module.exports = (sequelize, DataTypes) => {
  const InterviewUser = sequelize.define('InterviewUser', {
    interviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Interviews',
        key: 'id'
      }
    }, 
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {});
  InterviewUser.associate = function(models) {
  };
  return InterviewUser;
};
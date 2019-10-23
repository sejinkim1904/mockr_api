'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserNote = sequelize.define('UserNote', {
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Notes',
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
  UserNote.associate = function(models) {
    // associations can be defined here
  };
  return UserNote;
};

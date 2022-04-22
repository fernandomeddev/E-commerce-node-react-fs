module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("user", {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return User

}
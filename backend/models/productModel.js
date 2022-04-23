module.exports =  (sequelize, DataTypes) => {

    const Product = sequelize.define("products", {
      products_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_img: {
        type: DataTypes.STRING,
        allowNull: true
      },
      product_description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      product_price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      product_stock: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
  
    return Product
  
  }
// backend/src/models/User.js

const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.VIRTUAL, // Campo virtual, não será salvo no banco
        senha_hash: DataTypes.STRING, // Este campo sim será salvo
      },
      {
        sequelize,
        tableName: "users",
      }
    );

    // Hook que é executado antes de um novo usuário ser salvo
    this.addHook("beforeSave", async (user) => {
      if (user.senha) {
        user.senha_hash = await bcrypt.hash(user.senha, 8);
      }
    });

    return this;
  }

  static associate(models) {
    // Um Usuário tem muitas Transações
    this.hasMany(models.Transaction, {
      foreignKey: "user_id",
      as: "transactions",
    });
    this.hasMany(models.Budget, {
      foreignKey: 'user_id',
      as: 'budgets'
    });
    this.hasMany(models.Goal, {
      foreignKey: 'user_id',
      as: 'goals'
    });
  }
}

module.exports = User;

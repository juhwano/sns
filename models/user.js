const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(45),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        provider: {
          type: Sequelize.STRING(15),
          allowNull: false,
          defaultValue: 'local',
        },
      },
      {
        sequelize,
        timestamps: true, // createAt, updateAt 자동 생성
        underscored: true, //컬럼명 스네이크 형식으로 변경
        modelName: 'USER',
        tableName: 'USER',
        paranoid: true, // deleteAt을 생성 (삭제한 날짜)
        charset: 'utf8mb4', //이모지 가능
        collate: 'utf8mb4_general_ci', //한글 저장
        freezeTableName: true, //테이블명 이름 그대로 사용
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post, {
      foreignKey: 'user_id',
    });
    db.User.belongsToMany(db.Post, {
      through: 'UserPostLike',
      foreignKey: 'user_id',
    });
  }
};

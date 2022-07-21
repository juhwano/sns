const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        likes: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt, updatedAt 컬럼 자동 추가
        underscored: true, //컬럼명 스네이크 형식으로 변경
        modelName: 'POST',
        tableName: 'POST',
        paranoid: true,
        charset: 'utf8mb4', //이모지 가능
        collate: 'utf8mb4_general_ci', //한글 저장
        freezeTableName: true, //테이블명 이름 그대로 사용
      },
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User, {
      foreignKey: 'user_id',
      allowNull: false,
    });
    db.Post.belongsToMany(db.Hashtag, {
      foreignKey: 'post_id',
      through: 'PostHashtag',
    });
    db.Post.belongsToMany(db.User, {
      foreignKey: 'post_id',
      through: 'UserPostLike',
    });
  }
};

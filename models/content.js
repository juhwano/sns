const Sequelize = require('sequelize');

module.exports = class Content extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt, updatedAt 컬럼 자동 추가
        underscored: true, //컬럼명 스네이크 형식으로 변경
        modelName: 'CONTENTS',
        tableName: 'CONTENTS',
        paranoid: true,
        charset: 'utf8mb4', //이모지 가능
        collate: 'utf8mb4_general_ci', //한글 저장
        freezeTableName: true, //테이블명 이름 그대로 사용
      },
    );
  }
  static associate(db) {
    db.Content.belongsTo(db.Post, {
      foreignKey: 'post_id',
      targetKey: 'id',
    });
  }
};

const { Sequelize } = require('sequelize');
const Seqeulize = require('sequelize');

module.export = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: true,
        },
        url: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true, //createdAt, updatedAt 컬럼 자동 추가
        underscored: true, //컬럼명 스네이크 형식으로 변경
        modelName: 'IMAGE',
        tableName: 'IMAGE',
        paranoid: true,
        charset: 'utf8mb4', //이모지 가능
        collate: 'utf8mb4_general_ci', //한글 저장
        freezeTableName: true, //테이블명 이름 그대로 사용
      },
    );
  }
  static associate(db) {}
};

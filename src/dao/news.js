// const database = require('../db/index')
// var Sequelize = require('sequelize');
//
// const News = database.define('gw_news', {
//     title: Sequelize.STRING,
//     content: Sequelize.TEXT,
//     author: Sequelize.STRING,
//     createdDate: {
//         type: Sequelize.DATE,
//         field: 'created_date',
//         allowNull: false,
//         defaultValue: Sequelize.NOW
//     },
//     modifyDate: {
//         type: Sequelize.DATE,
//         field: 'modify_date',
//         allowNull: false,
//         defaultValue: Sequelize.NOW
//     }
// }, {
//     timestamps: false,
//     tableName: 'gw_news',
//     createdAt: false,
//     updatedAt: false
// });
//
// exports.getAll=async function getAll() {
//     let newsList
//     try {
//         newsList = await News.findAll({raw: true})
//     } catch (err) {
//         console.error(err)
//     }
//     return newsList ? newsList : []
// }
//
// exports.create=async function create(news) {
//     await database.sync();
//     let isSuc = false;
//     try {
//         let _blog = await News.create(news);
//         isSuc = true;
//     } catch (err) {
//         console.error(err);
//     }
//     return isSuc;
// }

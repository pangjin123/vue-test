const db = require('../../plugins/mysql');

const todoController = {
    //기존 getTest() db연결 테스트
   async  getTest() {
        const query = `SELECT * FROM vue.todo`;
        const [[rows]] = await db.execute(query);
        return rows;
    }
}
module.exports = todoController;
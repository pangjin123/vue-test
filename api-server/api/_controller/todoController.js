const db = require('../../plugins/mysql');
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const {resData, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

//전체 row 갯수
const getTotal = async() => {
    try {
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.TODO} WHERE done='N'`;
        const [[{ cnt }]] = await db.execute(query);
        return cnt;
    } catch (e) {
        console.log(e.message);
        return resData(     //에러 메시지 표시와 현재 시간
            STATUS.E300.result, 
            STATUS.E300.resultDesc, 
            moment().format('LT')
        );
    }
};

//페이징으로 가져오기
const getList = async (req) => {
    try {
        //마지막 id, len갯수
        const lastId = parseInt(req.query.lastId) || 0;
        const len = parseInt(req.query.len) || 10;

        let where = "";
        if(lastId) {
            //0은 false
            where = `AND id < ${lastId}`;
        }
        const query = `SELECT * FROM ${TABLE.TODO} WHERE done='N' ${where} order by id desc limit 0, ${len}`;
        const [rows] = await db.execute(query);
        return rows;
    } catch(e) {
        console.log(e.message);
        return resData(
            STATUS.E300.result, 
            STATUS.E300.resultDesc, 
            moment().format('LT')
        );
    }
};

//row 존재유무
const getSelectOne = async(id) => {
    try {
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.TODO} WHERE id=?`;
        const values = [id];
        const [[{ cnt }]] = await db.execute(query, values);
        return cnt;
    } catch (e) {
        console.log(e.message);
        return resData(
            STATUS.E300.result, 
            STATUS.E300.resultDesc, 
            moment().format('LT')
        );
    }
};

const todoController = {

    //추가(create)
    create: async (req) => {
        const { title } = req.body;
            //body check
            if(isEmpty(title)) {
                return resData(
                    STATUS.E100.result, 
                    STATUS.E100.resultDesc, 
                    moment().format('LT')
                );
            }

        try {
            //insert
            const query = `INSERT INTO ${TABLE.TODO} (title) VALUES (?)`;
            const values = [title];
            const [rows] = await db.execute(query, values);
            if(rows.affectedRows == 1) {
                return resData(     //데이터 표시
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT'),
                    {id: rows.insertId }
                );
            }
        }catch(e) {
            console.log(e.message);
            return resData(
                STATUS.E300.result, 
                STATUS.E300.resultDesc, 
                moment().format('LT')
            );
        }
    },
    
    //list
    list: async (req) => {
        const totalCount = await getTotal();
        const list = await getList(req);
        if (totalCount > 0 && list.length) {
            return resData(
                STATUS.S200.result,
                STATUS.S200.resultDesc,
                moment().format('LT'),
                { totalCount, list }
            );
        } else {
            return resData(
                STATUS.S201.result, 
                STATUS.S201.resultDesc, 
                moment().format('LT')
            );
        }
    },

    //update
    update: async (req) => {
        const { id } = req.params;  //url /로 들어오는 것
        const { title, done } = req.body;
        if (isEmpty(id) || isEmpty(title) || isEmpty(done)) {   //값을 안넣으면 나타내는 에러
            return resData(
                STATUS.E100.result, 
                STATUS.E100.resultDesc, 
                moment().format('LT')
            );
        }
        try {
            const query = `UPDATE ${TABLE.TODO} SET title =?, done=? WHERE id =?`;
            const values = [title, done, id];
            const [rows] = await db.execute(query, values);
            if(rows.affectedRows == 1) {
                return resData(
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT')
                );
            }
        } catch (e) {
            console.log(e.message)
            return resData(
                STATUS.E300.result, 
                STATUS.E300.resultDesc, 
                moment().format('LT')
            );
        }
    },

    //delete
    delete: async (req) => {
        const { id } = req.params;
        if (isEmpty(id)) {
            return resData(
                STATUS.E100.result, 
                STATUS.E100.resultDesc, 
                moment().format('LT')
            );
        }
        const cnt = await getSelectOne(id);
        try{
            if(!cnt) {  //삭제하려는 데이터가 없으면
                return resData(
                    STATUS.E100.result,
                    STATUS.E100.resultDesc,
                    moment().format('LT')
                );
            }
            const query = `DELETE FROM ${TABLE.TODO} WHERE id = ?;`;    //DB delete문
            const values = [id];
            const [rows] = await db.execute(query, values);
            if (rows.affectedRows == 1) {
                return resData(
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT')
                );
            }
        } catch (e) {
            console.log(e.message);
            return resData(
                STATUS.E300.result, 
                STATUS.E300.resultDesc, 
                moment().format('LT')
            );
        } 
        return rows;
    },

    //reset
    reset: async (req) => {
        try{    //테이블 지우기
            const query = `TRUNCATE TABLE ${TABLE.TODO}`;   //DB Truncate 문
            await db.execute(query);    //DB에 적용
        } catch (e) {   //에러
            console.log(e.message);
            return resData(     //DB 연동 실패 에러표시
                STATUS.E300.result, 
                STATUS.E300.resultDesc, 
                moment().format('LT')
            );  
        } 

        const { title, done, len } = req.body;
        if(isEmpty(title) || len > 100 || done == "N") {    //title 값이 없거나 len이 100을 넘거나 done이 N이면 에러메시지
            return resData(
                STATUS.E100.result, 
                STATUS.E100.resultDesc, 
                moment().format('LT')
            );
        }
        try {   //Insert문
           const query = `INSERT INTO todo (title, done) VALUES `;
           const arr = [];
           for ( i = 0; i < len; i++ ) {    //len만큼 생성
            arr.push(`('${title}${i}', '${done}')`);    //배열에 push로 넣기
           }
           query1 = query + arr.join(",");  //VALUES 값     배열값 join
           const [rows] = await db.execute(query1);

           if (rows.affectedRows != 0) {    //rows값이 0이 아닐경우 메시지 보내기
            return resData(
                STATUS.S200.result,
                STATUS.S200.resultDesc,
                moment().format('LT')
            );
           }
        }catch (e) {    //에러
            console.log(e.message);
            return resData(
                STATUS.E300.result, 
                STATUS.E300.resultDesc, 
                moment().format('LT')
            );
        }
    },
}
module.exports = todoController;
const router = require('express').Router();
const todoController = require('./_controller/todoController');

// 추가(create)
router.post("/", async (req, res) => {
    const result = await todoController.create(req);
    res.json(result);
});

// 검색(list)
router.get('/', async (req, res) => {
    const result = await todoController.list(req);
    res.json(result);
})

//업데이트(update)
router.put('/:id', async (req, res) => {
    const result = await todoController.update(req);
    res.json(result);
})

//삭제(delete)
router.delete('/:id', async (req, res) => {
    const result = await todoController.delete(req);
    res.json(result);
})

//초기화(reset), truncate
router.post('/reset', async (req, res) => {
    const result = await todoController.reset(req);
    res.json(result);
})

module.exports = router;
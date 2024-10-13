const router = require('koa-router')()

router.prefix('/api')

const testController = require('../controllers/test')
const userController = require('../controllers/user')
const todoController = require('../controllers/todo')
const okrController = require('../controllers/okr')
const ObjectiveController = require('../controllers/objective')
const keyresultController = require('../controllers/keyresult')
const todoKeyresultController = require('../controllers/todoKeyresult')

router.get('/', testController.test)
router.post('/login', userController.login)
router.get('/todo', todoController.getTodoList)
router.post('/todo', todoController.todoInsert)
router.put('/todo/:id', todoController.todoUpdate)
router.delete('/todo/:id', todoController.todoDelete)

router.get('/okr', okrController.getOkrList)
router.post('/okr', okrController.okrInsert)
router.put('/okr/:id', okrController.okrUpdate)
router.get('/okr/:id', okrController.okrshow)

router.put('/objective/:id', ObjectiveController.objectiveUpdate)
router.delete('/objective/:id', ObjectiveController.objectiveDelete)


router.delete('/keyresult/:id', keyresultController.keyresultDeleted)
router.put('/keyresult/:id', keyresultController.keyresultUpdate)

router.get('/todo/:id/keyresult', todoKeyresultController.getTodoKeyresultList)
router.post('/todo/:id/keyresult', todoKeyresultController.todoKeyresultInsert)
router.delete('/todo/:id/keyresult', todoKeyresultController.todoKeyresultDelete)




module.exports = router
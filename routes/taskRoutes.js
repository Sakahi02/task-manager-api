const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect, isAdmin } = require('../middlewares/authMiddleware'); 
router.use(protect);

router.delete('/:taskId', isAdmin, taskController.deleteTask); 
router.put('/:taskId', isAdmin, taskController.updateTask);  
router.get('/', taskController.getTasks); 
router.post('/', taskController.createTask); 

module.exports = router;

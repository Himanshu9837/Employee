let express = require('express');
let router = express.Router();
const employee = require("../models/employeeSchema");
const transaction = require("../models/transactionSchema");
/* GET home page. */
const employeeController = require("../controllers/employeeController.js"); 
router.post("/employee",employeeController.addemployee);
router.get("/employee",employeeController.editemployee);
router.put("/employee",employeeController.updateemployee);
router.delete("/employee",employeeController.deleteemployee);

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/', (req, res, next) => {

  return User.find(function (err, clients) {
    if (!err) {
      res.render('detail.ejs', {
        title: 'Details',
        clients: clients
      });
    } else {
      return console.log(err);
    }
  });
});

router.get('/show', async(req, res, next) => {
  
  const data=await employee.find();
  return res.status(200).json(data)

});
router.get('/transactiondetails/(:id)', async(req, res, next) => {
  const id=req.params.id;
  const data=await transaction.findOne({_id:id}).populate('employeeId');
  return res.status(200).json(data)

});

module.exports = router;

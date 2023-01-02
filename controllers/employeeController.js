const employee = require("../models/employeeSchema");
const transaction = require("../models/transactionSchema");
class Employee{
    async addemployee(req,res){
        try{
          const firstname=req.body.firstname.toLowerCase();
          const lastname=req.body.lastname.toLowerCase();
          const department=req.body.department;
          const salary=req.body.salary;
          if(!firstname && !department && ! salary && lastname){
            return res.status(400).json('Please fill all fields')
          }
          const data=new employee({firstname,lastname,department,salary});
          data.save().then((result)=>{
            const id=data._id;
            const transactiondata=new transaction({employeeId:id,action:'Add'})
            transactiondata.save();
            return res.status(200).json('Employee add successfully');
          })
        }catch(error){
            console.log(error)
        }
    }
async editemployee(req,res){
    try{
      const id=req.body.id;
      const data= await employee.findOne({_id:id});
      if(!data){
        return res.status(400).json('Not found');
      }else{
        return res.status(400).json(data);
      }
    }catch(error){
        console.log(error)
    }
}
async updateemployee(req,res){
    try{
      const id=req.body.id;
      const firstname=req.body.firstname.toLowerCase();
      const lastname=req.body.lastname.toLowerCase();
      const department=req.body.department;
      const salary=req.body.salary;
      const data= await employee.findOne({_id:id});
      if(!data){
        return res.status(400).json('Not found');
      }else{
       const data={}
       data.firstname=firstname;
       data.lastname=lastname;
       data.department=department;
       data.salary=salary;
       await employee.findByIdAndUpdate(id,data).then((result)=>{
        const transactiondata=new transaction({employeeId:id,action:'Update'})
        transactiondata.save();
        return res.status(200).json('Update employee successfully');
       })
      }
    }catch(error){
        console.log(error)
    }
}
async deleteemployee(req,res){
    try{
      const id=req.body.id;
      const data= await employee.findOne({_id:id});
      if(!data){
        return res.status(400).json('Not found');
      }else{
        const data=await employee.findByIdAndRemove({_id:id}).then((result)=>{
            const transactiondata=new transaction({employeeId:id,action:'Delete'})
            transactiondata.save();
            return res.status(200).json('Delete successfully')
        })
      }
    }catch(error){
        console.log(error)
    }
}
}
module.exports = new Employee();

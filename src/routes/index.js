const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/',(req,res)=>{
    res.render('index')
})


router.get('/lista',async(req,res)=>{
   const tasks = await Task.find()
   console.log(tasks);
    res.render('lista',{
        tasks //tasks:tasks
    })
})

router.post('/add',async(req,res)=>{
    // console.log(new Task(req.body));
    // console.log(req.body);
    const task = new Task(req.body)
    await task.save()
    // res.send('recibido')
    res.redirect('/lista')
})

router.get('/estado/:id',async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id)
    // console.log(task);
    task.status = !task.status
    await task.save()
    res.redirect('/lista')

})

router.get('/edit/:id',async(req,res)=>{
    const {id} = req.params
    const task = await Task.findById(id)
    console.log();
    res.render('edit',{task})
})

router.post('/update/:id',async(req,res)=>{
    const {id} = req.params
   await Task.update({_id: id}, req.body)
   res.redirect('/lista')

})

router.get('/delete/:id',async(req,res)=>{
    const {id} = req.params
    console.log(id);
    await Task.remove({_id: id})
    res.redirect('/lista')

})


module.exports = router
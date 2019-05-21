//Gets all members

const express = require('express');
const uuid = require("uuid");
const router = express.Router();
const members = require('../../Member');
router.get("/", (req,res) => {
    res.json(members);
})

//Get simple member
router.get('/:id', (req, res) =>{
   
   const found = members.some(member => member.id === req.params.id);
   if(found){
    res.json(members.filter(member => member.id === req.params.id));
   }else{
       res.status(400).json({msg: "Message not found"});
   }

});

//Create Member
router.post('/' , (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        stauts: 'active'
    }
    if(!newMember.name || !newMember.email){
       return  res.status(400).json({msg: "Please send name and email"});
    }
    members.push(newMember);
    res.json(members);
    res.send(req.body);
});

//Update 
router.put('/:id', (req, res) =>{
    const found = members.some(member => member.id === req.params.id);
    if(found){
     const updateMember = req.body;
     members.forEach(member => {
         if(member.id === req.params.id){
             member.name = updateMember.name ? updateMember: member.name;
             member.email = updateMember.email ? updateMember: member.email;

             res.json({msg: "Member updated", member});
         }
     })
    }else{
        res.status(400).json({msg: "Message not found"});
    }
 
 });

 //Deleate

 router.delete('/:id', (req, res) =>{
   
    const found = members.some(member => member.id === req.params.id);
    if(found){
     res.json({msg: "Member deleated",
     members: members.filter(member => member.id !== req.params.id)
    });
    }else{
        res.status(400).json({msg: "Message not found"});
    }
 
 });

module.exports = router;
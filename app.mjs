import express from "express";
import cors from 'cors'
import schema from './schema/index.mjs'
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON data

let users = [];
/// ya cheak kare ga ka kon sa reponse sab sa zayda use horaha ha
app.use('/',(req,res,next)=>{
    console.log("Request URL:", req.url, "method: ", req.method);
    next()
  })

app.use(cors())
// GET: Fetch All Users
app.get("/adduser", (req, res) => {
    res.json(users);
});

// POST: Add a New User
app.post('/adduser', async (req, res) => {
    console.log(req.body); 
    try {
        await schema.validateAsync(req.body); 
        const newUser = {
            id: users.length + 1, 
            ...req.body
        };

        users.push(newUser); 
        res.json({ message: "User added successfully!", users });
    } catch (err) { 
        res.status(400).send({ error: err.message || "Something went wrong", status: 400 });
    }
});




app.delete('/deleteuser/:id', (req, res) => {
    const { id } = req.params; // Extract ID from request params
    const userIndex = users.findIndex(user => user.id === parseInt(id));

    users.splice(userIndex, 1); // Remove user from the array
    res.json({ message: "User deleted successfully!", users });
});
 

app.put('/user/:id',(req,res)=>{
    const {id}= req.params.id
    const index = users.findIndex(v=>v.id === Number(id))
    
    
    users.splice(index,1,{...req.body,id:parseInt(req.params.id)})
    res.send({mss:"user edited"})
   })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

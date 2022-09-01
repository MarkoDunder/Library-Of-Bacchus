require("dotenv").config();
const { request, response } = require("express");
const express= require("express");
const app= express();
const morgan=require("morgan");
const db=require("./db/index");
const crypto= require("crypto");
const cors = require("cors");

app.use(cors());

app.use(express.json());
const port=Number(process.env.PORT)|| 3001;

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});

app.get("/api/v1/reviews/:meal_id", async (req, res)=>{
    try {
        const results= await db.query(
            "Select r.comment, r.restaraunt_address, r.rating, u.username, m.name From reviews as r Left join users as u On r.user_id=u.id Left join meals as m On  (r.meal_id=m.id) Where (m.id=$1)",[req.params.meal_id]
        );

        res.status(200).json({
            status: 'success',
            data:results.rows
        })
    } 
    catch (error) {
        console.log(error.message);    
    }
});

app.get("/api/v1/meals/:cuisine_type_id", async(req, res)=>{
    const mealsByOrigin= await db.query("Select m.name, m.description, m.photo, m.nutrition, m.recipe,c.origin From meals as m Left join cuisineType as c On (m.cuisine_type_id=c.id)Where (c.id=$1)", [req.params.cuisine_type_id]);

    res.status(200).json({
        status: 'success',
        data:{
            meals:mealsByOrigin.rows
        },
    })
});

app.get("/api/v1/user/:userId", async (req, res) => {
    try {
        //const{id}=req.params.userId;
        const results= await db.query(
            "Select username, country, gender From users where id=$1", [req.params.userId]
        );

        res.status(200).json({
            status: 'success',
            data:results.rows,
        });
    } 
    catch (error) {
        console.log(error.message);
    }
    
});

app.post("/api/v1/meals", async (req, res) => {

    try{
        const results= await db.query("Insert into Meals(id, name, description, cuisine_type_id)Values($1, $2, $3, $4) returning*", [req.body.id, req.body.name, req.body.description, req.body.cuisine_type_id]);
        
        res.status(201).json({
            status:'success',
            meal:results.rows[0],
        });
    }catch(err){
        console.error(err.message);
    }
}) /* ne treba*/

app.post("/api/v1/review", async (req, res) => {
    try {
        //const{id}=crypto.randomUUID();
        const{meal_id}=req.body.meal_id;
        const{user_id}=req.body.user_id;
        //const{comment}=req.body.comment;
        const{restaraunt_address}=req.body.restaraunt_address;
        const{rating}=req.body.rating;

        const results = await db.query(
            "Insert into reviews(id, user_id, meal_id, comment, restaraunt_address, rating)values($1, $2, $3, $4, $5, $6) returning*", [crypto.randomUUID(),req.body.user_id, req.body.meal_id,req.body.comment, req.body.restaraunt_address, req.body.rating]);

            res.status(200).json({
                status:'success',
                data:results.rows
            });
    } 
    catch (error) {
        console.log(error.message);    
    }
});

app.post("/api/v1/user", async (req,res)=>{
    try {
        const userId=crypto.randomUUID();
        const results = await db.query(
            "Insert into users(id, username, password, country, gender) Values($1, $2, $3, $4, $5) returning*", [userId, req.body.username, req.body.password, req.body.country, req.body.gender]
        );

        res.status(201).json({
            status: 'success',
            data:results.rows
        });

    } 
    catch (error) {
        console.log(error.message);
    }
});

app.post("/api/v1/suggestion", async (req, res) => {
    try {
           const suggestionId = crypto.randomUUID();
           const dishname = req.body.dishname;
           const recipe = req.body.recipe;
           const cuisine= req.body.cuisine;
           const additionalInfo=req.body.additionalInfo; 
           const results= await db.query(
            "Insert into suggestions(id, dishname, recipe, cuisine, additionalInfo)values($1, $2, $3, $4, $5);",[suggestionId, dishname, recipe, cuisine, additionalInfo]
           );
            
           res.status(201).json({
            status: 'success',
            data:results.rows
           });
    } 
    catch (error) {
        console.log(error.message);
    }
});

app.put("/api/v1/review/:reviewId", async(req, res)=>{
    try{
        const{id}=req.params;
        const{comment}=req.body;
        const{restaraunt_address}=req.body;
        const{rating}=req.body;
        const results= await db.query("Update reviews Set comment=$1, restaraunt_address=$2, rating=$3 Where user_id=$4 returning*",[comment, restaraunt_address, rating, id] );

        res.status(200).json({
            status: 'success',
            data:results.rows
        });
    }
    catch(err){
        console.log(err);
    }
});

app.get("/api/v1/meals/:mealId", async(req, res)=>{
    try {
        const id=req.params.mealId;

        const result = await db.query(
            "Select name, description, photo, cuisine_type_id, nutrition, recipe From meals Where id=$1", [id]
        );

        res.status(200).json({
            status: 'success',
            data: result.rows
        });
    } 
    catch (error) {
        console.log(error.message);    
    }
});

app.delete("/api/v1/deleteReviews/:reviewId", async(req, res)=>{
    try {
        const id=req.params.reviewId;

        const results= await db.query(
            "Delete From reviews Where id=$1", [id]
        );

        res.status(200).json("Reviews was successfully deleted");
        res.status(404).json("Review was not found");
    }
     catch (error) {
        console.log(error.message);
    }
});

/*app.get("/getAll", async (req, res) => {
    try{
        const results= await db.query("Select * from Meals");

        res.json(results.rows);
    }
    catch(err){
        console.log(err);
    }
});*/
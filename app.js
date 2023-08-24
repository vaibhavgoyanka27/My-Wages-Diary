//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { name } from "ejs";
import _ from "lodash";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin_vaibhav:Vaibhav123@cluster0.8fxi6b7.mongodb.net/ToDo");

function getDate() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day=  today.toLocaleDateString("en-US", options);
  return day;
}
const day = getDate();


const itemSchema = {
  name:String
};

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
  name:"Wake Up"
}
);

const item2 = new Item({
  name:"Breakfast"
}
);
const item3 = new Item({
  name:"Study"
}
);

const defaultItems=[item1,item2,item3];

const listSchema ={
  name:String,
  item:[itemSchema]
};
const List = mongoose.model("List",listSchema);



app.get("/", function(req, res) {
  Item.find({}).then((foundItem)=>{
    if(foundItem.length === 0){
      Item.insertMany(defaultItems).then(()=>{
      console.log("added successfully");
      });
      res.redirect("/");
    }else{
      res.render("list", {listTitle:day, newListItems: foundItem});
    }
  });
});

app.get("/:customListName", async (req,res)=>{
  const customListName = _.capitalize(req.params.customListName);

  await List.findOne({name:customListName}).then((foundList)=>{
     if(!foundList){
    // create new list
      const list = new List({
        name:customListName,
        item:defaultItems
        });
        list.save();
        res.redirect("/"+customListName);
      }else{
        // show existing list
        res.render("list",{listTitle:foundList.name,newListItems: foundList.item});
      }
    })
      .catch((err)=>{
        console.log(err);
      });  

 
});

app.post("/", async (req, res)=>{

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item1= new Item({
    name: itemName
  });

  if(listName === day){
    item1.save();
    res.redirect("/");
  }
  else{
    await List.findOne({name:listName}).then((foundList)=>{

      // if(!err)
      // {
        foundList.item.push(item1);
        foundList.save();
        res.redirect("/"+ listName);
    //   }else{
    //     console.log("title not found");
    //   }
     })
    .catch((err)=>{
      console.log(err);
    });
  }
});

app.post("/delete",(req,res)=>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === day){
    Item.findByIdAndRemove(checkedItemId).then(()=>{
    
      console.log("Successfully deleted checked item.");
      res.redirect("/");
  });
  }else{
    List.findOneAndUpdate({name:listName},{$pull: {item: {_id: checkedItemId}}}).then((foundList)=>{
      res.redirect("/" + listName);
    })
  }

});



app.get("/about", function(req, res){
  res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});

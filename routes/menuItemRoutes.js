const express = require("express");
const router = express.Router();
const menuItem = require("../modals/menuItem");






// post route to add MenuItems
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assingn the request body contains the MenuItem data

    // create a new MenuItem object using the mongoose modal
    const newMenuItem = new menuItem(data);

    // save new MenuItem document to the database
    const item = await newMenuItem.save();
    console.log("data sent");
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


// Get method to get all the MenuItems
router.get("/", async(req, res) => {
    try {
        const item = await menuItem.find();
        console.log("data fetched");
        res.status(200).json(item);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

// parameterised api calls for MenuItems
router.get("/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType; // extract the taste from the URL parameter
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const item = await menuItem.find({ taste: tasteType });
      console.log("Items fetched");
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:modified", async (req, res) => {
  try {
    const modified = req.params.modified; // Extract the Id from the URL parameter
    const updatedMenuItem = req.body; // Updated data for the MenuItem

    // Find and update the MenuItem document
    const modifiedItem = await menuItem.findByIdAndUpdate(
      modified,
      updatedMenuItem,
      {
        new: true, // return the updated document
        runValidators: true, // run validation on update in mongoose
      }
    );

    if (!modifiedItem) {
      return res.status(404).send({ error: "MenuItem not found" });
    }

    console.log("Menudata updated");
    res.status(200).json(modifiedItem);

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.delete("/:deleted", async (req, res) => {
  try {
    const deleted = req.params.deleted;  // Extract the Id from the URL parameter
    const deletedMenuItem = await menuItem.findByIdAndDelete(deleted);

    // Find and delete the MenuItem document
    if (!deletedMenuItem) {
      return res.status(404).send({ error: "MenuItem not found" });
    }
    console.log("Menudata deleted");
    res.status(200).json({ message: "MenuItem deleted successfully" });
    

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
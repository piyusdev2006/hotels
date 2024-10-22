const express = require("express");
const router = express.Router();
const person = require("../modals/person");

// post route to add a person
router.post("/", async(req, res) => {
    try {
        const data = req.body; // Assingn the request body contains the persons data

        // create a new person document using the mongoose modal
        const newPerson = new person(data);

        // save new person document to the database
        const result = await newPerson.save();
        console.log("data sent");
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});



// Get method to get all the persons
router.get("/", async(req, res) => {
    try {
        const result = await person.find();
        console.log("data fetched");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


// Parameterised API calls for person

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// update operation on person data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;  // Extract the Id from the URL parameter
    const updatedPersonData = req.body; // Updated data for the person

    // Find and update the person document
    const result = await person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true, // return the updated document
      runValidators: true,  // run validation on update in mongoose
    });

    if (!result) {
      return res.status(404).send({ error: "Person not found" });
    }


    console.log("data updated");
    res.status(200).json(result);


  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


// delete operation on person data
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;  // Extract the Id from the URL parameter
    const deletedPerson = await person.findByIdAndDelete(personId);

    // Find and delete the person document
    if (!deletedPerson) {
      return res.status(404).send({ error: "Person not found" });
    };


    console.log("data deleted");
    res.status(200).json({message: "Person deleted successfully"});


  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;



const express = require('express');
const router = express.Router();
const person = require("./../models/Person");
const {jwtAuthMiddleware, generateToken} = require ("./../jwt");

// post route to add a person
router.post("/signup", async(req, res) => {
    try{
        const data = req.body; // Assingn the request body contains the persons data

        // create a new person document using the mongoose modal
        const newPerson = new person(data);

        // save new person document to the database
        const result = await newPerson.save();
        console.log("data sent");

        const payload = {
          id: result.id,
          username: result.username,
        }
        console.log("payload is:", payload);
      

        const token = generateToken(result.username);
        // console.log("Token is:",token);
      

        res.status(200).send({result: result});

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


// login operation on person data
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Find the person document by username
    const user = await person.findOne({ username: username });

    // if user doesn't exist or password doesn't match return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ error: "Invalid username or password" });
    } 
    
    // generate JWT token
    const payload = {
      id: user.id,
      username: user.username,
    }
    

    const token = generateToken(payload);

    // send response with user details and token
    res.json({ token });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


// Profile route for person
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    const userId = userData.id;
    const user = await person.findById(userId);

    res.status(200).json({ user });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});



// Get method to get all the persons
router.get("/" , jwtAuthMiddleware ,async(req, res) => {
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



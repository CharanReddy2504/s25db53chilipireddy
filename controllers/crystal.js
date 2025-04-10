const Crystal = require('../models/Crystal');

// Seed the collection if needed
async function recreateDB() {
    // Delete everything
    await Crystal.deleteMany();

    // Seed new data
    const crystal1 = new Crystal({
        name: 'Amethyst',
        hardness: 7,
        color: 'Purple'
    });
    const crystal2 = new Crystal({
        name: 'Quartz',
        hardness: 7,
        color: 'Clear'
    });
    const crystal3 = new Crystal({
        name: 'Malachite',
        hardness: 3.5,
        color: 'Green'
    });

    // Save the instances to MongoDB
    await crystal1.save();
    await crystal2.save();
    await crystal3.save();

    console.log("Seed data inserted successfully!");
}

// You can call this function once to seed the database
let reseed = true;
if (reseed) {
    recreateDB();
}

// List all Crystals
exports.crystal_list = async function(req, res) {
    try {
        const crystals = await Crystal.find({});
        res.json(crystals);  // Return the list of crystals
    } catch (err) {
        res.status(500).send(err);  // Return error if any
    }
};

// Get details of a specific Crystal
exports.crystal_detail = async function(req, res) {
    const id = req.params.id;
    try {
        const crystal = await Crystal.findById(id);
        if (!crystal) {
            return res.status(404).send("Crystal not found");
        }
        res.json(crystal);  // Return the crystal details
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a new Crystal
exports.crystal_create_post = async function(req, res) {
    const newCrystal = new Crystal({
        name: req.body.name,
        hardness: req.body.hardness,
        color: req.body.color
    });

    try {
        const doc = await newCrystal.save();
        res.status(201).json(doc);  // Return the created crystal
    } catch (err) {
        res.status(500).send(err);  // Return error if any
    }
};

// Delete a Crystal
exports.crystal_delete = async function(req, res) {
    const id = req.params.id;
    try {
        const result = await Crystal.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send("Crystal not found");
        }
        res.send("Crystal deleted");
    } catch (err) {
        res.status(500).send(err);  // Return error if any
    }
};

// Update a Crystal
exports.crystal_update_put = async function(req, res) {
    const id = req.params.id;
    const updatedCrystal = {
        name: req.body.name,
        hardness: req.body.hardness,
        color: req.body.color
    };

    try {
        const doc = await Crystal.findByIdAndUpdate(id, updatedCrystal, { new: true });
        if (!doc) {
            return res.status(404).send("Crystal not found");
        }
        res.json(doc);
    } catch (err) {
        res.status(500).send(err);  // Return error if any
    }
};

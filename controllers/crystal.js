const Crystal = require('../models/Crystal');

// ===================================
//         DATABASE SEED FUNCTION
// ===================================

async function recreateDB() {
    try {
        await Crystal.deleteMany();
        console.info('Existing records cleared');

        const crystals = [
            { name: 'Amethyst', hardness: 7, color: 'Purple' },
            { name: 'Quartz', hardness: 7, color: 'Clear' },
            { name: 'Malachite', hardness: 3.5, color: 'Green' }
        ];

        await Crystal.insertMany(crystals);
        console.info('Seed data inserted successfully!');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}

// Toggle reseed (only run once when needed)
const reseed = true;
if (reseed) {
    recreateDB();
}

// ===================================
//           CRUD CONTROLLERS
// ===================================

// GET all Crystals
exports.crystal_list = async (req, res) => {
    try {
        const crystals = await Crystal.find({});
        res.status(200).json(crystals);
    } catch (err) {
        res.status(500).send({ message: 'Failed to retrieve crystals', error: err.message });
    }
};

// GET Crystal by ID
exports.crystal_detail = async (req, res) => {
    const id = req.params.id;
    try {
        const crystal = await Crystal.findById(id);
        if (!crystal) return res.status(404).send({ message: `Crystal with ID ${id} not found` });
        res.status(200).json(crystal);
    } catch (err) {
        res.status(500).send({ message: 'Error retrieving crystal', error: err.message });
    }
};

// POST Create a new Crystal
exports.crystal_create_post = async (req, res) => {
    try {
        const { name, hardness, color } = req.body;
        if (!name || !hardness || !color) {
            return res.status(400).send({ message: 'All fields (name, hardness, color) are required' });
        }

        const newCrystal = new Crystal({ name, hardness, color });
        const saved = await newCrystal.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).send({ message: 'Error creating crystal', error: err.message });
    }
};

// Handle Costume delete on DELETE.
exports.crystal_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await crystal.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

// PUT Update a Crystal by ID
exports.crystal_update_put = async (req, res) => {
    const id = req.params.id;
    const { name, hardness, color } = req.body;

    if (!name || !hardness || !color) {
        return res.status(400).send({ message: 'All fields (name, hardness, color) are required' });
    }

    try {
        const updated = await Crystal.findByIdAndUpdate(
            id,
            { name, hardness, color },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).send({ message: `Crystal with ID ${id} not found` });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).send({ message: 'Error updating crystal', error: err.message });
    }
};




const Crystal = require('../models/crystal');

// =======================================
//         DATABASE SEED FUNCTION
// =======================================
async function recreateDB() {
    try {
        await Crystal.deleteMany();
        console.info('✅ Existing records cleared');

        const crystalData = [
            { name: 'Amethyst', hardness: 7, color: 'Purple' },
            { name: 'Quartz', hardness: 7, color: 'Clear' },
            { name: 'Malachite', hardness: 3.5, color: 'Green' }
        ];

        await Crystal.insertMany(crystalData);
        console.info('✅ Seed data inserted successfully!');
    } catch (err) {
        console.error('❌ Error seeding data:', err);
    }
}
// Toggle manually during development
// if (true) recreateDB();

// =======================================
//         JSON API CONTROLLERS
// =======================================

// GET all Crystals
exports.crystal_list = async (req, res) => {
    try {
        const crystals = await Crystal.find({});
        res.status(200).json(crystals);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve crystals', error: err.message });
    }
};

// GET one Crystal
exports.crystal_detail = async (req, res) => {
    try {
        const crystal = await Crystal.findById(req.params.id);
        if (!crystal) {
            return res.status(404).json({ message: `Crystal with ID ${req.params.id} not found` });
        }
        res.status(200).json(crystal);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving crystal', error: err.message });
    }
};

// POST create a Crystal
exports.crystal_create_post = async (req, res) => {
    try {
        const { name, hardness, color } = req.body;
        if (!name || hardness == null || !color) {
            return res.status(400).json({ message: 'All fields (name, hardness, color) are required' });
        }
        const newCrystal = new Crystal({ name, hardness, color });
        const saved = await newCrystal.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: 'Error creating crystal', error: err.message });
    }
};

// PUT update Crystal
exports.crystal_update_put = async (req, res) => {
    const { name, hardness, color } = req.body;
    if (!name || hardness == null || !color) {
        return res.status(400).json({ message: 'All fields (name, hardness, color) are required' });
    }

    try {
        const updated = await Crystal.findByIdAndUpdate(
            req.params.id,
            { name, hardness, color },
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: `Crystal with ID ${req.params.id} not found` });
        }
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating crystal', error: err.message });
    }
};

// ✅ DELETE Crystal (API controller)
exports.crystal_delete = async (req, res) => {
    try {
        const result = await Crystal.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Crystal with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: 'Crystal deleted successfully', data: result });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting crystal', error: err.message });
    }
};

// =======================================
//         PAGE VIEW CONTROLLERS
// =======================================

// List page
exports.crystal_view_all_Page = async (req, res) => {
    try {
        const crystals = await Crystal.find();
        res.render('crystal_list', { title: 'Crystal List', crystals });
    } catch (err) {
        res.status(500).send({ message: 'Error rendering crystal list', error: err });
    }
};

// Detail view
exports.crystal_view_one_Page = async (req, res) => {
    console.log("Single view for crystal id " + req.query.id);
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystaldetail', {
            title: 'Crystal Detail',
            toShow: result
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Create form view
exports.crystal_create_Page = function (req, res) {
    console.log("Create crystal view");
    try {
        res.render('crystalcreate', { title: 'Create Crystal' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Update form view
exports.crystal_update_Page = async function (req, res) {
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystalupdate', { title: 'Update Crystal', toShow: result });
    } catch (err) {
        res.status(500).send({ message: 'Error loading update page', error: err });
    }
};

// Delete confirmation view
exports.crystal_delete_Page = async function (req, res) {
    console.log("Delete view for crystal id " + req.query.id);
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystaldelete', { title: 'Delete Crystal', toShow: result });
    } catch (err) {
        res.status(500).send({ message: 'Error loading delete page', error: err });
    }
};

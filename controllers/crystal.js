const Crystal = require('../models/crystal');

// =======================================
//         DATABASE SEED FUNCTION
// =======================================
async function recreateDB() {
    try {
        await Crystal.deleteMany();
        console.info('Existing records cleared');

        const crystalData = [
            { name: 'Amethyst', hardness: 7, color: 'Purple' },
            { name: 'Quartz', hardness: 7, color: 'Clear' },
            { name: 'Malachite', hardness: 3.5, color: 'Green' }
        ];

        await Crystal.insertMany(crystalData);
        console.info('Seed data inserted successfully');
    } catch (err) {
        console.error('Error seeding data:', err);
    }
}
// Uncomment the line below to reseed the database manually
// recreateDB();

// =======================================
//         JSON API CONTROLLERS
// =======================================

exports.crystal_list = async (req, res) => {
    try {
        const crystals = await Crystal.find({});
        res.status(200).json(crystals);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve crystals', error: err.message });
    }
};

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

exports.crystal_view_all_Page = async (req, res) => {
    try {
        const crystals = await Crystal.find();
        res.render('crystal', { title: 'Crystal Collection', crystals: crystals || [] });
    } catch (err) {
        res.status(500).send({ message: 'Error rendering crystal list', error: err.message });
    }
};

exports.crystal_view_one_Page = async (req, res) => {
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystaldetail', { title: 'Crystal Detail', toShow: result });
    } catch (err) {
        res.status(500).send({ message: 'Error loading crystal detail', error: err.message });
    }
};

exports.crystal_create_Page = function (req, res) {
    try {
        res.render('crystalcreate', { title: 'Create Crystal' });
    } catch (err) {
        res.status(500).send({ message: 'Error loading create page', error: err.message });
    }
};

exports.crystal_update_Page = async function (req, res) {
    if (!req.user) {
        return res.redirect('/login');
    }
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystalupdate', { title: 'Update Crystal', toShow: result });
    } catch (err) {
        res.status(500).send({ message: 'Error loading update page', error: err.message });
    }
};

exports.crystal_delete_Page = async function (req, res) {
    try {
        const result = await Crystal.findById(req.query.id);
        if (!result) return res.status(404).send("Crystal not found");
        res.render('crystaldelete', { title: 'Delete Crystal', toShow: result });
    } catch (err) {
        res.status(500).send({ message: 'Error loading delete page', error: err.message });
    }
};
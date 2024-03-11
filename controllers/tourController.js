import Destination from '../models/Destination.js';

export const createDestination = async (req, res) => {
    try {
        // Extract destination data from the request body
        const { title, city, address, distance, rating, desc, featured } = req.body;

        // Create a new destination object
        const newDestination = new Destination({
            title,
            city,
            address,
            distance,
            rating,
            desc,
            featured
        });

        // Save the new destination to the database
        const savedDestination = await newDestination.save();

        // Respond with success message and the saved destination
        res.status(201).json({ success: true, message: 'Destination created successfully', data: savedDestination });
    } catch (error) {
        // If an error occurs, respond with error message
        console.error('Error creating destination:', error);
        res.status(500).json({ success: false, message: 'Failed to create destination. Try again' });
    }
};

export const updateDestination = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updateDestination = await Destination.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        res.status(200).json({ success: true, message: 'Successfully updated', data: updateDestination });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update' });
    }
};

    export const deleteDestination = async (req, res, next) => {
        const id = req.params.id;
        try {
            await Destination.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: 'Successfully deleted' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Failed to delete' });
        }
    };

export const getSingleDestination = async (req, res, next) => {
    const id = req.params.id;
    try {
        const desti = await Destination.findById(id);
        if (!desti) {
            return res.status(404).json({ success: false, message: 'Destination not found' });
        }
        res.status(200).json({ success: true, message: 'Successful', data: desti });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getAllDestinations = async (req, res, next) => {
    const page = parseInt(req.query.page) || 0; // Default page is 0 if not provided

    try {
        const destinations = await Destination.find({}).skip(page * 8).limit(8);
        res.status(200).json({ success: true, count: destinations.length, message: 'Successful', data: destinations });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

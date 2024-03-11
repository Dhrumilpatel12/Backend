import User from '../models/User.js';

export const createDestination = async (req, res,next) => {
    const newDestination = new Destination(req.body);

    try {
        
        const savedDestination = await newDestination.save();
        res.status(200).json({ success: true, message: 'Successfully created', data: savedDestination });
    } catch (err) {
        console.error('Error creating destination:', err);
        res.status(500).json({ success: false, message: 'Failed to create. Try again' });
    }
};


// update destination

export const updateDestination = async (req, res,next) =>{
    const id = req.params.id
    try{

        const updateDestination = await Destination.findByIdAndUpdate(id, {
            $set: req.body
        },{new:true})

        res.status(200).json({ success: true, message: 'Successfully updated', data: updateDestination });
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Failed to update' });
    }
};

export const deleteDestination = async (req, res,next) =>{
    const id = req.params.id
    try{

       await Destination.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Successfully deleted'});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Failed to delete' });
    }
};
export const getsingleDestination = async (req, res,next) =>{
    const id = req.params.id
    try{

       const desti =  await Destination.findById(id);

        res.status(200).json({ success: true, message: 'Successful', data: desti });
    }
    catch(err){
        res.status(404).json({ success: false, message: 'not found' });
    }
};

export const getallDestination = async (req, res,next) =>{


    const page = parseInt(req.query.page)

    try{

        const destination = await Destination.find({}).skip(page * 8).limit(8);
        res.status(200).json({ success: true,  count: destination.length,
            message: 'Successful', 
        data: destination });
    }
    catch(err){
        res.status(404).json({ success: false, message: 'not found' });
    }
};


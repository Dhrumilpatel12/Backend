import User from '../models/Destination.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const register = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User({
            ...req.body,
            password:hash,
        });
        res.status(200).send("User Had been Created");
    } catch (error){
        next(error)
    }
};
export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user) return next(createError(404,"user not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);

        if(!isPasswordCorrect){
            return next(createError((400,"Wrong Password or username")))

            const token = jwt.sign({
              id: user._id, isAdmin:user.isAdmin
            },
            process.env.JWT
            )
            const{ password, isAdmin, ...otherDetails } = user._doc;

            res.cookie("access_token", token,{
                httpOnly: true,

            })
            .status(200)
            .json({ details:{ ...otherDetails },isAdmin })
        }
        res.status(200).send("User Has been Created");
    } catch (error){
        next(error)
    }
};

import User from "../models/User.js";

const list = async () => {
    try {
        return await User.find().select('-__v');
    } catch (err) {
        throw err;
    }
}

const findById = async (id) => {
    try {
        return await User.findById(id).select('-__v');
    } catch (err) {
        throw err;
    }
}

const isUserExists = async (id) => {
	try {
		const user =  await User.findOne({ _id: id }).select("_id");
		return user != null;
	} catch (err) {
		throw err;
	}
}

const isUsernameExists = async (username) => {
	try {
		const user = await User.findOne({username: username}).select('username');
		return user != null;
	} catch (err) {
		throw err;
	}
}

const isSuperAdmin = async (id) => {
    try {
        const user = await User.findOne({ _id: id }).select("role");
        return user.role === 'superAdmin';
    } catch (err) {
        throw err;
    }
}

const store = async (body) => {
    try {
        const user = await User(body);
        return await user.save();
    } catch (err) {
        throw err;
    }
}

const update = async (body) => {
    try {
        return await User.updateOne(
            {_id: body.id}, 
            {$set: body}, 
            {runValidators: true}
        );
    } catch (err) {
        throw err;
    }
}

const drop = async (id) => {
    try {
        return await User.deleteOne({_id: id});
    } catch (err) {
        throw err;
    }
}

export default {
	list,
	findById,
	isUserExists,
	isUsernameExists,
    isSuperAdmin,
	store,
	update,
	drop
};
import FanTLTeam from '../models/FanTLTeam.js';
import { error, success } from '../utils/responseHelper.js';

// Show all teams
export const all = async (request, response) => {
    try {
        const teams = await FanTLTeam.find();
        if(!teams.length) {
            return success(response, 200, "Empty FanTL Teams Data");
        }
        return success(response, 200, "Fetch FanTL Teams Data Success", teams);
    } catch (err) {
        return error(response, 500, 'Fetch FanTL Teams Data Failed', err);
    }
}

// Fetch detail of team Data
export const detail = async (request, response) => {
    try {
        const teams = await FanTLTeam.findOne({code: request.query.code}).select('-__v');
        if(teams === null) {
            return error(response, 404, "Fetch FanTL Teams Data Failed");
        }
        return success(response, 200, "Fetch FanTL Teams Data Success", teams);
    } catch (err) {
        return error(response, 500, 'Fetch FanTL Teams Data Failed', err);
    }
}

// Store teams data
export const store = async (request, response) => {
    try {
        const isTeamNameExists = await FanTLTeam.findOne({name: request.body.name});
        if(isTeamNameExists) {
            return error(response, 400, 'Team Name exists');
        }
        const team = await FanTLTeam(request.body);
        try {
            await team.save();
            return success(response, 201, "Store FanTL Team Data Success");
        } catch (err) {
            throw err;
        }
    } catch (err) {
        return error(response, 500, 'fatal_error', 'Store FanTL Team Data Failed', err);
    }
}

// Update User
export const update = async (request, response) => {
    try {
        const team = await FanTLTeam.findOne({code: request.body.code});
        if(team === null) {
            return error(response, 404, "Data Not Found");
        }
        await FanTLTeam.updateOne({code: request.body.code}, {$set: request.body}, { runValidators: true });
        return success(response, 200, "Update FanTL Team Data Success");
    } catch (err) {
        return error(response, 500, 'fatal_error', 'Update FanTL Team Data Failed', err);
    }
}

// Delete User
export const drop = async (request, response) => {
    try {
        const team = await FanTLTeam.findOne({code: request.query.code});
        if(team === null) {
            return error(response, 404, "Data Not Found");
        }
        await FanTLTeam.deleteOne({code: request.query.code});
        return success(response, 200, "Delete FanTL Teams Data Success");
    } catch (err) {
        return error(response, 500, 'Delete FanTL Teams Data Failed', err);
    }
}
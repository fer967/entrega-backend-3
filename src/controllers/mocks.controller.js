import MockingService from "../services/mocking.js";
import Pet from "../dao/models/Pet.js";
import User from "../dao/models/User.js";

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({status: "success", payload: pets});
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50);
    res.send({status: "success", payload: users});
}

const generateData = async (req, res) => {
    const { users, pets } = req.query;
    try {
        const numUsers = parseInt(users);
        const numPets = parseInt(pets);
        const generatedUsers= await MockingService.generateMockingUsers(numUsers);  
        const generatedPets = await MockingService.generateMockingPets(numPets);
        const insertedPets = await Pet.insertMany(generatedPets);
        const insertedUsers = await User.insertMany(generatedUsers);
        res.status(201).json({
            message: "Mascotas y Usuarios generados e insertados con éxito",
            pets: insertedPets,
            users: insertedUsers
        }); 
    } catch (error) {
        console.error("Error al generar los datos:", error);
        res.status(500).json({ error: "Error al generar los datos" });
    }
};

export default {getMockingPets, getMockingUsers, generateData}; 

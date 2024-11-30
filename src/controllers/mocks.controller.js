import MockingService from "../services/mocking.js";

const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({status: "success", payload: pets});
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50);
    res.send({status: "success", payload: users});
}

const generateData = async (req, res) => {
    const { numUsers, numPets } = req.query;
    try {
        const generatedUsers = await MockingService.generateMockingUsers(numUsers);
        const generatedPets = await MockingService.generateMockingPets(numPets);
        res.status(200).json({
            message: "datos generados correctamente",
            generated: {
                users: generatedUsers.length,
                pets: generatedPets.length,
            },
        });
    } catch (error) {
        console.error("error al generar datos:", error);
        res.status(500).json({ error: "Error al generar datos" });
    }
}; 

export default {getMockingPets, getMockingUsers, generateData}; 

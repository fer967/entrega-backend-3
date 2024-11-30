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
    const { users = 0, pets = 0 } = req.query;
    try {
        const numUsers = parseInt(users) || 0;
        const numPets = parseInt(pets) || 0;
        const generatedUsers = await MockingService.generateMockingUsers(numUsers);
        const generatedPets = await MockingService.generateMockingPets(numPets);
        res.status(200).json({
            message: "datos generados correctamente",
            generated: {                                     
                generatedUsers,
                generatedPets
            },
            // ver guardar en DB
        });
    } catch (error) {
        console.error("Error al generar los datos:", error);
        res.status(500).json({ error: "Error al generar los datos" });
    }
};

export default {getMockingPets, getMockingUsers, generateData}; 

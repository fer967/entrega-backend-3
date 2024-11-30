import {faker} from "@faker-js/faker";
import { createHash } from "../utils/index.js";

class MockingService{

    static async generateMockingPets(numPets){
        const pets = [];
        for(let i = 0; i < numPets; i++){
            pets.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false
            })
        }
        return pets;
    }

    static async generateMockingUsers(numUsers){
        const users = [];
        for(let i = 0; i < numUsers; i++){
            users.push({
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            })
        }
        return users;
    }
}


export default MockingService;
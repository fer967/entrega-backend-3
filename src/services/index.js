import Users from "../dao/Users.dao.js";
import Pet from "../dao/Pets.dao.js";
import Adoption from "../dao/Adoption.js";

import UserRepository from "../repositories/UserRepository.js";
import PetRepository from "../repositories/PetRepository.js";
import AdoptionRepository from "../repositories/AdoptionRepository.js";

export const usersService = new UserRepository(new Users());
export const petsService = new PetRepository(new Pet());
export const adoptionsService = new AdoptionRepository(new Adoption());
import express from 'express'
import PetService from '../services/pets.service.js'

const petsRouter = new express.Router()

petsRouter.get("/pets", (req, res) => PetService.findAllPets(res))
petsRouter.get("/pets/:id", (req, res) => PetService.findOnePet(req, res))
petsRouter.post("/pets/new", (req, res) => PetService.createPet(req, res))
petsRouter.put("/pets/:id/edit", (req, res) => PetService.updatePet(req, res))
petsRouter.delete("/pets/:id/delete", (req, res) => PetService.deletePet(req, res))

export default petsRouter


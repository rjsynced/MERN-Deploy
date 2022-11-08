import Pet from "../models/Pet.js"

class PetService {
    static findAllPets = async (res) => {
        try {
            return res.status(200).json(await Pet.find())
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    static findOnePet = async (req, res) => {
        try {
            return res.status(200).json(await Pet.findOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static createPet = async (req, res) => {
        try {
            return res.status(201).json(await Pet.create(req.body))
        } catch (err) {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }

    static updatePet = async (req, res) => {
        try {
            const pet = await Pet.findOneAndUpdate({ _id: req.params.id }, {new: true, runValidators: [true, "{PATH} is required"]});
            pet.name = req.body.name
            pet.type = req.body.type
            pet.description = req.body.description
            pet.skill1 = req.body.skill1
            pet.skill2 = req.body.skill2
            pet.skill3 = req.body.skill3
            return res.status(200).json(await pet.save())
        } catch (err) {
            return res.status(422).json({ message: "Something went wrong", error: err })
        }
    }
    
    static likePet = async (req, res) => {
        try {
            return res.status(200).json(await Pet.findOneAndUpdate(
                { _id: req.params.id }
            ))} catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }

    static deletePet = async (req, res) => {
        try {
            return res.status(200).json(await Pet.deleteOne({ _id: req.params.id }))
        } catch (err) {
            return res.status(404).json({ message: "Something went wrong", error: err })
        }
    }
}

export default PetService

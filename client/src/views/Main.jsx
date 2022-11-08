import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import PetList from '../components/PetList';

const Main = () => {
    const [pets, setPets] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/pets')
            .then(res => {
                setPets(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    }, [pets]);

    const removeFromDom = (petId) => {
        setPets(pets.filter((pet) => pet._id != petId));
    };

    const createPet = (pet) => {
        axios
            .post('http://127.0.0.1:8000/api/pets', pet)
            .then(
                console.log(pet),
                setPets(pets => [...pets, pet]),
                setLoaded(false)
            )
            .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <div className='header'>
            <h1>Pet Shelter</h1>
            <Link className='btn btn-primary' to="pets/new">add a pet to the shelter</Link>
            </div>
            {loaded && <PetList pets={pets} removeFromDom={removeFromDom}/>}
            
        </div>
    )
}

export default Main;
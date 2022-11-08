import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PetForm from '../components/PetForm'
const NewPet = () => {

    const [errors, setErrors] = useState([]);

    return (
        <div className='container'>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <Link to="/">Home</Link>
            </div>
            <h4>Know a pet needing a home?</h4>
            {errors.map((error, index) => ( <p key={index}>{error}</p>))}
            <PetForm serverErrors={errors}/>
        </div>
    )
}

export default NewPet
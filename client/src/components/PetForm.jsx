import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
    name: "",
    type: "",
    description: "",
    skill1: "",
    skill2: "",
    skill3: ""
}

const PetForm = (props) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState(initialState)
    const [serverErrors, setServerErrors] = useState(initialState)
    const [isValid, setIsValid] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/pets/${id}`)
                .then(res => setValues(res.data))
                .catch(err => console.log(err))
        }
    }, [id])
    const handleCancel = () => {
        navigate('/')
    }

    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            setValues({ ...values, [e.target.name]: e.target.checked })
        } else {
            setValues({ ...values, [e.target.name]: e.target.value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!id) {
            axios.post('http://localhost:8000/api/pets/new',
                values
            )
                .then(res => {
                    setServerErrors(initialState)
                    setValues(initialState)
                    setErrors(initialState)
                    navigate('/')
                })
                .catch(err => {
                    console.log('hello')
                    const errorResponse = err.response.data.error.errors
                    console.log(errorResponse)
                    
                    const errorArr = []
                    for (const key in errorResponse) {
                        errorArr.push(errorResponse[key].message)
                    }
                    console.log(errorArr)
                setServerErrors(errorArr)
                console.log(serverErrors);
                })
        }
        else if (id) {
            console.log('running');
            axios.put(`http://localhost:8000/api/pets/${id}/edit`,
                values
            )
                .then(res => {
                    console.log('hello response');
                    setServerErrors(initialState)
                    setValues(initialState)
                    setErrors(initialState)
                    navigate('/')
                })
                .catch(err => {
                    console.log('hello error');
                    console.log(err);
                    const errorResponse = err.response.data.error.errors

                const errorArr = []
                console.log(errorArr)
                for (const key in errorResponse) {
                    errorArr.push(errorResponse[key].message)
                }
                setServerErrors(errorArr)
                console.log(errorArr);
                })
        }
    }
    const handleValidation = (e) => {
        let isValidSubmission = true
        const fieldName = e.target.name
        const value = e.target.value
        if (fieldName === 'name') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Name is required!" });
                isValidSubmission = false
            } else if (value.length < 2) {
                setErrors({ ...errors, [fieldName]: "Name must be 2 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        setIsValid(isValidSubmission)
        if (fieldName === 'type') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Pet type is required!" });
                isValidSubmission = false
            } else if (value.length < 2) {
                setErrors({ ...errors, [fieldName]: "Pet type must be 2 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
        if (fieldName === 'description') {
            if (value.length < 1) {
                setErrors({ ...errors, [fieldName]: "Description is required!" });
                isValidSubmission = false
            } else if (value.length < 5) {
                setErrors({ ...errors, [fieldName]: "Description must be 5 characters or longer!" });
                isValidSubmission = false
            } else {
                setErrors({ ...errors, [fieldName]: "" });
            }
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Pet Name: </label>
                    <input className='form-control' name='name' type="text" value={values.name} onChange={handleChange} onBlur={handleValidation} />
                    {/* {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>} */}
                    {serverErrors[0] && <p style={{ color: 'green' }}>{serverErrors[0]}</p>}
                </div>
                <div>
                    <label htmlFor='type'>Pet Type: </label>
                    <input className='form-control' name='type' type="text" value={values.type} onChange={handleChange} onBlur={handleValidation} />
                    {/* {errors.type && <p style={{ color: 'red' }}>{errors.type}</p>} */}
                    {serverErrors[1] && <p style={{ color: 'green' }}>{serverErrors[1]}</p>}
                </div>
                <div>
                    <label htmlFor='description'>Description: </label>
                    <input className='form-control' name='description' type="text" value={values.description} onChange={handleChange} onBlur={handleValidation} />
                    {/* {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>} */}
                    {serverErrors[2] && <p style={{ color: 'green' }}>{serverErrors[2]}</p>}
                </div>
                <h3> Skills (optional) </h3>
                <div>
                    <label htmlFor='skill1'>Skill 1: </label>
                    <input className='form-control' name='skill1' type="text" value={values.skill1} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='skill2'>Skill 2: </label>
                    <input className='form-control' name='skill2' type="text" value={values.skill2} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='skill3'>Skill 3: </label>
                    <input className='form-control' name='skill3' type="text" value={values.skill3} onChange={handleChange} />
                </div>
                <button className='btn btn-success'>Submit Form</button>
            </form>
            <button className='btn btn-danger' onClick={() => handleCancel()}>Cancel</button>
        </div>
    )
}

export default PetForm
import React, { useEffect, useState } from 'react';
import { typeOptions } from '../../utils/utilities';
import { useDispatch } from 'react-redux';
import { ADD_FIELDS } from '../../redux/actions/action';
import "./FormGenerator.css"

function FormGenerator() {

    const [isValidationCheck, setIsValitionCheck] = useState(false)
    const [selectedFormData, setSelectedFormData] = useState({
        name: "",
        type: "",
        options: [],
        required: false,
        min: "",
        max: "",
        maxLength: "",
        pattern: ""
    })
    const dispatch = useDispatch()

    const handleChange = (event) => {
        setSelectedFormData((prev) => {
            if (event.target.id === "options") {
                const optionArray = event.target.value.split(",")
                const newTrimArray = optionArray.map((option) => option.trim())
                return { ...prev, [event.target.id]: newTrimArray }
            }
            return { ...prev, [event.target.id]: event.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("seleted", selectedFormData)
        dispatch(ADD_FIELDS(selectedFormData))
        setSelectedFormData({
            name: "",
            type: "",
            options: [],
            required: false,
            minLength: "",
            maxLength: "",
            pattern: ""
        })
        setIsValitionCheck(false)
    }

    return (
        <div className='form_component'>
            <h2 style={{ marginBottom: "10px" }}>Generate Form</h2>
            <form onSubmit={handleSubmit} className='form_generator'>
                <label htmlFor="name">Name:</label>
                <input type="text" id='name' required autoComplete='off' onChange={(e) => handleChange(e)} value={selectedFormData.name} />
                <label htmlFor="type">Type:</label>
                <select name="type" id="type" onChange={(e) => handleChange(e)} value={selectedFormData.options}>
                    <option value="">Select Type</option>
                    {

                        typeOptions.map((option) => {
                            return <option value={option.toLowerCase()}>{option}</option>
                        })
                    }
                </select>
                {
                    ["select", "radio"].includes(selectedFormData.type) && (
                        <>
                            <label htmlFor="options">Options:</label>
                            <input type="text" id='options' placeholder='Enter options seperated by ,'
                                onChange={(e) => handleChange(e)} value={selectedFormData.options}
                            />
                        </>
                    )
                }
                <div >
                    <input type="checkbox" id='validation' checked={isValidationCheck} onClick={() => setIsValitionCheck(!isValidationCheck)} />
                    <label htmlFor="validation" style={{ marginLeft: "15px" }}>Show Validation</label>
                </div>


                {isValidationCheck &&
                    <div className='validation_box'>
                        <div>
                            <input type="checkbox" id='required'
                                onClick={() => setSelectedFormData((prev) => ({ ...prev, required: !selectedFormData.required }))}
                                value={selectedFormData.required}
                            />


                            <label htmlFor="required" style={{ marginLeft: "15px" }}>Required</label>
                        </div>
                        <label htmlFor="minLength">MinLength</label>
                        <input type="number" id="minLength" onChange={(e) => handleChange(e)} value={selectedFormData.minLength} />
                        <label htmlFor="maxLength">MaxLength</label>
                        <input type="number" id="maxLength" onChange={(e) => handleChange(e)} value={selectedFormData.maxLength} />
                        <label htmlFor="pattern">Pattern</label>
                        <input type="text" id="pattern" onChange={(e) => handleChange(e)} value={selectedFormData.pattern} />
                    </div>
                }

                <button type='submit' className='form_btn'>Generate Form</button>

            </form>
        </div>
    )
}

export default FormGenerator
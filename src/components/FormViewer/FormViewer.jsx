import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_FIELDS } from '../../redux/actions/action';
import "./FormViewer.css"

function FormViewer() {

    const inputFields = useSelector(state => state.fields)
    const [error, setError] = useState({})
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setError({})
        const newObj = formData
        console.log("newObj", newObj)
        for (let i in newObj) {
            newObj[i] = ""
        }
        setFormData(newObj)
    }

    const handleInputChange = (field, value) => {
        setError(prev => {
            return {
                ...prev,
                [field.name]: ""
            }
        })
        setFormData((prevData) => ({
            ...prevData,
            [field.name]: value,
        }));
    };

    const validateInput = (field, value) => {

        if (field.required && !value) {
            setError(prev => {
                return {
                    ...prev,
                    [field.name]: `${field.name} is required.`
                }
            })
        }

        else if (field.type === "text" || field.type === "textarea") {
            if (field.minLength > value.length) {
                setError(prev => {
                    return {
                        ...prev,
                        [field.name]: `${field.name} must be more than ${field.minLength - 1} character.`
                    }
                })
                return
            }
            if (value.length > field.maxLength && field.maxLength) {
                setError(prev => {
                    return {
                        ...prev,
                        [field.name]: `${field.name} must be less than ${field.maxLength} character.`
                    }
                })
                return
            }
        }

        else if (field.type === "email") {
            const regex = field.pattern ? field.pattern : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(value)) {
                setError(prev => {
                    return {
                        ...prev,
                        [field.name]: `Invalid Email`
                    }
                })
                return;
            }
        }

        else if (field.type === "tel") {
            const regex = field.pattern ? field.pattern : /^(\+\d{1,2}\s?)?(\(\d{1,4}\))?[0-9\-.\s]{7,14}$/;
            if (!regex.test(value)) {
                setError(prev => {
                    return {
                        ...prev,
                        [field.name]: `Please provide a valid number`
                    }
                })
                return;
            }
        }

        console.log(field.minLength, value.length)

        return null;
    };


    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                setSubmitted(false)
            }, 2500)
        }
    }, [submitted])


    return (
        <div className='formViewer_component'>
            <form onSubmit={handleSubmit} className='formViewer_container'>
                <div className='formViewer_grid'>
                    {
                        inputFields.map((field) => {

                            switch (field.type) {

                                case "text": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>{field.name}</label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>
                                        <input type={field.type} required={field.required || field.minLength ? true : false}
                                            min={field.min ? field.min.toString() : undefined}
                                            max={field.max ? field.max.toString() : undefined}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            onBlur={(e) => validateInput(field, e.target.value)}
                                            value={formData[field.name]}

                                        />
                                        {error[field.name] && <span style={{ color: "red", fontSize: "12px" }}>{error[field.name]}</span>}

                                    </div>
                                )
                                case "textarea": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>{field.name}</label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>

                                        <textarea required={field.required || field.minLength ? true : false}
                                            min={field.min ? field.min.toString() : undefined}
                                            max={field.max ? field.max.toString() : undefined}
                                            value={formData[field.name]}
                                        />
                                        {error[field.name] && <span style={{ color: "red", fontSize: "12px" }}>{error[field.name]}</span>}
                                    </div>
                                )
                                case "select": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>{field.name}</label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>

                                        <select name={field.name} id=""
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            required={field.required}
                                            value={formData[field.name]}
                                        >
                                            <option value="">Select Option</option>
                                            {
                                                field.options && field.options.map((option) => {
                                                    return <option value={option}>{option}</option>
                                                })
                                            }
                                        </select>

                                    </div>
                                )
                                case "radio": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>{field.name}:</label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>
                                        <div style={{ display: "flex", gap: "20px" }}>
                                            {field.options && field.options.map((option, index) => (
                                                <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                                                    <input
                                                        type="radio"
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        id={option}
                                                        required={field.required}
                                                    />
                                                    <label style={{ fontWeight: "normal" }} htmlFor={option}>{option}</label>
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                )
                                case "checkbox": return (
                                    <div className='field_grid_items'>
                                        <input type="checkbox" id={field.name} required={field.required}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                        />
                                        <label htmlFor={field.name}>{field.name}</label>
                                        <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                    </div>
                                )

                                case "email": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>Email: </label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>
                                        <input type="email" required={field.required}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            onBlur={(e) => validateInput(field, e.target.value)}
                                            value={formData[field.name]}
                                        />
                                        {error[field.name] && <span style={{ color: "red", fontSize: "12px" }}>{error[field.name]}</span>}

                                    </div>
                                )

                                case "tel": return (
                                    <div className='field_grid_items'>
                                        <div className='grid_box'>
                                            <label htmlFor={field.name}>Phone:</label>
                                            <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                        </div>
                                        <input type="tel" required={field.required}
                                            onBlur={(e) => validateInput(field, e.target.value)}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            value={formData[field.name]}
                                        />
                                        {error[field.name] && <span style={{ color: "red", fontSize: "12px" }}>{error[field.name]}</span>}
                                        <button className='item_btn' onClick={() => dispatch(REMOVE_FIELDS(field.id))}>Remove</button>
                                    </div>
                                )
                            }
                        })

                    }
                </div>
                {inputFields.length > 0 && <button className='form_btn viewer_btn' type='submit' >Submit</button>}

            </form>

            {submitted && <div style={{textAlign:"center", color: "green"}}>Form Submitted Successfully</div>}
        </div>
    )
}

export default FormViewer
'use client'
import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            await axios.post('https://gwebvydn88.execute-api.ap-south-1.amazonaws.com/dev/api/user/contactus',formData)
            toast.success('Form submitted successfully!', { position: 'top-center' });
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                subject: '',
                message: '',
            });
        } else {
            setErrors(formErrors);
            toast.error('Please fill out all required fields and correct the errors.', { position: 'top-center' });
        }
    };

    const validateForm = () => {
        const formErrors = {};


        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (!formData[key]) {
                    formErrors[key] = 'This field is required.';
                }
            }
        }

        if (formData.phone && formData.phone.length !== 10) {
            formErrors.phone = 'Please provide a valid 10-digit mobile number.';
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            formErrors.email = 'Please enter a valid email address.';
        }

        return formErrors;
    };

    return (

        <div className="px-4 sm:px-6 lg:px-8 font-roboto">
            <ToastContainer />
            <section className="py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="px-4 md:px-0">
                        <h2 className="font-semibold text-3xl md:text-5xl mb-4">
                            Lets Discuss <br />
                            Your Next Project
                        </h2>
                        <p className="mb-4">
                            Fill out the form, or call us to set up a free in-home consultation.
                        </p>
                        <div>
                            <h3 className="text-blue-500 font-semibold">Service Areas:</h3>
                            <p className="mt-2">
                            Delhi NCR, Bengaluru, Kolkata,
                            </p>
                            <p className="mt-4">
                            Patna, Amritsar, Chandigarh, Meerut
                            </p>
                            <p className="mt-8">care@prodyme.in</p>
                        </div>
                    </div>
                    <div>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="form-label block">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.firstName ? 'border-red-500' : ''
                                            }focus:outline-none`}
                                            
                                    />
                                    {errors.firstName && <span className="text-red-500">{errors.firstName}</span>}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="form-label block">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.lastName ? 'border-red-500' : ''
                                            }focus:outline-none`}
                                    />
                                    {errors.lastName && <span className="text-red-500">{errors.lastName}</span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label block">Email</label>
                                <input type="email" name="email" value={formData.email}
                                    onChange={handleInputChange} className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.email ? 'border-red-500' : ''
                                        }focus:outline-none`} />
                                {errors.email && <span className="text-red-500">{errors.email}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="form-label block">Phone</label>
                                <input type="number" name="phone" value={formData.phone}
                                    onChange={handleInputChange} className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.phone ? 'border-red-500' : ''
                                        }focus:outline-none`} />
                                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="form-label block">Address</label>
                                <input name="address" rows="3" value={formData.address}
                                    onChange={handleInputChange} className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.address ? 'border-red-500' : ''
                                        }focus:outline-none`} />
                                {errors.address && <span className="text-red-500">{errors.address}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subject" className="form-label block">Subject</label>
                                <input type="text" name="subject" value={formData.subject}
                                    onChange={handleInputChange} className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.subject ? 'border-red-500' : ''
                                        }focus:outline-none`} />
                                {errors.subject && <span className="text-red-500">{errors.subject}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="form-label block">Message</label>
                                <textarea name="message" rows="6" value={formData.message}
                                    onChange={handleInputChange} className={`form-control border-b border-black border-solid border-2 border-opacity-100 border-t-0 border-r-0 border-l-0 block w-full ${errors.message ? 'border-red-500' : ''
                                        }focus:outline-none`} />
                                {errors.message && <span className="text-red-500">{errors.message}</span>}
                            </div>
                            <button type="submit" className="bg-black text-white text-center w-full py-2">Submit</button>
                        </form>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact
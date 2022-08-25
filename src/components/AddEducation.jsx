import React, { useEffect, useState } from "react";
import axios from 'axios'
import alertify from 'alertifyjs';
import { Formik } from 'formik';

const AddEducation = () => {
    const [programs, setPrograms] = useState();

    useEffect(() => {

        axios.get('https://localhost:7182/api/EducationProgram/programs')
            .then(res => {
                var list = res.data.map(item => {
                    return { id: item.id, name: item.programName }
                })
                const options = []
                list.forEach(item => {
                    options.push(<option value={item.id} key={item.id}>{item.name}</option>)
                })
                setPrograms(options)
            })
            .catch(err => {
                alertify.error(err.message)
            })

    }, [])

    return (
        <div className="row mt-5">
            <h1>Add Education</h1>
            <Formik
                initialValues={{ educationname: '', link: '', educationprogramid: 1 }}
                validate={values => {
                    const errors = {};
                    if (!values.educationname) {
                        errors.educationname = 'Required';
                    }
                   
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    
                    axios.post('https://localhost:7182/api/Education/add', values)
                        .then(res => {
                            setSubmitting(false);
                            alertify.success(res.data)
                        })
                        .catch(err => {
                            alertify.error(err.message)
                        })
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="educationName">Education Name</label>
                            <input type="text" name="educationname" className="form-control" id="educationName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.educationname}
                            />
                            {errors.educationname && touched.educationname &&errors.educationname}
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">Education Link</label>
                            <input type="text" name="link" className="form-control" id="link"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.link}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="program">Education Program</label>
                            <select className="form-select" name="educationprogramid" onChange={handleChange} onBlur={handleBlur} value={values.educationprogramid} aria-label="program">
                                {programs}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default AddEducation;

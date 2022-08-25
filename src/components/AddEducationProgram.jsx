import React, { useEffect, useState } from "react";
import axios from 'axios'
import alertify from 'alertifyjs';
import { Formik,useField, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";

const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
            var date=`${val.getFullYear()}-${("0" + (val.getMonth() + 1)).slice(-2)}-${("0" + (val.getDate())).slice(-2)}T${("0" + (val.getHours())).slice(-2)}:${("0" + (val.getMinutes())).slice(-2)}:${("0" + (val.getSeconds())).slice(-2)}`
          setFieldValue(field.name, date);
        }}
      />
    );
  };

const AddEducationProgram = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    const statuses=[]
    statuses.push(<option value='Yayınlandı' key="1">Yayınlandı</option>)
    statuses.push(<option value='Yayınlanmadı' key="2">Yayınlanmadı</option>)
 


    return (
        <div className="row mt-5">
            <h1>Add Education Program</h1>
            <Formik
                initialValues={{ programname: '', startdatetime: startDate, enddatetime: endDate, status: 'Yayınlandı' }}
                validate={values => {
                    const errors = {};
                    if (!values.programname) {
                        errors.programname = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {

                    axios.post('https://localhost:7182/api/EducationProgram/add', values)
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
                    setFieldValue
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="programname">Program Name</label>
                            <input type="text" name="programname" className="form-control" id="programname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.programname}
                            />
                            {errors.programname && touched.programname && errors.programname}
                        </div>
                        <div className="form-group">
                            <label htmlFor="startdatetime">Start Date</label>
                            <DatePickerField 
                                name="startdatetime"
                                showTimeSelect
                                timeFormat="HH:mm:ss"
                                timeIntervals={5}
                                timeCaption="time"
                                dateFormat="dd.MM.yyyy hh:mm:ss"
                            />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="enddatetime">End Date</label>
                            <DatePickerField 
                                name="enddatetime"
                                showTimeSelect
                                timeFormat="HH:mm:ss"
                                timeIntervals={5}
                                timeCaption="time"
                                dateFormat="dd.MM.yyyy hh:mm:ss"
                            />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select className="form-select" name="status" onChange={handleChange} onBlur={handleBlur} value={values.status} aria-label="program">
                                {statuses}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default AddEducationProgram;
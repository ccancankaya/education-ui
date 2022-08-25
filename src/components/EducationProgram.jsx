import React, { useState, useEffect } from "react";
import axios from 'axios'
import alertify from 'alertifyjs';

const EducationProgram = () => {
    const [educationProgramList, setEducationProgramList] = useState();
    useEffect(() => {
        axios.get('https://localhost:5000/api/EducationProgram/programs')
            .then(res => {
                const dataList = []

                res.data.forEach(item => {
                    const educationList=item.educations.map(edu=>{
                    return <button className="list-group-item list-group-item-action">{edu.educationName}</button>
                })
                    dataList.push(<div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.programName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Start Date : {new Date(item.startDateTime).toLocaleString()}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">End Date : {new Date(item.endDateTime).toLocaleString()}</h6>
                                <p>Status : {item.status}</p>
                                <p>Educations</p>
                                <div className="list-group">
                                    {educationList}
                                </div>
                            </div>
                        </div>
                    </div>)
                })
                setEducationProgramList(dataList)
            })
            .catch(err => {
                alertify.error(err.mesaage)
            })
    }, [])

    return (

        <div className="row mt-5 education-programs">
            <h1>Education Program List</h1>
            {educationProgramList}
        </div>
    )
}

export default EducationProgram;
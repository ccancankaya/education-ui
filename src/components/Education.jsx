import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs';

const Education = () => {
    const [educationList, setEducationList] = useState();

    useEffect(()=>{
        axios.get('https://localhost:7182/api/Education/educations')
        .then(res=>{
            const dataList=[]
            
            res.data.forEach(item=>{
                dataList.push(<div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{item.educationName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">You can reach the link below</h6>
                        <a href={item.link} className="card-link">Go to course</a>
                    </div>
                </div>
            </div>)
            })
            setEducationList(dataList)
        })
        .catch(err=>{
            alertify.error(err.message);
        })
    },[])

    return (
        <div className="row mt-5 educations">
            <h1 className='mb-5'>Education List</h1>            
           {educationList}
        </div>
    )
}

export default Education
import React, { useState } from 'react'

export default function Student(props) {
    
    const [loading, setloading] = useState(true)


    return (
            <div className="m-2">
                            <div className="d-flex mb-4">
                                <img
                                    className = {loading==false ? "border border-white p-2 mt-1": "d-none"}
                                    src={props.data.avatar}
                                    height={150}
                                    width={150}
                                    onLoad = {() => {setloading(false)}}
                                />

                                { /* loading img */ }
                                <div className={loading==true ? "border border-white p-5":"d-none"}>
                                    <div class="spinner-grow text-warning" role="status">
                                    <span class="visually-hidden"></span>
                                    </div>
                                </div>

                                <div className="d-flex flex-column ">
                                    
                                   
                                    <button className="mz-1 btn btn-info m-1"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => props.handle_MoreInfo_FromList(props.data)}
                                    >

                                        <i className="fas fa-eye" />
                                    </button>
                                    
                                    <button onClick={() => props.handleEditFromList(props.data)} className="mz-1 btn btn-warning m-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button onClick={()=> props.handleDeleteFromList(props.data.id)} className="mz-1 btn btn-danger m-1">
                                            <i className="fas fa-trash" />
                                    </button>
                                </div>
                    </div>
                    <p className="text-center text-white fullname"> {props.data.nom} {props.data.pren} </p>
            </div>
        
    )
}

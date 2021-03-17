import React from 'react'

export default function modalshared(props) {
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">

                    <h5 className="modal-title" 
                        id="exampleModalLabel"> Student Card of {props.data.nom}
                        {props.data.isPresence == true ? 
                        <span className="badge bg-success text-white"> is present </span> : 
                        <span className="badge bg-danger text-white"> is absent </span>}
                    </h5>

                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="card mb-3" style={{maxWidth: 540}}>



                        {/* Student card */}
                            <div className="row g-0">
                            <div className="col-md-4">
                                <img src={props.data.avatar} height="150" width="150" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item"><span className="badge bg-warning"> Nom </span> {props.data.nom}</li>
                                    <li className="list-group-item"><span className="badge bg-success"> Prénom </span> {props.data.pren}</li>
                                    <li className="list-group-item"><span className="badge bg-primary"> Email </span> {props.data.email}</li>
                                </ul>
                                </div>
                            </div>
                            </div>

                    </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className={props.data.isPresence==false ? "btn btn-success":"d-none"} data-dismiss="modal" onClick={props.handleSetPresence}>Present <i class="fas fa-pen-nib"></i></button>
                    <button type="button" className={props.data.isPresence==true ? "btn btn-danger":"d-none"} data-dismiss="modal" onClick={props.handleSetPresence}> Absent <i class="fas fa-pen-nib"></i></button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'

export default function NewStudent(props) {
    return (
        <div className="col-4 border p-5">
                    <div className="avatar border mx-auto mt-5 " 
                        style={{background:`url(${props.avatar || 'http://i.stack.imgur.com/l60Hf.png'})`}}
                    />
                    <form onSubmit={props.handleSubmit} autoComplete="off">
                        <div className="mb-4 mt-4 w-70 mx-auto">
                            <input
                                onChange={props.handleChange}
                                placeholder="Firstname"
                                type="text"
                                className="form-control"
                                name="nom"
                            />
                        </div>
                        <div className="mb-4 mt-4 w-70 mx-auto">
                            <input
                                onChange={props.handleChange}
                                placeholder="Lastname"
                                type="text"
                                className="form-control"
                                name="pren"
                            />
                        </div>
                        <div className="mb-4 mt-4 w-70 mx-auto">
                            <input
                                onChange={props.handleChange}
                                placeholder="Email address"
                                type="email"
                                className="form-control"
                                name="email"
                            />
                        </div>
                        <div className="mb-4 mt-4 w-70 mx-auto">
                            <input
                                onChange={props.handleChange}
                                placeholder="Url Avatar"
                                type="text"
                                className="form-control"
                                name="avatar"
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                Add Student <i className="fas fa-plus-circle" />
                            </button>
                        </div>
                    </form>
                </div>
    )
}


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TableRow from "./TableRow"
import { Table } from 'react-bootstrap';
import { Card, Button, Form, Container } from 'react-bootstrap';
import { getAllDiscussionPosts, eletePost, getAllDiscussionComments } from "../util/user"

import { AuthContext } from "../service/authentication";


export default function RequestPage() {

    const [requests, setRequests] = useState(
        [
            { id: 1, value: "Alabama", somethig: "xsncmns" },
            { id: 2, value: "Georgia", somethig: "xsncmns" },
            { id: 3, value: "Tennessee", somethig: "xsncmns" }
        ]
    )
    const authContext = useContext(AuthContext);

    console.log(requests)
    useEffect(() => {
        getrequestsData()

    }, [requests])

    const getrequestsData = async () => {
        const response = await getAllDiscussionPosts();
        console.log(response.data);
        if (response.data) {
            setRequests(response.data)
        }
    }

    const tabRow = () => {

        requests.map((object, i) => {
            // console.log(object, "dss")
            return (<TableRow obj={object}
                // getrequestsData={getrequestsData}
                key={i} />);

        }
        )

    }

    // if (!state.isAuthenticated) {
    //     return <Redirect to="/" />;
    // } else if (state.isAuthenticated) {

    return (
        <div>
            <Container className="mainBox">

                <div className="row justify-content-center"></div>
                {/* <div className="container">
            <div className="row"> */}

                <section className="content">
                    <h1>Requests</h1>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="pull-right">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-success btn-filter" data-target="pagado">Approve</button>
                                        <button type="button" className="btn btn-warning btn-filter" data-target="pendiente">Pending</button>
                                        <button type="button" className="btn btn-danger btn-filter" data-target="cancelado">Cancel</button>
                                        {/* <button type="button" className="btn btn-default btn-filter" data-target="all">Todos</button> */}
                                    </div>
                                </div>
                                <div className="table-container">

                                    <table className="table table-filter">

                                        <tbody >
                                            {requests.map((req, i) => {
                                                return (
                                                    <tr data-status="pagado" key={i} >
                                                        <td>
                                                            <div className="ckbox">
                                                                <input type="checkbox" id="checkbox1" />
                                                                <label for="checkbox1"></label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <a href="javascript:;" className="star">
                                                                <i className="glyphicon glyphicon-star"></i>
                                                            </a>
                                                        </td>
                                                        <td>

                                                            <div className="media" >
                                                                {/* <a href="#" className="pull-left">
                                                                <img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" className="media-photo" />
                                                            </a> */}
                                                                <div className="media-body">

                                                                    <h4 className="title">
                                                                        {req.username}
                                                                        <span className="pull-right pagado">(Approved)</span>
                                                                    </h4>
                                                                    <p className="summary">{req.query}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </Container>
        </div>






    );
}

// }
 // <div classNameName="app">
        //     <Table striped bordered hover>
        //         <thead>
        //             <tr>
        //                 <th>#</th>
        //                 <th>First Name</th>
        //                 <th>Last Name</th>
        //                 <th>Username</th>
        //                 <th>Request</th>
        //                 {authContext?.state?.user?.role === "admin" && (<th>Action</th>)}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr>
        //                 <td>1</td>
        //                 <td>Mark</td>
        //                 <td>Otto</td>
        //                 <td>@mdo</td>
        //                 <td>invalid</td>
        //                 <td>
        //                     {authContext?.state?.user?.role === "admin" && (
        //                         <Button variant="primary">Approve</Button>
        //                     )}
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>2</td>
        //                 <td>Jacob</td>
        //                 <td>Thornton</td>
        //                 <td>@fat</td>
        //                 <td>invalid</td>
        //                 {authContext?.state?.user?.role === "admin" && (
        //                 <Button variant="primary">Approve</Button>
        //                  )} 
        //             </tr>
        //             <tr>
        //                 <td>3</td>
        //                 <td >Larry the Bird</td>
        //                 <td>@fat</td>
        //                 <td>@fat</td>
        //                 <td>invalid</td>
        //                 {authContext?.state?.user?.role === "admin" && (
        //                 <Button variant="primary">Approve</Button>
        //                 )} 
        //             </tr>
        //         </tbody>
        //     </Table>
        // </div>
        // <div >
        //     <h3 align="center">Liste des billets</h3>
        //     <table classNameName="table table-striped" style={{ marginTop: 20 }}>
        //         <thead>
        //             <tr>
        //                 <th>Nom Prénom</th>
        //                 <th>Poste</th>
        //                 <th>Téléphone</th>
        //                 {/* <th colSpan="2">Action</th> */}
        //             </tr>
        //         </thead>
        //         <tbody>
                    // {tabRow}
        //         </tbody>
        //     </table>
        // </div>

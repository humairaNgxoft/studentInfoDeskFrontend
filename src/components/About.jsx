import React, {
  Fragment, useRef,
  useContext, useEffect, useState
} from 'react'

import {
  Button, Offcanvas, Container, Col, Row, Form, InputGroup,
  FormControl, Image, Card,
} from 'react-bootstrap'
import { Redirect } from "react-router-dom";

import { useHistory } from 'react-router-dom';

import { BASE_URL } from "../util/api";
import { AuthContext } from "../service/authentication";
import { getAllPosts, deletePost } from "../util/user"




export default function About() {


  const [selectedItem, setSelectedItem] = useState(0)



  const authContext = useContext(AuthContext);
  const { state } = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  let history = useHistory();

  const fetchPosts = async () => {
    const response = await getAllPosts();
    console.log(response.data);
    if (response.data) {
      setPostsData(response.data);
      // setSelectedItem(0)
    }
    console.log(postsData, "postData")
  };
  const displayPost = (id) => {
    // setShowForm(!showForm);
    history.push('/displayPosts/')

  }
  const addPost = (id) => {
    history.push('/addPost/')
  }
  const editPost = (id) => {
    // setShowForm(!showForm);
    history.push('/UpdatePost/' + id, { title: postsData.title, date: postsData.date })
  }
  const delPost = async (id, token) => {

    const response = await deletePost(id, token);
    console.log(response);
    if (response.data) {
      console.log("deletion sucessfull");
    } else {
      console.log("error");
    }
    window.location.reload();
    history.push('/')
  }
  // const getModal = (id) => {
  //   setShowModal({ showModal: id });
  //   setTitle(id.title)
  // }

  useEffect(() => {
    // if (authContext.state.isAuthenticated) {
    fetchPosts();

    // }
  }, [selectedItem]);


  // if (!state.isAuthenticated) {
  //   return <Redirect to="/" />;
  // } else if (state.isAuthenticated) {
    return (

      <div>

        <Container className="mainBox">
          <Row>
            <Col xs={{ span: 6, offset: 2 }}>
              <InputGroup className="mb-3">
                {/* <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text> */}
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </InputGroup>
            </Col>
            <Col xs={2}> <Button variant="primary" >
              Stuady now
            </Button>
            </Col>

          </Row>


          <Row>
            {console.log(postsData[selectedItem], postsData, selectedItem, "selected")}
            {/* {selectedItem >= 0 && ( */}
            <Col xs={4} className="imageBox">
              <Image className="book22" src={BASE_URL + "/" + postsData[selectedItem]?.image || "https://www.w3schools.com/howto/img_avatar.png"} />


            </Col>
            {/* ) */}
            {/* } */}
            <Col xs={8} >

              <Row>
                <Col xs={12} className="imageBox">
                  <Card.Title className="book22">{postsData[selectedItem]?.title}</Card.Title>
                </Col>
                <Col xs={12} className="imageBox">
                  <Card>
                    <Card.Body>

                      <Card.Text className="book">
                        {postsData[selectedItem]?.desc}
                      </Card.Text>
                      {authContext?.state?.user?.role === "admin" && (<>
                      <Button variant="primary"
                        onClick={() => addPost(postsData[selectedItem]?._id, authContext.state.token)}
                      >
                        Add Post</Button>
                      <Button variant="primary"
                        onClick={() => delPost(postsData[selectedItem]?._id, authContext.state.token)}
                      >Delete</Button>
                      <Button variant="primary"
                        onClick={() => editPost(postsData[selectedItem]?._id)}
                      >Edit</Button>
                      </>)}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Col>
          </Row>

          <Row>
            <Col>
              <h1>Top Blogs</h1>
            </Col>
          </Row>
          <Row>
            {postsData.map((item, i) => {
              return (<Col xs="4" key={i}>
                <Card className="cardbox" onClick={() => setSelectedItem(i)} >
                  <Card.Img className="carimg" variant="top" src={BASE_URL + "/" + item?.image || "https://www.w3schools.com/howto/img_avatar.png"} />
                  <Card.Body>
                    <Card.Title>{item?.title}</Card.Title>
                    {/* <Card.Text>
                      Rating
                    </Card.Text> */}

    

                  </Card.Body>
                </Card>
              </Col>
              )
            })}



            <Col className="AllbtnCol" xs="1">
              <Button className="AllButton" onClick={() => { displayPost() }} >
                All
              </Button>
            </Col>
          </Row>

        </Container>
      </div >

    )
  }
// }




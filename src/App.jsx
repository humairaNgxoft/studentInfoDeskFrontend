import React, { Fragment, useContext, useEffect, useState } from "react";
import "./App.scss";
import "./components/login/style.scss";
import { Switch, Route } from "react-router-dom";
import {
  Navbar, NavbarBrand, Container, Link, Nav, Button, Offcanvas, Col, Row, Form, InputGroup,
  FormControl, Image, Card
} from 'react-bootstrap'
import Authentication from "./components/login/Authentications";
import { AuthContext } from "./service/authentication";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/login/login";
import Register from "./components/login/register"
import SimpleForm from "./chatbot/chatbot"
import { Posts } from "./components/Posts";
import { DisplayPosts } from "./components/DisplayPosts"
import NewsFeed from "./components/About";
import { UpdatePost } from "./components/UpdatePost"
import { useHistory } from 'react-router-dom';
import { getAllPosts } from "./util/user"
import RequestPage from "./components/requestPage"
import TableRow from "./components/TableRow"
import Footer from "./components/Footer/footer";
import "./components/Footer/footer.scss"
import FormView from "./components/FormView"
import { MessageComments } from "./components/MessageComments"
import PasswordForgotten from "./components/login/forgetPassword"


function App() {
  const authContext = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  let history = useHistory();


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    if (user && token) {
      authContext.dispatch({
        type: authContext.ActionTypes.LOGIN,
        payload: {
          user,
          token,
        },
      });
    }
  }, []);
  const fetchPosts = async () => {
    const response = await getAllPosts();
    console.log(response.data);
    if (response.data) {
      setPostsData(response.data);
    }
  };



  useEffect(() => {
    // if (authContext.state.isAuthenticated) {
    fetchPosts();
    // }
  }, []);


  function handleLogout() {
    authContext.dispatch({
      type: authContext.ActionTypes.LOGOUT,
    });
    window.location.reload();
    history.push('/')
  }

  return (


    <div>



      <Fragment>

        {authContext.state.isAuthenticated && authContext?.state?.user?.role === "admin" && (
          // <Offcanvas className="ofcanvasBox" backdrop={false} show={show} onHide={handleClose}>
          //   <Offcanvas.Header className="OfcanvsBodyHeader">
          //     <Offcanvas.Title></Offcanvas.Title>
          //   </Offcanvas.Header>
          //   <Offcanvas.Body className="OfcanvsBody">

          //     <Button className="NavButton" variant="primary" href="/blogs">
          //       <img className="icnImage" src="https://img.icons8.com/ios/50/000000/home--v1.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" href="/addPost">
          //       <img className="icnImage" src="https://img.icons8.com/material-rounded/24/000000/pencil.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" href="/displayPosts">
          //       <img className="icnImage" src="https://img.icons8.com/ios/50/000000/image.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" href="/requests">
          //       <img className="icnImage" src="https://img.icons8.com/material-rounded/24/000000/list.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" href="/chatbot">
          //       <img className="icnImage" src="https://img.icons8.com/material-rounded/24/000000/chatbot.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" onClick={handleLogout}>
          //       <img className="icnImage" src=" https://img.icons8.com/material-rounded/24/000000/login.png" />
          //     </Button>
          //     <Button className="NavButton" variant="primary" href="/form">
          //       <img className="icnImage" src=" https://img.icons8.com/material-rounded/24/000000/list.png" />
          //     </Button>
          //   </Offcanvas.Body>

          // </Offcanvas>

          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Student Information System</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/addPost">Add Posts</Nav.Link>
                <Nav.Link href="/displayPosts">Display Posts</Nav.Link>
                <Nav.Link href="/chatbot">Chatbot</Nav.Link>
                {/* <Nav.Link href="/UpdatePost"></Nav.Link> */}
                {/* <Nav.Link href="/"></Nav.Link> */}
                <Nav.Link href="/blogs">News Feed</Nav.Link>
                <Nav.Link href="/requests">Requests</Nav.Link>
                <Nav.Link href="/reviews"> Detailed Comments </Nav.Link>
                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>


              </Nav>
            </Container>
          </Navbar>
        )}
        {authContext.state.isAuthenticated && authContext?.state?.user?.role === "user" && (
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Student Information System</Navbar.Brand>
              <Nav className="me-auto">

                <Nav.Link href="/displayPosts">Display Posts</Nav.Link>
                <Nav.Link href="/chatbot">Chatbot</Nav.Link>
                <Nav.Link href="/blogs">News Feed</Nav.Link>
                <Nav.Link href="/reviews"> Detailed Comments </Nav.Link>

                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>


              </Nav>
            </Container>
          </Navbar>)}


        {(authContext.state.isAuthenticated || !authContext.state.isAuthenticated) && (
          <Switch>
            <Route exact path="/">
              <Authentication />
            </Route>

            <Route exact path="/addPost">
              <Posts />
            </Route>
            <Route exact path="/displayPosts">
              <DisplayPosts data={postsData} />
            </Route>
          
            <Route exact path="/blogs">
              <NewsFeed data={postsData} />
            </Route>
            <Route exact path="/chatbot">
              < SimpleForm />
            </Route>
            <Route exact path="/forgetpass">
              < PasswordForgotten />
            </Route>
            <Route exact path="/requests" >
              <RequestPage />
            </Route>
            <Route exact path="/form" >
              <FormView />
            </Route>
            <Route exact path="/reviews" >
              <MessageComments />
            </Route>
            <Route exact path="/tableView"
              component={(props) =>

                < TableRow />

              }
            />
            <Route exact path="/UpdatePost/:id" component={(props) =>
              < UpdatePost
                id={props.match.params.id}
                title={props.location.state.title}
                date={props.location.state.date}
                desc={props.location.state.desc} />

            } />


            <Route>{() => <h1>404 | Not Found</h1>}</Route>
          </Switch>
        )
        }

      </Fragment>
      <Footer />



    </div >
  );



}


export default App;

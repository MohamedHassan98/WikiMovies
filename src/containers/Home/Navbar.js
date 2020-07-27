import React, { Component } from "react";
import "./Navbar.css";
import { connect } from "react-redux";
import {
  Container,
  Dropdown,
  Icon,
  Image,
  Menu,
  Form,
  Input,
  Modal,
  Button,
  DropdownItem,
} from "semantic-ui-react";
import MoviesLogo from "../../assets/MoviesLogo.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import DarkMode from "../DarkMode/DarkModeToggle";
class Navbar extends Component {
  state = {
    searchClicked: false,
    clickLogout: false,
    searchName: "",
  };

  searchClickedHandler = () => {
    this.setState({ searchClicked: true });
  };
  searchCancelClickedHandler = () => {
    this.setState({ searchClicked: false });
  };
  submitSearchHandler = (values) => {
    const newSearch = { search: values.searchName };
    this.props.history.push(`/search/${newSearch.search}`);
  };
  logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  clickLogoutHandler = () => {
    this.setState({ clickLogout: true });
  };
  clickCancelHandler = () => {
    this.setState({ clickLogout: false });
  };

  render() {
    let logoutModal = null;
    if (this.state.clickLogout) {
      logoutModal = (
        <Modal size="mini" open={this.state.clickLogout} dimmer="blurring">
          <Modal.Header>Sign Out</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p style={{ color: "darkgrey" }}>
                Are you sure you want to sign out?
              </p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={this.clickCancelHandler}>
              <Icon name="remove" /> No
            </Button>
            <Button onClick={this.logoutHandler} color="green">
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }
    const schema = Yup.object().shape({
      searchName: Yup.string().required(),
    });
    let searchBarIcon = (
      <Menu.Item onClick={this.searchClickedHandler} position="right">
        <Icon name="search" />
        Search
      </Menu.Item>
    );
    if (this.state.searchClicked) {
      searchBarIcon = (
        <Menu.Item onClick={this.searchCancelClickedHandler} position="right">
          <Icon name="delete" />
          Search
        </Menu.Item>
      );
    }

    let searchBar = null;
    if (this.state.searchClicked) {
      searchBar = (
        <Formik
          validationSchema={schema}
          onSubmit={(values) => this.submitSearchHandler(values)}
          initialValues={{
            searchName: "",
          }}
          render={({
            handleSubmit,
            handleChange,
            values,
            touched,
            isInvalid,
            handleBlur,
            errors,
          }) => (
            <Form
              style={{ position: "absolute", top: "59px", width: "100%" }}
              onSubmit={(event) => {
                handleSubmit(values);
              }}
            >
              <Form.Field>
                <div className="SearchBarDivInput">
                  <Input
                    className="SearchBarInput"
                    placeholder="Search for a movie, tv show, person..."
                    name="searchName"
                    value={values.searchName}
                    onChange={handleChange}
                    isInvalid={!!errors.searchName && !!touched.searchName}
                    onBlur={handleBlur}
                  />
                </div>
              </Form.Field>
            </Form>
          )}
        />
      );
    }
    return (
      <>
        {logoutModal}
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header>
              <a href="/home">
                <Image
                  size="mini"
                  src={MoviesLogo}
                  style={{ marginRight: "1.5em" }}
                />
              </a>
              <a href="/home"> WikiMovies </a>
            </Menu.Item>
            <Dropdown item text="Movies">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/movies">
                    Discover
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/popularmovies">
                    Popular
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/nowplayingmovies">
                    Now Playing
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/upcomingmovies">
                    Upcoming
                  </a>
                </Dropdown.Item>
                <DropdownItem>
                  <a style={{ color: "black" }} href="/topratedmovies">
                    Top Rated
                  </a>
                </DropdownItem>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text="TV Shows">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/tvshows">
                    Discover
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/populartvshows">
                    Popular
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/airingtodaytvshows">
                    Airing Today
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/ontheairtvshows">
                    On TV
                  </a>
                </Dropdown.Item>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/topratedtvshows">
                    Top Rated
                  </a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text="People">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <a style={{ color: "black" }} href="/person">
                    Popular People
                  </a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {searchBarIcon}
            <Menu.Item onClick={this.clickLogoutHandler} position="secondright">
              <Icon disabled name="sign-out" />
              Sign Out
            </Menu.Item>
            <Menu.Item>
              <DarkMode />
            </Menu.Item>
          </Container>
          {searchBar}
        </Menu>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.auth.token,
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));

import React, { Component } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import { slide as BurgerMenu } from "react-burger-menu";
import {
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
import { withRouter } from "react-router-dom";
import DarkMode from "../DarkMode/DarkModeToggle";
import "./Navbar.css";

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
  handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = this.state.searchName;
    this.props.history.push(`/search/${newSearch}`);
  };
  handleChange = (event) => {
    this.setState({ searchName: event.target.value });
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
    const { clickLogout, searchClicked, searchName } = this.state;
    let logoutModal = null;
    if (clickLogout) {
      logoutModal = (
        <Modal size="mini" open={clickLogout} dimmer="blurring">
          <Modal.Header>Sign Out</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p className="NavbarModalSignout">
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
    let searchBarIcon = (
      <Menu.Item
        className="BurgerMenu"
        onClick={this.searchClickedHandler}
        position="right"
      >
        <Icon name="search" />
        Search
      </Menu.Item>
    );
    if (searchClicked) {
      searchBarIcon = (
        <Menu.Item
          className="BurgerMenu"
          onClick={this.searchCancelClickedHandler}
          position="right"
        >
          <Icon name="delete" />
          Search
        </Menu.Item>
      );
    }

    let searchBar = null;
    if (searchClicked) {
      searchBar = (
        <Form
          className="NavbarFormStyle"
          onSubmit={searchName ? this.handleSubmit : null}
        >
          <Form.Field>
            <div className="SearchBarDivInput">
              <Input
                className="SearchBarInput"
                placeholder="Search for a movie, tv show, person..."
                name="searchName"
                onChange={this.handleChange}
              />
            </div>
          </Form.Field>
        </Form>
      );
    }
    return (
      <>
        <Media query={{ maxWidth: 950 }}>
          {(matches) =>
            matches ? (
              <BurgerMenu>
                <>
                  <Dropdown className="BurgerMenu" item text="Movies">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/movies">
                          Discover
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/popularmovies">
                          Popular
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/nowplayingmovies"
                        >
                          Now Playing
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/upcomingmovies"
                        >
                          Upcoming
                        </a>
                      </Dropdown.Item>
                      <DropdownItem>
                        <a
                          className="NavbarDropdownItem"
                          href="/topratedmovies"
                        >
                          Top Rated
                        </a>
                      </DropdownItem>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="BurgerMenu" item text="TV Shows">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/tvshows">
                          Discover
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/populartvshows"
                        >
                          Popular
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/airingtodaytvshows"
                        >
                          Airing Today
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/ontheairtvshows"
                        >
                          On TV
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/topratedtvshows"
                        >
                          Top Rated
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown className="BurgerMenu" item text="People">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/person">
                          Popular People
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {searchBarIcon}
                  <Menu.Item
                    className="BurgerMenu"
                    onClick={this.clickLogoutHandler}
                  >
                    <Icon disabled name="sign-out" />
                    Sign Out
                  </Menu.Item>
                  <Menu.Item>
                    <DarkMode />
                  </Menu.Item>
                </>
              </BurgerMenu>
            ) : null
          }
        </Media>
        {logoutModal}
        <Menu fixed="top" inverted>
          <Menu.Item header>
            <a href="/home">
              <Image
                size="mini"
                src={MoviesLogo}
                className="NavbarImageStyle"
              />
            </a>
            <a href="/home"> WikiMovies </a>
          </Menu.Item>
          <Media query={{ maxWidth: 950 }}>
            {(matches) =>
              matches ? null : (
                <>
                  <Dropdown item text="Movies">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/movies">
                          Discover
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/popularmovies">
                          Popular
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/nowplayingmovies"
                        >
                          Now Playing
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/upcomingmovies"
                        >
                          Upcoming
                        </a>
                      </Dropdown.Item>
                      <DropdownItem>
                        <a
                          className="NavbarDropdownItem"
                          href="/topratedmovies"
                        >
                          Top Rated
                        </a>
                      </DropdownItem>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown item text="TV Shows">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/tvshows">
                          Discover
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/populartvshows"
                        >
                          Popular
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/airingtodaytvshows"
                        >
                          Airing Today
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/ontheairtvshows"
                        >
                          On TV
                        </a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a
                          className="NavbarDropdownItem"
                          href="/topratedtvshows"
                        >
                          Top Rated
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown item text="People">
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <a className="NavbarDropdownItem" href="/person">
                          Popular People
                        </a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {searchBarIcon}
                  <Menu.Item onClick={this.clickLogoutHandler}>
                    <Icon disabled name="sign-out" />
                    Sign Out
                  </Menu.Item>
                  <Menu.Item>
                    <DarkMode />
                  </Menu.Item>
                </>
              )
            }
          </Media>
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

import { useState, Fragment } from "react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { APP_NAME } from "../config";
import { signout, isAuth } from "../actions/auth";

import "nprogress/nprogress.css";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: "pointer" }}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: "pointer" }}>Signup</NavLink>
                  </Link>
                </NavItem>
              </Fragment>
            )}
            {isAuth() && (
              <Fragment>
                <NavItem>
                  <Link href={isAuth().role === 0 ? "/user" : "/admin"}>
                    <NavLink style={{ cursor: "pointer" }}>Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    onClick={() => signout(() => Router.replace("/signin"))}
                  >
                    Signout
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import { Tabs, Tab } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import { SwipeableDrawer } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const e = React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
  return e;
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    //minHeight: "7em", // this ok too ?
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

const menuItems = [
  { name: "Services", link: "/services" },
  { name: "Custom Software Development", link: "/customsoftware" },
  { name: "Mobile Apps Development", link: "/mobileapps" },
  { name: "Websites Development", link: "/websites" },
];

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAlchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAlchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleMenuItemClick = (e, idx) => {
    setAlchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(idx);
  };

  const handleClose = () => {
    setAlchorEl(null);
    setOpenMenu(false);
  };

  console.log("re-render " + window.location.pathname);

  useEffect(() => {
    console.log("trigger useEffect " + value + " " + window.location.pathname);

    const pathname = window.location.pathname;
    if (pathname === "/" && value !== 0) {
      setValue(0);
    }
    if (
      (pathname === "/services" ||
        pathname === "/mobileapps" ||
        pathname === "/websites" ||
        pathname === "/customsoftware") &&
      value !== 1
    ) {
      setValue(1);

      if (pathname === "/services") {
        setSelectedIndex(0);
      }
      if (pathname === "/customsoftware") {
        setSelectedIndex(1);
      }
      if (pathname === "/mobileapps") {
        setSelectedIndex(2);
      }
      if (pathname === "/websites") {
        setSelectedIndex(3);
      }
    }
    if (pathname === "/revolution" && value !== 2) {
      setValue(2);
    }
    if (pathname === "/about" && value !== 3) {
      setValue(3);
    }
    if (pathname === "/contact" && value !== 4) {
      setValue(4);
    }
  }, [value]);

  const TabsComp = (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onMouseOver={(e) => {
            handleClick(e);
          }} // is it ok to just ={handleClick}
          className={classes.tab}
          component={Link}
          to="/services"
          label="Services"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/revolution"
          label="The Revolution"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/about"
          label="About Us"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/contact"
          label="Contact Us"
        />
      </Tabs>
      <Button variant="contained" color="secondary" className={classes.button}>
        Free Estimate
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuItems.map((option, idx) => (
          <MenuItem
            key={idx}
            onClick={(e) => {
              handleMenuItemClick(e, idx);
            }}
            selected={selectedIndex === idx && value === 1}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const DrawerComp = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        onOpen={() => {
          setOpenDrawer(true);
        }}
      >
        Example Drawer
      </SwipeableDrawer>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        disableRipple
      >
        {/* <MenuIcon /> */}
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {
                setValue(0);
              }}
            >
              <img className={classes.logo} alt="company logo" src={logo} />
            </Button>
            {matches ? DrawerComp : TabsComp}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;

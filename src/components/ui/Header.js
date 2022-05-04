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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
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
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

const menuItems = [
  { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
  {
    name: "Custom Software Development",
    link: "/customsoftware",
    activeIndex: 1,
    selectedIndex: 1,
  },
  {
    name: "iOS/Android Apps Development",
    link: "/mobileapps",
    activeIndex: 1,
    selectedIndex: 2,
  },
  {
    name: "Websites Development",
    link: "/websites",
    activeIndex: 1,
    selectedIndex: 3,
  },
];

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAlchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Services",
      link: "/services",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (e) => {
        handleClick(e);
      },
    },
    { name: "Revolution", link: "/revolution", activeIndex: 2 },
    { name: "About us", link: "/about", activeIndex: 3 },
    { name: "Contact us", link: "/contact", activeIndex: 4 },
    { name: "", link: "/estimate", activeIndex: 5 },
  ];

  const handleChange = (e, newValue) => {
    props.setValue(newValue);
  };

  const handleClick = (e) => {
    setAlchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleMenuItemClick = (e, idx) => {
    setAlchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(idx);
  };

  const handleClose = () => {
    setAlchorEl(null);
    setOpenMenu(false);
  };

  console.log("re-render " + window.location.pathname);

  useEffect(() => {
    console.log(
      "trigger useEffect " + props.value + " " + window.location.pathname
    );

    const pathname = window.location.pathname;
    [...menuItems, ...routes].forEach((route) => {
      if (pathname === route.link) {
        if (props.value !== route.activeIndex) {
          props.setValue(route.activeIndex);
          if (
            route.selectedIndex &&
            props.selectedIndex !== route.selectedIndex
          ) {
            props.setSelectedIndex(route.selectedIndex);
          }
        }
      }
    });
  }, [props.value, routes, props.selectedIndex, props]);

  const TabsComp = (
    <>
      <Tabs
        value={props.value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="primary"
      >
        {routes.map((route, idx) => {
          return (
            <Tab
              key={idx}
              aria-owns={route.ariaOwn}
              aria-haspopup={route.ariaPopup}
              onMouseOver={route.mouseOver}
              className={classes.tab}
              component={Link}
              to={route.link}
              label={route.name}
            />
          );
        })}
      </Tabs>
      <Button
        component={Link}
        to="/estimate"
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          props.setValue(5);
        }}
      >
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
        style={{ zIndex: 1302 }}
      >
        {menuItems.map((option, idx) => (
          <MenuItem
            key={idx}
            onClick={(e) => {
              handleMenuItemClick(e, idx);
            }}
            selected={props.selectedIndex === idx && props.value === 1}
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
        classes={{ paper: classes.drawer }}
        keepMounted
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map((route, idx) => {
            return (
              <ListItem
                key={idx}
                divider
                button
                component={Link}
                to={route.link}
                onClick={() => {
                  setOpenDrawer(false);
                  props.setValue(route.activeIndex);
                }}
                classes={{ selected: classes.drawerItemSelected }}
                selected={props.value === route.activeIndex}
              >
                <ListItemText disableTypography className={classes.drawerItem}>
                  {route.name}
                </ListItemText>
                {/*disableTypography? */}
              </ListItem>
            );
          })}

          <ListItem
            divider
            button
            component={Link}
            to="/estimate"
            onClick={() => {
              setOpenDrawer(false);
              props.setValue(5);
            }}
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected,
            }}
            selected={props.value === 5}
          >
            <ListItemText disableTypography className={classes.drawerItem}>
              Free estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {
                props.setValue(0);
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

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Nav} from 'react-bootstrap';

function NavBar() {

  return (
    <div className="NavBar">
        <AppBar position="static">
        <Tabs aria-label="simple tabs example">
          <Tab label="Product Catalog" href="/"></Tab>
          <Tab label="Price Calculator" href="/price-calculator"></Tab>
        </Tabs>
      </AppBar>
    </div>
  );
}

export default NavBar;
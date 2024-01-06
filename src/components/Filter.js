import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function NestedList() {
  const [priceOpen, setPriceOpen] = React.useState(false);
  const [propertyTypeOpen, setPropertyTypeOpen] = React.useState(false);
  const [numberOfRoomsOpen, setNumberOfRoomsOpen] = React.useState(false);

  const handlePriceClick = () => {
    setPriceOpen(!priceOpen);
  };

  const handlePropertyTypeClick = () => {
    setPropertyTypeOpen(!propertyTypeOpen);
  };

  const handleNumberOfRoomsClick = () => {
    setNumberOfRoomsOpen(!numberOfRoomsOpen);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Filter By
        </ListSubheader>
      }
    >
      {/* Removed Sent mail and Drafts sections */}
      <ListItemButton onClick={handlePriceClick}>
        <ListItemText primary="Price" />
        {priceOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={priceOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Under 5000 TL" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Under 10000 TL" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Under 15000 TL" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handlePropertyTypeClick}>
        <ListItemText primary="Property Type" />
        {propertyTypeOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={propertyTypeOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Apartment" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Villa" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Cottage" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleNumberOfRoomsClick}>
        <ListItemText primary="Number Of Rooms" />
        {numberOfRoomsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={numberOfRoomsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="2" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="3" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="4" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="5" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

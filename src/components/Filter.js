import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { cardData } from "../const/Const.js"; // Assuming you have the data here

export default function NestedList({ setFilteredProperties }) {
  const [priceOpen, setPriceOpen] = React.useState(false);
  const [propertyTypeOpen, setPropertyTypeOpen] = React.useState(false);
  const [numberOfRoomsOpen, setNumberOfRoomsOpen] = React.useState(false);

  const [selectedFilters, setSelectedFilters] = React.useState({
    price: null,
    propertyType: null,
    numberOfRooms: null,
  });

  const handlePriceClick = () => {
    setPriceOpen(!priceOpen);
  };

  const handlePropertyTypeClick = () => {
    setPropertyTypeOpen(!propertyTypeOpen);
  };

  const handleNumberOfRoomsClick = () => {
    setNumberOfRoomsOpen(!numberOfRoomsOpen);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters({ ...selectedFilters, [filterType]: value });
  };

  const handleResetFilters = () => {
    // Reset all filters
    setSelectedFilters({
      price: null,
      propertyType: null,
      numberOfRooms: null,
    });
  };

  React.useEffect(() => {
    // Apply filters to the properties based on the selected filters
    let filteredProperties = cardData;

    if (selectedFilters.price !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price <= selectedFilters.price
      );
    }

    if (selectedFilters.propertyType !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.propertyType === selectedFilters.propertyType
      );
    }

    if (selectedFilters.numberOfRooms !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.numberOfRooms === selectedFilters.numberOfRooms
      );
    }

    // Update the filtered properties state
    setFilteredProperties(filteredProperties);
  }, [selectedFilters, setFilteredProperties]);

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
      <ListItemButton onClick={handlePriceClick}>
        <ListItemText primary="Price" />
        {priceOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={priceOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("price", 5000)}
          >
            <ListItemText primary="Under 5000 TL" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("price", 10000)}
          >
            <ListItemText primary="Under 10000 TL" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("price", 15000)}
          >
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
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("propertyType", "Apartment")}
          >
            <ListItemText primary="Apartment" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("propertyType", "Villa")}
          >
            <ListItemText primary="Villa" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("propertyType", "Cottage")}
          >
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
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("numberOfRooms", 2)}
          >
            <ListItemText primary="2" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("numberOfRooms", 3)}
          >
            <ListItemText primary="3" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("numberOfRooms", 4)}
          >
            <ListItemText primary="4" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleFilterChange("numberOfRooms", 5)}
          >
            <ListItemText primary="5" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleResetFilters}>
        <ListItemText primary="Reset Filters" />
      </ListItemButton>
    </List>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
  },
});

export default function BasicTextFields() {
  const [errorText, setErrorText] = React.useState({
    imageLink: "",
    propertyType: "",
    numOfRooms: "",
    area: "",
    price: "",
    description: "",
  });

  const handleAddButtonClick = () => {
    // Check if any of the text fields are empty
    const fields = [
      "imageLink",
      "propertyType",
      "numOfRooms",
      "area",
      "price",
      "description",
    ];
    let hasError = false;
    const newErrorText = {};

    fields.forEach((field) => {
      if (!document.getElementById(`standard-basic-${field}`).value.trim()) {
        newErrorText[field] = "This field is required.";
        hasError = true;
      } else {
        newErrorText[field] = "";
      }
    });

    if (hasError) {
      setErrorText(newErrorText);
      return;
    }

    // Add your logic for handling the "Add" button click when all fields are filled
    // For now, let's just log a message to the console
    console.log("Add button clicked");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          textAlign: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" gutterBottom>
          Add House
        </Typography>
        <TextField
          id="standard-basic-imageLink"
          label="Image Link"
          variant="standard"
          error={Boolean(errorText.imageLink)}
          helperText={errorText.imageLink}
        />
        <TextField
          id="standard-basic-propertyType"
          label="Property Type"
          variant="standard"
          error={Boolean(errorText.propertyType)}
          helperText={errorText.propertyType}
        />
        <TextField
          id="standard-basic-numOfRooms"
          label="Number Of Rooms"
          variant="standard"
          error={Boolean(errorText.numOfRooms)}
          helperText={errorText.numOfRooms}
        />
        <TextField
          id="standard-basic-area"
          label="Area"
          variant="standard"
          error={Boolean(errorText.area)}
          helperText={errorText.area}
        />
        <TextField
          id="standard-basic-price"
          label="Price"
          variant="standard"
          error={Boolean(errorText.price)}
          helperText={errorText.price}
        />
        <TextField
          id="standard-basic-description"
          label="Description"
          variant="standard"
          error={Boolean(errorText.description)}
          helperText={errorText.description}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={handleAddButtonClick}
        >
          Add
        </Button>
      </Box>
    </ThemeProvider>
  );
}

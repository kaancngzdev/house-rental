import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function MediaCard(props) {
  const {
    customStyle,
    description,
    propertyType,
    numberOfRooms,
    squareMeters,
    price,
    image,
    title,
    id,
    onAddFavorite,
  } = props;
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        ...customStyle,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#c8e8dd",
      }}
    >
      <CardMedia
        sx={{ height: 200, width: "30%" }}
        image={image}
        title={title}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Property Type: {propertyType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Number of Rooms: {numberOfRooms}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Area: {squareMeters} m²
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price} TL
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "20%",
          gap: "30px",
        }}
      >
        <Button size="small" onClick={() => navigate(`../learnmore/${id}`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

const images = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
  "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3288103/pexels-photo-3288103.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const cardData = [
  {
    id: 1,
    description: "A beautiful modern apartment with stunning views.",
    propertyType: "Apartment",
    numberOfRooms: 2,
    squareMeters: 120,
    price: 5000,
    image: require("../assets/images/card/h1p1.jpg"),
    title: "house1",
  },
  {
    id: 2,
    description: "Cozy cottage surrounded by nature.",
    propertyType: "Cottage",
    numberOfRooms: 3,
    squareMeters: 90,
    price: 5001,
    image: require("../assets/images/card/h1p1.jpg"),
    title: "house2",
  },

  {
    id: 3,
    description: "aaaaaaaa",
    propertyType: "bbbbb",
    numberOfRooms: 5,
    squareMeters: 100,
    price: 5000,
    image: "../assets/images/card/h1p1.jpg",
    title: "house2",
  },
  {
    id: 4,
    description: "aaaaaaaa",
    propertyType: "bbbbb",
    numberOfRooms: 5,
    squareMeters: 100,
    price: 5000,
    image: "../assets/images/card/h1p1.jpg",
    title: "house2",
  },
  {
    id: 5,
    description: "aaaaaaaa",
    propertyType: "bbbbb",
    numberOfRooms: 5,
    squareMeters: 100,
    price: 5000,
    image: "../assets/images/card/h1p1.jpg",
    title: "house2",
  },
  {
    id: 6,
    description: "aaaaaaaa",
    propertyType: "bbbbb",
    numberOfRooms: 5,
    squareMeters: 100,
    price: 5000,
    image: "../assets/images/card/h1p1.jpg",
    title: "house2",
  },
];

const carouselData = [
  {
    label: "First slide label",
    content: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    label: "Second slide label",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
export { cardData, images, carouselData };

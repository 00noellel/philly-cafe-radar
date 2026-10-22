const cafes = [
    {
        id: 1,
        //unique identifier
        name: "Caphe Roasters",
        //name displayed on feature page
        image: "/cafes/capheRoasters.webp",
        //path where the image will eventually live

        //Filters
        moods: ["Study", "Remote Work", "Catch up"],
        neighborhood: "Kensington",
        price: "$",
        atmosphere: ["Cozy", "Social"],

        coordinates: [39.9993447, -75.1091197],
    },
    {
        id: 2,
        name: "Alchemy Coffee",
        image: "/cafes/alchemyCoffee.jpeg",

        moods: ["Study", "Remote Work"],
        neighborhood: "Center City",
        price: "$",
        atmosphere: ["Quiet"],

        coordinates: [39.9540591, -75.1783404],
    },
    {
        id: 3,
        name: "CNT Cafe",
        image:  "/cafes/cntCafe.jpg",

        moods: ["Solo Date", "Remote Work", "Study"],
        neighborhood: "Northern Liberties",
        price: "$",
        atmosphere: ["Quiet", "Cozy"],

        coordinates: [39.9629052, -75.1431628],
    },
    {
        id: 4,
        name: "Cafe Walnut",
        image: "/cafes/cafeWalnut.webp",

        moods: ["Catch up", "Remote Work", "Study"],
        neighborhood: "Rittenhouse Square",
        price: "$",
        atmosphere: ["Quiet"], 

        coordinates: [39.948168, -75.1528071],
    },
];

export default cafes;
const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
    .then((res) => console.log("Connection Succesful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/stayora');
    await Listing.deleteMany({});

    for (let listing of initData.data) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${listing.location}&format=jsonv2&limit=1`,
            {
                headers: {
                    "User-Agent": "Stayora/1.0"
                }
            }
        );
        const data = await response.json();
        if (data.length > 0) {
            listing.geometry = {
                type: "Point",
                coordinates: [
                    Number(data[0].lon),
                    Number(data[0].lat),
                ],
            };
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }

     initData.data = initData.data.map((obj) => ({ ...obj, owner: '6a9d8313505da545421a46a5' }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
    .then((res) => console.log("Connection Succesful"))
    .catch((err) => console.log(err));

async function main() {
    const dbUrl = process.env.ATLASDB_URL;
    await mongoose.connect(dbUrl);
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

    initData.data = initData.data.map((obj) => ({ ...obj, owner: process.env.ACTUAL_ATLAS_USER_ID }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

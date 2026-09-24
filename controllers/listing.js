const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const { category, location } = req.query;
    let allListing;

    if (category) {
        allListing = await Listing.find({ category: category });
    } else if (location) {
        let serachLocation = location.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        allListing = await Listing.find({
            $or: [
                { location: serachLocation },
                { country: serachLocation }
            ]
        });
    } else {
        allListing = await Listing.find({});
    }

    res.render("listing/index.ejs", { allListing });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not Exist!");
        return res.redirect("/listing");
    }
    res.render("listing/show.ejs", { listing });
}

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${newListing.location}&format=jsonv2&limit=1`,
        {
            headers: {
                "User-Agent": "Stayora/1.0"
            }
        }
    );
    const data = await response.json();

    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = {
        type: "Point",
        coordinates: [
            Number(data[0].lon),
            Number(data[0].lat)
        ]
    };
    newListing.country = newListing.country.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    newListing.location = newListing.location.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not Exist!");
        return res.redirect("/listing");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listing/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${listing.location}&format=jsonv2&limit=1`,
        {
            headers: {
                "User-Agent": "Stayora/1.0"
            }
        }
    );
    const data = await response.json();
    listing.geometry = {
        type: "Point",
        coordinates: [
            Number(data[0].lon),
            Number(data[0].lat)
        ]
    };

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteList = await Listing.findByIdAndDelete(id);
    console.log(deleteList);
    req.flash("success", "Listing Deleted Succesfully!");
    res.redirect("/listing");
}
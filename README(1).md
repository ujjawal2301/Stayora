# Stayora 🏡

Stayora is an Airbnb-inspired, full-stack property platform built as a learning project to practice and connect frontend, backend, database, authentication, image-upload, mapping, and deployment concepts.

🌐 **Live Demo:** https://stayora-ryrz.onrender.com

## ✨ Features

- Browse property listings.
- Search listings by location.
- Filter properties by category.
- Create, edit, and delete listings (with the appropriate authorization).
- User signup, login, and authentication.
- Add reviews and ratings to listings.
- Upload listing images using Cloudinary.
- View property locations on an interactive map.
- Convert entered locations into map coordinates using geocoding.
- Responsive interface for different screen sizes.

## 🛠️ Tech Stack

| Area | Technologies |
| --- | --- |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating / UI | EJS, ejs-mate, HTML, CSS, JavaScript, Bootstrap |
| Authentication | Passport.js, Passport Local |
| Sessions & Flash Messages | express-session, connect-mongo, connect-flash |
| Image Uploads | Cloudinary, Multer |
| Maps | Leaflet, OpenStreetMap, Nominatim |
| Deployment | Render |
| Version Control | Git, GitHub |

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone <YOUR_PUBLIC_GITHUB_REPOSITORY_URL>
cd Stayora
```

Replace the placeholder with your repository's HTTPS clone URL. If your local folder or repository has a different name, use that name in the `cd` command.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your local configuration. For example:

```env
ATLASDB_URL=your_mongodb_connection_string
```

Stayora also uses Cloudinary for image uploads. Add the Cloudinary credentials using the exact variable names expected by your `cloudConfig.js` file.

**Important:** Never commit `.env` or expose database connection strings, passwords, API secrets, or other credentials. Keep `.env` in `.gitignore`.

### 4. Start the application

Check the `scripts` section of `package.json` for the available start command. If no start script is defined, and the app entry point is `app.js`, run:

```bash
node app.js
```

If your project uses Nodemon, use the corresponding script or command configured in your project.

Open the local address and port shown in the terminal.

## 🗺️ Maps and Geocoding

Stayora uses Leaflet to display interactive maps, OpenStreetMap map tiles, and Nominatim to geocode entered locations into coordinates. GeoJSON coordinates are stored in `[longitude, latitude]` order, while Leaflet map positions use `[latitude, longitude]` order.

Please use geocoding services responsibly and follow the applicable usage policies.

## ☁️ Deployment

The live application is hosted on Render and uses MongoDB Atlas. Environment variables and service credentials should be configured in the hosting provider's environment settings rather than committed to the repository.

## 📚 What I Learned

Building Stayora helped me practice:

- Connecting frontend pages to backend routes and database operations.
- Implementing authentication and authorization.
- Working with MongoDB and Mongoose models.
- Handling image uploads and external services.
- Adding search, filtering, and interactive maps.
- Debugging integration issues and deploying a full-stack application.

## 🔮 Future Improvements

Stayora is a learning project and can be extended with additional features, refinements, and usability improvements.

## 👤 Author

Built as a full-stack development learning project.

---

If you explore the project, feedback and suggestions are welcome!

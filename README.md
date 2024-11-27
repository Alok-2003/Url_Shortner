# URL Shortener

## Overview

This is a URL Shortener application that allows users to shorten long URLs, track the statistics of shortened URLs, and view the original URL, click counts, and the last accessed time. The application provides a seamless and interactive experience with modern UI components and animations.

The project is built using **Next.js** for the frontend and **MongoDB** for storing URL data. It features an elegant design, responsive layout, and interactive buttons for shortening URLs and retrieving their statistics.

## Features

- **Shorten URLs**: Users can input a long URL and generate a shortened version of it.
- **View URL Stats**: Users can paste a short URL or enter a Short ID to retrieve statistics such as:
  - Original URL
  - Click count
  - Last accessed time
- **Modern UI**: The app comes with an elegant, modern UI with smooth hover animations, focus effects, and gradient button interactions.
- **Responsive Design**: The app is fully responsive and works across different screen sizes.

## Tech Stack

- **Frontend**: React (Next.js)
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Styling**: Tailwind CSS for utility-first, responsive styling.
- **Deployment**: Vercel

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

###  2. Install dependencies
Run the following command to install the necessary dependencies:
```npm install```
### 3. Set up MongoDB
1. Create a MongoDB database on MongoDB Atlas.
2. Add your MongoDB URI to the environment variables:
  - Create a .env.local file in the root directory of the project.
  - Add the following line to your .env.local file:
```code
MONGODB_URI=your_mongodb_uri_here 
```
### 4. Run the development server
- Start the development server using the following command:
```code
npm run dev
```
- The app will be available at http://localhost:3000.

## Usage
### 1. Shorten a URL
- Enter a long URL into the input field and click the "Shorten" button.
- The shortened URL will be displayed, and you can copy it to share.
### 2. View Stats for a Shortened URL
- Paste a shortened URL or enter the Short ID in the "URL Statistics" section.
- Click the "Get Stats" button to fetch the statistics.
- View details such as:
    - Original URL
    - Click count
    - Last accessed time
### 3. Project Structure
```
/pages
  /api
    - shorten.js        # Handles shortening the URL
    - stats.js          # Handles fetching stats for a short URL
/components
  - Stats.js           # Component to display URL stats
/lib
  - dbConnect.js       # MongoDB connection logic
/models
  - urlModel.js        # MongoDB schema for storing URL data
/styles
  - globals.css        # Global styles
```
.

## Deployment
### 1. Deploy to Vercel
- Push your code to GitHub (or another Git hosting provider).
- Connect your Git repository to Vercel and deploy the app.
- Make sure to add the MONGODB_URI as an environment variable in Vercel during the deployment setup.
### 2. Access the deployed app
- Once deployed, your URL Shortener app will be accessible via a unique Vercel URL (e.g., https://your-app-name.vercel.app).


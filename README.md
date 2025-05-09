# S9 - RollQuill

RollQuill is a web application designed for Dungeons & Dragons players to create, manage, and customize their characters. The application provides an intuitive interface for building characters, selecting races, classes, and skills, and tracking stats. It also includes features for managing character images, viewing compendiums, and navigating through a dashboard.

![RollQuill Logo](./src/assets/rollquill-black.png)

## Project Overview

RollQuill enables users to:
- Create, read, update, and delete character profiles
- Select races, subraces, classes, and subclasses for characters
- Assign ability scores and skill proficiencies
- View and manage character stats, including hit points and modifiers
- Browse a compendium of D&D races, classes, and items
- Customize character images through Cloudinary
- Access all features through a user-friendly dashboard

## Functionalities

- **Character Management**: Create, edit, and delete character profiles
- **Race and Class Selection**: Choose from a variety of D&D races, subraces, classes, and subclasses
- **Ability Score Assignment**: Allocate ability scores using a standard array
- **Skill Proficiencies**: Select skills based on class and background
- **Stat Tracking**: View calculated stats like modifiers, proficiency bonuses, and saving throws
- **Compendium**: Browse a collection of D&D races, classes, items, and features
- **Image Customization**: Upload and manage character images
- **Responsive Design**: Optimized for various screen sizes
- **Header Navigation**: Seamless navigation throughout the application

## Technologies

- Angular 19
- Bootstrap 5
- Jest (Testing)
- Firebase (Authentication and Firestore)
- Cloudinary (Image Uploads)
- Custom API
- SCSS for styling

## Requirements

- Node.js
- Visual Studio Code or similar IDE
- Angular 19

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/oscarrep/S9-RollQuill
   cd S9-RollQuill
   ```

2. Install dependencies:
   ```
   npm i
   ```

3. Install specific packages:
   ```
   npm i axios
   npm i bootstrap
   npm i --save-dev @types/bootstrap
   npm i --save-dev jest-preset-angular@github:thymikee/jest-preset-angular#main
   npm i @angular/fire
   ```

4. Start the development server:
   ```
   ng serve -o
   ```

5. Navigate to `http://localhost:4200/` in your browser to view the application.
6. Or go to `https://s9-roll-quill.vercel.app` for the deployed build.

---

## Usage

- **Character Creation**: Navigate to the "Create Character" section to build a new character by selecting races, classes, and assigning stats.
- **Dashboard**: View all your characters and access the compendium.
- **Compendium**: Explore D&D races, classes, items, and features.
- **Character Management**: Edit or delete existing characters from the dashboard.
- **Image Customization**: Use the image modal to upload or change character images.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

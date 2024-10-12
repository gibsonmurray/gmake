# Vite React TypeScript Project Generator

This script automates the creation of a Vite-based React TypeScript project with additional setup for Tailwind CSS, GSAP, and Prettier.

## Overview

The script performs the following tasks:

1. Creates a new Vite project with React and TypeScript template
2. Installs necessary dependencies including Tailwind CSS, PostCSS, Autoprefixer, GSAP, and Prettier
3. Initializes Tailwind CSS configuration
4. Sets up Prettier configuration
5. Adds Tailwind CSS directives to the main CSS file

## Usage

Run the script using Bun, providing the project name as an argument:

```bash
bun run index.ts <project-name>
```

Replace `<project-name>` with your desired project name.

## Main Functions

### `runCommand(command: string, args: string[])`

This asynchronous function executes shell commands and handles errors.

-   `command`: The command to run
-   `args`: An array of arguments for the command

### `createViteApp(projectName: string)`

This is the main function that orchestrates the project creation process.

-   `projectName`: The name of the project to create

## Process Steps

1. Create Vite project using `bun create vite`
2. Navigate to the project directory
3. Install dependencies (Tailwind CSS, PostCSS, Autoprefixer, Prettier, GSAP)
4. Initialize Tailwind CSS configuration
5. Update `tailwind.config.js`
6. Add Tailwind CSS directives to `src/index.css`
7. Initialize Prettier configuration

## Error Handling

The script includes basic error handling:

-   It checks if a project name is provided and exits if not
-   It catches and logs any errors that occur during the project creation process

## Dependencies

This script requires Bun to be installed on your system. It uses Bun's built-in `spawnSync` function for running shell commands.

## Note

Make sure you have the necessary permissions to create directories and install packages in the location where you run this script.

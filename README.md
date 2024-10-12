# Vite React TypeScript Project Generator

This script automates the creation of a Vite-based React TypeScript project with additional setup for Tailwind CSS, GSAP, and Prettier.

## Overview

The script performs the following tasks:

1. Creates a new Vite project with React and TypeScript template
2. Installs necessary dependencies including Tailwind CSS, PostCSS, Autoprefixer, GSAP, and Prettier
3. Initializes Tailwind CSS configuration
4. Sets up Prettier configuration
5. Adds Tailwind CSS directives to the main CSS file
6. Cleans up the project structure by removing unnecessary files and directories

## Usage

### Prerequisites

-   Ensure that [Bun](https://bun.sh/) is installed on your system. Bun is required to run the script and manage dependencies.

### Installing the CLI

To create a new Vite project, simply run:

```bash
bun run create
```

### Usage

To create a project named `my-vite-app`, you would run:

```bash
gmake my-vite-app
```

This command will create a new Vite project in the current directory named `my-vite-app` and set up all necessary configurations and dependencies.

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
8. Clean up project structure:
    - Delete `/src/assets` directory
    - Remove `App.css`
    - Reset `App.tsx` with a simplified component

## Error Handling

The script includes basic error handling:

-   It checks if a project name is provided and exits if not
-   It catches and logs any errors that occur during the project creation process

## Dependencies

This script requires Bun to be installed on your system. It uses Bun's built-in `spawnSync` function for running shell commands.

The script will install the following dependencies:

-   Development dependencies: tailwindcss, postcss, autoprefixer, prettier, prettier-plugin-tailwindcss
-   Production dependencies: gsap, @gsap/react

## Note

Make sure you have the necessary permissions to create directories and install packages in the location where you run this script. The script will modify the project structure by removing some default files and simplifying the initial setup.

```

-   **Project Creation**: The script starts by creating a Vite project using the React and TypeScript template.
-   **Dependency Installation**: It installs Tailwind CSS, PostCSS, Autoprefixer, Prettier, and GSAP.
-   **Configuration**: Tailwind CSS and Prettier configurations are initialized and set up.
-   **Cleanup**: Unnecessary files and directories are removed to streamline the project structure.

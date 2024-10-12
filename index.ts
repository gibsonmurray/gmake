#!/usr/bin/env bun

import { spawnSync } from "bun"
import { writeFileSync } from "fs"

async function runCommand(command: string, args: string[]) {
    const result = spawnSync([command, ...args], {
        stdout: "inherit",
        stderr: "inherit",
    })
    if (result.exitCode !== 0) {
        console.error(`Error: Command "${command} ${args.join(" ")}" failed`)
        process.exit(result.exitCode)
    }
}

async function createViteApp(projectName: string) {
    try {
        console.log(`Creating Vite project: ${projectName}`)

        // Step 1: Create Vite project with React and TypeScript template
        await runCommand("bun", [
            "create",
            "vite@latest",
            projectName,
            "--template",
            "react-ts",
        ])

        // Step 2: Navigate to project directory
        process.chdir(projectName)

        // Step 3: Install Tailwind CSS, PostCSS, and Autoprefixer
        console.log(
            "Installing Tailwind CSS, PostCSS, Autoprefixer, and GSAP..."
        )
        await runCommand("bun", [
            "add",
            "-d",
            "tailwindcss",
            "postcss",
            "autoprefixer",
            "prettier",
            "prettier-plugin-tailwindcss",
        ])
        await runCommand("bun", ["add", "gsap", "@gsap/react"])

        // Step 4: Initialize Tailwind CSS configuration
        console.log("Initializing Tailwind CSS...")
        await runCommand("bun", ["x", "tailwindcss", "init", "-p"])

        // Step 5: Update `tailwind.config.js`
        const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
    extend: {},
    },
    plugins: [],
};
`
        writeFileSync("tailwind.config.js", tailwindConfig, "utf8")

        // Step 6: Add Tailwind CSS directives to the main CSS file
        console.log("Setting up Tailwind CSS in styles...")
        const tailwindDirectives =
            "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
        writeFileSync("./src/index.css", tailwindDirectives, "utf8")

        // Step 7: Initialize Prettier
        console.log("Initializing Prettier...")
        const prettierConfig = `{
    "semi": false,
    "tabWidth": 4,
    "useTabs": false,
    "plugins": ["prettier-plugin-tailwindcss"]
}
`
        writeFileSync(".prettierrc", prettierConfig, "utf8")

        // New Step 8: Cleaning up
        console.log("Cleaning up project structure...")

        // Delete /src/assets directory
        await runCommand("rm", ["-rf", "src/assets"])

        // Delete App.css
        await runCommand("rm", ["src/App.css"])

        // Reset App.tsx
        const simplifiedAppTsx = 
`const App = () => {
    return (
        <div>
            <h1>Hello, World!</h1>
        </div>
    )
}

export default App
`
        writeFileSync("src/App.tsx", simplifiedAppTsx, "utf8")

        console.log(
            `Project setup complete! Navigate to ${projectName} to get started.`
        )
    } catch (error) {
        console.error("Error creating project:", error)
    }
}

// Get the project name from command-line arguments
const projectName = process.argv[2]
if (!projectName) {
    console.error("Please provide a project name.")
    process.exit(1)
}

createViteApp(projectName)

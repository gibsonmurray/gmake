#!/usr/bin/env bun

import { spawnSync } from "bun"
import { writeFileSync } from "fs"
import chalk from "chalk"

// Force Chalk to enable colors
chalk.level = 3 // 3 corresponds to full color support

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
        console.log(
            chalk.cyan(`\n🚀 Creating Vite project: ${chalk.bold(projectName)}\n`)
        )

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
        console.log(chalk.cyan("\n📦 Installing dependencies...\n"))
        await runCommand("bun", [
            "add",
            "-d",
            "tailwindcss",
            "postcss",
            "autoprefixer",
            "prettier",
            "prettier-plugin-tailwindcss",
        ])
        await runCommand("bun", ["add", "framer-motion"])

        console.log(chalk.cyan("\n⚛️ Installing React 19...\n"))
        await runCommand("bun", ["add", "react@rc", "react-dom@rc"])

        console.log(chalk.cyan("\n📝 Updating package.json for React 19 types...\n"))
        const packageJson = JSON.parse(await Bun.file("package.json").text())
        packageJson.devDependencies["@types/react"] = "npm:types-react@rc"
        packageJson.devDependencies["@types/react-dom"] = "npm:types-react-dom@rc"
        writeFileSync("package.json", JSON.stringify(packageJson, null, 2))

        await runCommand("bun", ["install"])

        // Step 4: Initialize Tailwind CSS configuration
        console.log(chalk.cyan("\n🎨 Initializing Tailwind CSS...\n"))
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
        console.log(chalk.cyan("\n🖌️  Setting up Tailwind CSS in styles...\n"))
        const tailwindDirectives =
            "@tailwind base;\n@tailwind components;\n@tailwind utilities;"
        writeFileSync("./src/index.css", tailwindDirectives, "utf8")

        // Step 7: Initialize Prettier
        console.log(chalk.cyan("\n💅 Initializing Prettier...\n"))
        const prettierConfig = `{
    "semi": false,
    "tabWidth": 4,
    "useTabs": false,
    "plugins": ["prettier-plugin-tailwindcss"]
}
`
        writeFileSync(".prettierrc", prettierConfig, "utf8")

        // New Step 8: Cleaning up
        console.log(chalk.cyan("\n🧹 Cleaning up project structure...\n"))

        // Delete /src/assets directory
        await runCommand("rm", ["-rf", "src/assets"])

        // Delete App.css
        await runCommand("rm", ["src/App.css"])

        // Reset App.tsx
        const simplifiedAppTsx = `const App = () => {
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
            chalk.green(
                `\n✅ Project setup complete! Navigate to ${chalk.bold(
                    projectName
                )} to get started.\n`
            )
        )
    } catch (error) {
        console.error(chalk.red("\n❌ Error creating project:"), error)
    }
}

// Get the project name from command-line arguments
const projectName = process.argv[2]
if (!projectName) {
    console.error("Please provide a project name.")
    process.exit(1)
}

console.log(chalk.yellow("\n🏁 Starting project creation...\n"))
createViteApp(projectName)

const fs = require("fs");
const path = require("path");

// Function to map directory to markdown format
function mapProjectStructure(
  dirPath,
  markdownPath,
  indentLevel = 0,
  excludedFolders = ["node_modules", ".git"]
) {
  const filesAndFolders = fs.readdirSync(dirPath);

  let markdownContent = "";

  filesAndFolders.forEach((item) => {
    // Skip the folders that should be excluded
    if (excludedFolders.includes(item)) {
      return;
    }

    const localPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(localPath).isDirectory();
    const indent = "  ".repeat(indentLevel); // two spaces per indent level for markdown

    markdownContent += `${indent}- ${item}\n`;

    // If it's a directory, recurse into it unless it's excluded
    if (isDirectory) {
      markdownContent += mapProjectStructure(
        localPath,
        markdownPath,
        indentLevel + 1,
        excludedFolders
      );
    }
  });

  // If root level, write to the markdown file
  if (indentLevel === 0 && markdownPath) {
    fs.writeFileSync(markdownPath, markdownContent);
  }

  return markdownContent;
}

// Usage: call the function with your project's root path, desired markdown file output path, and optionally an array of excluded folders
mapProjectStructure(".././", "./projectStructureMap.md");

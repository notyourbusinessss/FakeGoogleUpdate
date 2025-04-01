/**
 * Example Bun server that serves an "Update Page" and a downloadable "update" file
 *
 * 1. Place or rename your update file as "update.zip" (or adjust the filename below).
 * 2. Run `bun start`.
 * 3. Visit the printed URL in your browser to see the styled update page.
 */

import os from "node:os";
import { join } from "path";

/**
 * getLocalIp: Finds the first non-internal IPv4 address of the machine.
 */
function getLocalIp() {
    const networks = os.networkInterfaces();
    for (const interfaceName of Object.keys(networks)) {
        const networkInfoArray = networks[interfaceName] || [];
        for (const netInfo of networkInfoArray) {
            if (netInfo.family === "IPv4" && !netInfo.internal) {
                return netInfo.address; // e.g. "192.168.1.10"
            }
        }
    }
    // Fallback if none found
    return "127.0.0.1";
}

const serverIp = getLocalIp();
const port = 80;

/**
 * Serves the HTML "Update Page" with simple inline CSS styling.
 */
function serveHomePage() {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Software Update</title>
        <style>
          /* Basic page reset */
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: #f0f2f5;
          }
          /* Container for the content */
          .container {
            max-width: 600px;
            margin: 5% auto;
            background: #ffffff;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          /* Heading style */
          .heading {
            text-align: center;
            margin-bottom: 1.5rem;
          }
          /* Download button styling */
          .btn-download {
            display: inline-block;
            padding: 1rem 2rem;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            transition: background 0.2s ease;
          }
          .btn-download:hover {
            background: #0056b3;
          }
          /* Center the button */
          .button-row {
            text-align: center;
            margin-top: 2rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="heading">Software Update</h1>
          <p>
            We have a new update available that includes performance improvements
            and bug fixes to enhance your experience. Please click the button below
            to download the latest version.
          </p>
          <div class="button-row">
            <a class="btn-download" href="/download">Download Latest Update</a>
          </div>
        </div>
      </body>
    </html>
  `;

    return new Response(htmlContent, {
        headers: {
            "Content-Type": "text/html; charset=utf-8",
        },
    });
}

/**
 * Serves the update file as a download to the client.
 * Replace "update.zip" with the path/filename of your actual update file.
 */
function serveUpdateFile() {
    const filePath = join(process.cwd(), "Malware.txt");

    // Using Bun.file to fetch the file from the filesystem
    const fileData = Bun.file(filePath);

    return new Response(fileData, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": 'attachment; filename="update.txt"',
        },
    });
}

/**
 * Main Bun server.
 *
 * - "/" returns the "Update Page" (HTML).
 * - "/download" returns the update file.
 */
const server = Bun.serve({
    port,
    fetch(req) {
        const url = new URL(req.url);

        // Route: /download => Serve the file
        if (url.pathname === "/download") {
            return serveUpdateFile();
        }

        // Default ("/" or anything else) => Serve the Update Page
        return serveHomePage();
    },
});

console.log(`Listening on http://${serverIp}:${port} ...`);
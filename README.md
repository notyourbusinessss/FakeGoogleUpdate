# Update Page Server (Bun)

This project is a lightweight Bun-based HTTP server that serves a simple update webpage with a downloadable file. It is designed for distributing updates or files through a clean, minimal interface with minimal setup.

## Features

- Serves a styled "Software Update" landing page
- Provides a direct download link to an update file
- Runs on port `80` and automatically detects your local IP
- Powered by [Bun](https://bun.sh/), a fast JavaScript runtime

---

## Project Structure

```
project-root/
├── Malware.txt          # Your downloadable file (rename if needed)
├── index.ts             # The Bun server script (main entry point)
└── README.md            # You're reading it!
```

---

## Requirements

- [Bun](https://bun.sh/) installed (`bun install` not required unless you add dependencies)

---

## How to Use

1. **Place Your Update File**

   Rename your file to `Malware.txt` or update the filename in the code (`serveUpdateFile()`).

2. **Run the Server**

   ```bash
   bun run index.ts
   ```

3. **Access the Update Page**

   The server will print the local URL (e.g. `http://192.168.1.10`) in your terminal. Open it in your browser to view the update page.

4. **Download the File**

   Click the "Download Latest Update" button to download your file.

---

## Configuration Notes

- **File Path:** The default update file is `Malware.txt`. You can change this to any file name or type.
- **Port:** Runs on port `80`. You can change this by modifying the `port` variable in the script.
- **IP Detection:** Automatically finds the first non-internal IPv4 address of your machine.

---

## Example Output

Visit `http://localhost` or `http://<your-local-ip>`:

---

## Disclaimer

If you are using this for ethical hacking or cybersecurity testing (e.g., to simulate software distribution), ensure it is done in a legal, authorized, and controlled environment.

# Threads Following Fixer

A Chrome extension that automatically switches your Threads feed from "For You" (recommended) to "Following" so that your timeline is always fixed to the people you follow.

## Features

- **Auto Switch**: Automatically detects when you are on the "For You" feed and switches to the "Following" tab.
- **Smart Menu Handling**: If the "Following" tab is hidden inside a menu (which is common in the web interface), this extension will automatically click the menu button and select the "Following" option for you.
- **Lightweight**: Uses minimal resources by checking the page status every second and only executing actions when necessary.

## Installation

This extension is not yet available on the Chrome Web Store. You can install it manually by following these steps:

1. Clone this repository or download the ZIP file and extract it.
   ```bash
   git clone https://github.com/verytired/threads-following-fixer.git
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** in the top right corner.
4. Click the **"Load unpacked"** button in the top left corner.
5. Select the `threads-following-fixer` folder you just downloaded/cloned.

## Usage

Simply open [Threads](https://www.threads.net/) in your browser. The extension will automatically work in the background. whenever you visit the home page (`/`), it ensures you are viewing the "Following" feed.

## How it works

The script (`content.js`) monitors the current URL and DOM structure. When it detects that the current feed is set to "For You" (based on the presence of specific links or button states), it simulates user clicks to:
1. Open the view options menu (if needed).
2. Click the "Following" link.

## License

MIT License

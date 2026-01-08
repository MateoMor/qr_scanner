# QR Scanner

## A mobile application for scanning and managing QR codes

This project is a **React Native application** built to demonstrate how to **implement camera scanning, QR generation, and persistent state management in a mobile environment**.  
It serves as a **production-ready example** and showcases how to:

- **Scan QR Codes**: Real-time scanning using the device camera
- **Generate QR Codes**: Create QR codes from text or URLs
- **Manage History**: Local storage of scanned codes with history management
- **Personalize Experience**: Theming (Light/Dark mode) and customizable accent colors
- **Handle Permissions**: Managing camera and library access gracefully
- **Integrate Native Features**: Vibration, Share API, and File System access

## Related Content

If this project is associated with a tutorial, course, or video series, you can include it here.

<a href="#" target="_blank">
<img src="./screenshots/qr_scanner.png" alt="App Screenshot" width="240" height="auto" />
</a>

## How to install QR Scanner

The recommended way to get started is by using the Expo CLI,  
but here is the short version:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npx expo start
   ```
4. Run on a device or emulator:
   - Use the Expo Go app on your phone to scan the QR code
   - Or press `a` for Android Emulator / `i` for iOS Simulator

## How to customize this project

This project is designed to be reusable.  
You can fork or clone it and adapt it to your own needs by:

- **Adding a new Search Engine**: Edit `src/context/AppStateProvider.jsx` (searchEngine state) and `src/views/Settings.jsx`.
- **Modifying the Theme**: Change color constants in `src/context/AppStateProvider.jsx` or `constants/theme.ts` (if available).
- **Adding new supported Barcode types**: Update the `barCodeScannerSettings` in `src/views/Scanner.jsx`.

It works well as a starter boilerplate for **any barcode or QR-centric mobile utility**.

## Found a bug or want to contribute?

If you find an issue or have a suggestion for improvement:

- Open an issue using the **Issues** tab
- If submitting a PR, please reference the related issue

Contributions are welcome 🚀

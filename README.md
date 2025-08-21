# toastdo ♡︎.ᐟજ⁀➴

A simple, zero-friction task app designed to make ticking things off feel nice.

Lightweight React build, playful kaomoji feedback, and a tiny lofi player you can leave on while you work.

No accounts, no bloat, just vibes and done lists.

## Core Features

♡︎.ᐟજ⁀➴ minimal and cosy (dark & light themes)  
♡︎.ᐟજ⁀➴ Reward actions with subtle kaomoji reactions  
♡︎.ᐟજ⁀➴ Make it fast: keyboard shortcuts + local storage  
♡︎.ᐟજ⁀➴ Background lofi with play/pause + track switch

## Key Features

- **Dark/Light theme toggle** - Switch between cozy themes
- **Kaomoji reactions** - Playful feedback for add/complete/delete actions
- **Inline edit & quick add** - Double-click to edit, Enter to add
- **Keyboard shortcuts** - Navigate without touching the mouse
- **Persistent tasks** - All tasks saved via LocalStorage
- **Built-in lofi music player** - Background beats for focus

## Keyboard Shortcuts

- `n` - Focus new task input
- `t` - Toggle theme (dark/light)
- `Space` - Play/pause music
- `→` - Next track
- `Enter` - Save task/edit
- `Escape` - Cancel edit
- `Double-click` - Edit task
- `e` - Edit task (when hovering)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd toastdo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173/`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **CSS Custom Properties** - For theming
- **LocalStorage** - Data persistence

## Project Structure

```
src/
├── components/
│   ├── TaskWindow.jsx   # Task management window component
│   └── MusicPlayer.jsx  # Music player window component
├── App.jsx              # Main app layout and state management
├── App.css              # Minimal app styles
├── index.css            # Global styles and window system
└── main.jsx             # React entry point
```

## Features in Detail

### Window System

The app features a desktop-like window system with two main windows:

- **Task Window** (left) - Manages your to-do list with window-style header
- **Music Player** (right) - Controls background music in a separate window

Both windows feature the aesthetic window headers with minimize, maximize, and close buttons (styled but non-functional for design consistency).

### Theme System

The app starts in dark mode by default and supports both light and dark themes with smooth transitions. Theme preference is saved to LocalStorage and persists between sessions.

### Background Support

The app is designed to support a background image (1920x1280) - simply add your image as `/public/background.jpg` to enable it.

### Capybara Logo

A placeholder capybara logo sits at the top of the screen. Replace `/public/logo.svg` with your actual capybara logo (80x80px recommended).

### Kaomoji Reactions

Actions trigger floating kaomoji reactions:

- Add task: (｡◕‿◕｡) (´∀ ｀) (◕‿◕) etc.
- Complete task: (ᵔᴥᵔ) (◡ ‿ ◡) (￣ー￣) etc.
- Delete task: (╥﹏╥) (´;ω;`) (｡•́︿•̀｡) etc.
- Edit task: (◐‿◑) (ಠ‿ಠ) (｡◕‿◕｡) etc.

### Local Storage

Tasks are automatically saved to browser LocalStorage, so your list persists between sessions. No account required!

### Music Player

A simple lofi music player with play/pause and track switching. Currently uses placeholder tracks - you can replace with actual audio files.

## Customization

### Adding Music Tracks

Edit the `LOFI_TRACKS` array in `App.jsx` to add your own tracks:

```javascript
const LOFI_TRACKS = [
	{ name: 'Your Track Name', id: 1, url: 'path/to/audio.mp3' },
	// Add more tracks...
];
```

### Customizing Kaomoji

Edit the `KAOMOJI` object in `App.jsx` to change reactions:

```javascript
const KAOMOJI = {
	add: ['(｡◕‿◕｡)', '(´∀｀)' /* add your own */],
	complete: ['(ᵔᴥᵔ)', '(◡ ‿ ◡)' /* add your own */],
	// etc.
};
```

### Styling

All styles are in `src/index.css` using CSS custom properties. Modify the `:root` and `[data-theme="dark"]` sections to customize colors.

## License

Feel free to use this code for your own projects! ♡︎.ᐟજ⁀➴

---

Made with ♡ for productive vibes and good feels.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

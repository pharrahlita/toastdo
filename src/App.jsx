import { useEffect, useState } from 'react';
import './App.css';
import MusicPlayer from './components/MusicPlayer';
import TaskWindow from './components/TaskWindow';

function App() {
	const [tasks, setTasks] = useState([]);
	const [theme, setTheme] = useState('dark'); // Start in dark mode

	// Load tasks and theme from localStorage
	useEffect(() => {
		const savedTasks = localStorage.getItem('toastdo-tasks');
		const savedTheme = localStorage.getItem('toastdo-theme');

		if (savedTasks) {
			setTasks(JSON.parse(savedTasks));
		}

		// Only use saved theme if it exists, otherwise default to dark
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	// Save tasks to localStorage
	useEffect(() => {
		localStorage.setItem('toastdo-tasks', JSON.stringify(tasks));
	}, [tasks]);

	// Save theme to localStorage and apply to document
	useEffect(() => {
		localStorage.setItem('toastdo-theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e) => {
			// Don't interfere with inputs
			if (e.target.tagName === 'INPUT') return;

			// Only activate shortcuts when Shift is held
			if (!e.shiftKey) return;

			switch (e.key.toLowerCase()) {
				case 'n':
					e.preventDefault();
					document.querySelector('.add-task-input')?.focus();
					break;
				case 't':
					e.preventDefault();
					toggleTheme();
					break;
				case ' ':
					e.preventDefault();
					// Focus music player controls
					document.querySelector('.js-play-button, .js-pause-button')?.click();
					break;
				case 'arrowright':
					e.preventDefault();
					document.querySelector('.js-next-button')?.click();
					break;
				case 'arrowleft':
					e.preventDefault();
					document.querySelector('.js-prev-button')?.click();
					break;
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className="app">
			{/* Background overlay */}
			<div className="background-overlay"></div>
			{/* Capybara logo */}
			<div className="capybara-logo">
				<img src="/logotext.png" alt="logo" />
			</div>
			{/* Theme toggle button */}
			<button className="theme-toggle" onClick={toggleTheme}>
				{theme === 'light' ? '🌙' : '☀️'}
			</button>
			{/* Main content */}
			<div className="app-content">
				{/* Task Window - Left side */}
				<TaskWindow tasks={tasks} setTasks={setTasks} />

				{/* Right side - Shelf and Music Player stacked */}
				<div className="right-side">
					<MusicPlayer />
				</div>
			</div>{' '}
			{/* Keyboard shortcuts info */}
			<div className="shortcuts-hint">
				<div className="shortcuts-text">
					shortcuts: shift+n=new task • shift+t=theme • shift+space=play/pause •
					shift+←→=tracks
				</div>
			</div>
		</div>
	);
}

export default App;

import { useEffect, useRef, useState } from 'react';

// Lofi track placeholders (you'd replace with actual audio URLs)
const LOFI_TRACKS = [
	{ name: 'Cozy Morning', id: 1 },
	{ name: 'Rainy Day Vibes', id: 2 },
	{ name: 'Focus Flow', id: 3 },
	{ name: 'Midnight Study', id: 4 },
	{ name: 'Coffee Shop', id: 5 },
];

export default function MusicPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(0);
	const [currentTime, setCurrentTime] = useState('');
	const diskRef = useRef(null);

	// Update clock every second
	useEffect(() => {
		const updateClock = () => {
			const date = new Date();
			const hours = date.getHours();
			const minutes = date.getMinutes();
			const formattedTime = `${hours.toString().padStart(2, '0')} : ${minutes
				.toString()
				.padStart(2, '0')}`;
			setCurrentTime(formattedTime);
		};

		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	}, []);

	const toggleMusic = () => {
		setIsPlaying(!isPlaying);
		if (diskRef.current) {
			if (!isPlaying) {
				diskRef.current.classList.add('disk-animation');
			} else {
				diskRef.current.classList.remove('disk-animation');
			}
		}
	};

	const nextTrack = () => {
		if (diskRef.current) {
			diskRef.current.classList.add('disk-animation');
		}
		setCurrentTrack((currentTrack + 1) % LOFI_TRACKS.length);
		setIsPlaying(true);
	};

	const prevTrack = () => {
		if (diskRef.current) {
			diskRef.current.classList.add('disk-animation');
		}
		setCurrentTrack(
			(currentTrack - 1 + LOFI_TRACKS.length) % LOFI_TRACKS.length
		);
		setIsPlaying(true);
	};

	return (
		<>
			{/* Shelf with clock and plant - outside window */}
			<div className="shelf-standalone">
				<div className="on-shelf">
					<div className="digital-clock">
						<div className="clock-screen">
							<h3 className="clock-display">{currentTime}</h3>
						</div>
					</div>
					<div className="plant">
						<img src="/shelfPlant.png" alt="plant" className="plant-icon" />
					</div>
				</div>
				<div className="shelf"></div>
			</div>

			{/* Standalone Music Player - under shelf */}
			<div className="music-player-standalone">
				{/* Track Info */}
				<div className="track-info">
					<div className="track-name">{LOFI_TRACKS[currentTrack].name}</div>
					<div className="track-status">
						{isPlaying ? 'now playing' : 'paused'} • track {currentTrack + 1} of{' '}
						{LOFI_TRACKS.length}
					</div>
				</div>
				{/* Controls */}
				<div className="player-controls-board">
					<button
						className="control-btn prev-btn js-prev-button"
						onClick={prevTrack}
						title="Previous Track"
					>
						<img src="/prev.svg" alt="previous" className="control-icon" />
					</button>

					<div className="play-pause-container">
						<button
							className={`control-btn play-btn js-play-button ${
								isPlaying ? 'hidden' : ''
							}`}
							onClick={toggleMusic}
							title="Play"
						>
							<img src="/play.svg" alt="play" className="control-icon" />
						</button>
						<button
							className={`control-btn pause-btn js-pause-button ${
								!isPlaying ? 'hidden' : ''
							}`}
							onClick={toggleMusic}
							title="Pause"
						>
							<img src="/pause.svg" alt="pause" className="control-icon" />
						</button>
					</div>

					<button
						className="control-btn next-btn js-next-button"
						onClick={nextTrack}
						title="Next Track"
					>
						<img src="/skip.svg" alt="next" className="control-icon" />
					</button>
				</div>{' '}
				{/* Disk Player */}
				<div className="player-box">
					<div
						ref={diskRef}
						className={`disk ${isPlaying ? 'disk-animation' : ''}`}
					>
						<div className="disk-light"></div>
						<div className="disk-light-alt"></div>
						<div className="album-center">
							<div className="album-icon">♪</div>
						</div>
						<div className="disk-hole"></div>
					</div>
				</div>
				{/* Wire coming out bottom */}
				<div className="player-cable"></div>
			</div>
		</>
	);
}

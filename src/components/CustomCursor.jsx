import { useEffect } from 'react';

const CustomCursor = () => {
	useEffect(() => {
		const dot = document.querySelector('.cursor-dot');
		const outline = document.querySelector('.cursor-outline');

		let mouseX = 0,
			mouseY = 0;
		let outlineX = 0,
			outlineY = 0;
		const speed = 0.2;

		const updateMouse = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const animate = () => {
			outlineX += (mouseX - outlineX) * speed;
			outlineY += (mouseY - outlineY) * speed;

			dot.style.left = `${mouseX}px`;
			dot.style.top = `${mouseY}px`;

			outline.style.left = `${outlineX}px`;
			outline.style.top = `${outlineY}px`;

			requestAnimationFrame(animate);
		};

		const addHoverClass = () => {
			dot.classList.add('hovering');
			outline.classList.add('hovering');
		};

		const removeHoverClass = () => {
			dot.classList.remove('hovering');
			outline.classList.remove('hovering');
		};

		let hoverTargets = [];

		setTimeout(() => {
			hoverTargets = Array.from(
				document.querySelectorAll('a, button, .hover-target')
			);
			console.log('✨ Rebinding hover listeners to:', hoverTargets.length);

			hoverTargets.forEach((el) => {
				el.addEventListener('mouseenter', addHoverClass);
				el.addEventListener('mouseleave', removeHoverClass);
			});
		}, 100);

		window.addEventListener('mousemove', updateMouse);
		animate();

		return () => {
			hoverTargets.forEach((el) => {
				el.removeEventListener('mouseenter', addHoverClass);
				el.removeEventListener('mouseleave', removeHoverClass);
			});
			window.removeEventListener('mousemove', updateMouse);
		};
	}, []);

	useEffect(() => {
		const dot = document.querySelector('.cursor-dot');
		const outline = document.querySelector('.cursor-outline');
		let darkElements = [];

		const handleEnter = () => {
			dot.classList.add('cursor-dark');
			outline.classList.add('cursor-dark');
		};

		const handleLeave = () => {
			dot.classList.remove('cursor-dark');
			outline.classList.remove('cursor-dark');
		};

		// delay to ensure all DOM is ready
		setTimeout(() => {
			darkElements = Array.from(document.querySelectorAll('.dark-bg'));

			darkElements.forEach((el) => {
				el.addEventListener('mouseenter', handleEnter);
				el.addEventListener('mouseleave', handleLeave);
			});
		}, 100);

		return () => {
			darkElements.forEach((el) => {
				el.removeEventListener('mouseenter', handleEnter);
				el.removeEventListener('mouseleave', handleLeave);
			});
		};
	}, []);

	// Handle theme-based cursor styling
	useEffect(() => {
		const dot = document.querySelector('.cursor-dot');
		const outline = document.querySelector('.cursor-outline');

		const updateCursorTheme = () => {
			const theme = document.documentElement.getAttribute('data-theme');

			if (theme === 'light') {
				dot.classList.add('cursor-light-theme');
				outline.classList.add('cursor-light-theme');
			} else {
				dot.classList.remove('cursor-light-theme');
				outline.classList.remove('cursor-light-theme');
			}
		};

		// Initial theme setup
		updateCursorTheme();

		// Watch for theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-theme'
				) {
					updateCursorTheme();
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<div className="cursor-dot"></div>
			<div className="cursor-outline"></div>
		</>
	);
};

export default CustomCursor;

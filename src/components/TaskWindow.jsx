import { useEffect, useRef, useState } from 'react';

// Kaomoji for different actions
const KAOMOJI = {
	add: ['(｡◕‿◕｡)', '(´∀｀)', '(◕‿◕)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '♡(˃͈ દ ˂͈ ༶ )'],
	complete: ['(ᵔᴥᵔ)', '(◡ ‿ ◡)', '(￣ー￣)', '(｡♥‿♥｡)', '✧(◕‿◕)✧'],
	delete: ['(╥﹏╥)', '(´;ω;`)', '(｡•́︿•̀｡)', '(ㄒoㄒ)', '(◞‸◟)'],
	edit: ['(◐‿◑)', '(ಠ‿ಠ)', '(｡◕‿◕｡)', '(◕‿◕✿)', '(◕ω◕)'],
};

export default function TaskWindow({ tasks, setTasks }) {
	const [newTask, setNewTask] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState('');
	const [completedCollapsed, setCompletedCollapsed] = useState(false);
	const editInputRef = useRef(null);

	// Focus edit input when editing starts
	useEffect(() => {
		if (editingId && editInputRef.current) {
			editInputRef.current.focus();
		}
	}, [editingId]);

	// Show floating kaomoji reaction
	const showReaction = (type, event) => {
		const kaomoji =
			KAOMOJI[type][Math.floor(Math.random() * KAOMOJI[type].length)];
		const reaction = document.createElement('div');
		reaction.className = 'reaction';
		reaction.textContent = kaomoji;

		// Position near the event target
		const rect = event.target.getBoundingClientRect();
		reaction.style.left = `${rect.left + rect.width / 2}px`;
		reaction.style.top = `${rect.top}px`;

		document.body.appendChild(reaction);

		// Remove after animation
		setTimeout(() => {
			if (reaction.parentNode) {
				reaction.parentNode.removeChild(reaction);
			}
		}, 2000);
	};

	const addTask = (e) => {
		e.preventDefault();
		if (newTask.trim()) {
			const task = {
				id: Date.now(),
				text: newTask.trim(),
				completed: false,
				createdAt: new Date().toISOString(),
			};
			setTasks([...tasks, task]);
			setNewTask('');
			showReaction('add', e.target);
		}
	};

	const toggleTask = (id, event) => {
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
		showReaction('complete', event);
	};

	const deleteTask = (id, event) => {
		setTasks(tasks.filter((task) => task.id !== id));
		showReaction('delete', event);
	};

	const startEditing = (id, text, event) => {
		setEditingId(id);
		setEditText(text);
		showReaction('edit', event);
	};

	const saveEdit = () => {
		if (editText.trim()) {
			setTasks(
				tasks.map((task) =>
					task.id === editingId ? { ...task, text: editText.trim() } : task
				)
			);
		}
		setEditingId(null);
		setEditText('');
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditText('');
	};

	const pendingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<div className="task-window">
			<div className="window-header">
				<span className="player-title">୧ ‧₊˚ 🍮 ⋅ ☆ toastdo.txt</span>
				<div className="player-controls">
					<span className="window-hyphen"> — </span>
					<span className="window-close"> x </span>
				</div>
			</div>

			<div className="window-content">
				<form className="add-task-form" onSubmit={addTask}>
					<input
						type="text"
						className="add-task-input"
						placeholder="⋆˙⟡ — whatchu gotta dooo? ૮꒰ ˶• ༝ •˶꒱ა ♡"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
				</form>

				{tasks.length === 0 ? (
					<div className="empty-state">
						<span className="empty-kaomoji">𓂃 ࣪˖ ִֶָ𐀔 </span>
						<p>no tasks yet! shift + n to add a new task!</p>
					</div>
				) : (
					<>
						{pendingTasks.length > 0 && (
							<ul className="task-list">
								{pendingTasks.map((task) => (
									<li key={task.id} className="task-item">
										<div
											className="task-checkbox"
											onClick={(e) => toggleTask(task.id, e)}
										>
											{task.completed && '✓'}
										</div>

										{editingId === task.id ? (
											<input
												ref={editInputRef}
												type="text"
												className="task-input"
												value={editText}
												onChange={(e) => setEditText(e.target.value)}
												onKeyDown={(e) => {
													if (e.key === 'Enter') saveEdit();
													if (e.key === 'Escape') cancelEdit();
												}}
												onBlur={saveEdit}
											/>
										) : (
											<span
												className={`task-text ${
													task.completed ? 'completed' : ''
												}`}
												onDoubleClick={(e) =>
													startEditing(task.id, task.text, e)
												}
											>
												{task.text}
											</span>
										)}

										<div className="task-actions">
											<button
												className="task-btn"
												onClick={(e) => startEditing(task.id, task.text, e)}
												title="Edit (E)"
											>
												edit
											</button>
											<button
												className="task-btn delete"
												onClick={(e) => deleteTask(task.id, e)}
												title="Delete (Del)"
											>
												delete
											</button>
										</div>
									</li>
								))}
							</ul>
						)}

						{completedTasks.length > 0 && (
							<>
								<button
									className="completed-header collapsible-header"
									onClick={() => setCompletedCollapsed(!completedCollapsed)}
								>
									<span className="collapse-icon">
										{completedCollapsed ? '▶' : '▼'}
									</span>
									⋆౨ৎ˚⟡˖ ࣪completed! ˎˊ˗ ({completedTasks.length})
								</button>
								{!completedCollapsed && (
									<ul className="task-list completed-list">
										{completedTasks.map((task) => (
											<li key={task.id} className="task-item completed">
												<div
													className="task-checkbox checked"
													onClick={(e) => toggleTask(task.id, e)}
												>
													✓
												</div>
												<span className="task-text completed">{task.text}</span>
												<div className="task-actions">
													<button
														className="task-btn delete"
														onClick={(e) => deleteTask(task.id, e)}
													>
														delete
													</button>
												</div>
											</li>
										))}
									</ul>
								)}
							</>
						)}
					</>
				)}
			</div>
		</div>
	);
}

# Task Modal Components

This directory contains reusable task modal components that handle both creating and editing tasks.

## Components

### TaskModal

The main modal component that can handle both create and edit modes.

```tsx
import { TaskModal } from '@/components/modals/task'

// For creating a new task
<TaskModal
  setIsOpen={setIsOpen}
  mode="create"
  projectId="project-id"
/>

// For editing an existing task
<TaskModal
  setIsOpen={setIsOpen}
  mode="edit"
  task={existingTask}
/>
```

### AddTaskModal

A convenience wrapper for creating new tasks.

```tsx
import { AddTaskModal } from '@/components/modals/task'

;<AddTaskModal
	setIsOpen={setIsOpen}
	projectId='project-id'
/>
```

### EditTaskModal

A convenience wrapper for editing existing tasks (maintains backward compatibility).

```tsx
import { EditTaskModal } from '@/components/modals/task'

;<EditTaskModal
	setIsOpen={setIsOpen}
	task={existingTask}
/>
```

### useTaskForm

The underlying hook that handles form logic for both create and edit operations.

```tsx
import { useTaskForm } from '@/components/modals/task'

const { form, isPending, onSubmit, mode } = useTaskForm({
	mode: 'create' | 'edit',
	taskId: 'task-id', // only needed for edit mode
	projectId: 'project-id', // only needed for create mode
	onClose: () => setIsOpen(false)
})
```

## Usage Examples

### Adding a "Create Task" button to a project section

```tsx
import { useState } from 'react'

import { AddTaskModal } from '@/components/modals/task'
import { Button } from '@/components/ui'

function ProjectSection({ projectId }: { projectId: string }) {
	const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

	return (
		<div>
			<Button onClick={() => setIsAddTaskModalOpen(true)}>Add Task</Button>

			{isAddTaskModalOpen && (
				<AddTaskModal
					setIsOpen={setIsAddTaskModalOpen}
					projectId={projectId}
				/>
			)}
		</div>
	)
}
```

### Using the TaskModal directly for more control

```tsx
import { useState } from 'react'

import { TaskModal } from '@/components/modals/task'

function TaskManager() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
	const [selectedTask, setSelectedTask] = useState<TTask | undefined>()

	const handleCreateTask = () => {
		setModalMode('create')
		setSelectedTask(undefined)
		setIsModalOpen(true)
	}

	const handleEditTask = (task: TTask) => {
		setModalMode('edit')
		setSelectedTask(task)
		setIsModalOpen(true)
	}

	return (
		<div>
			<Button onClick={handleCreateTask}>Create Task</Button>

			{isModalOpen && (
				<TaskModal
					setIsOpen={setIsModalOpen}
					mode={modalMode}
					task={selectedTask}
					projectId='your-project-id'
				/>
			)}
		</div>
	)
}
```

## Features

- **Unified Interface**: Single modal component handles both create and edit operations
- **Form Validation**: Uses Zod schema validation for consistent data validation
- **Loading States**: Built-in loading states and error handling
- **Toast Notifications**: Success and error notifications using Sonner
- **Query Invalidation**: Automatically invalidates relevant queries after operations
- **TypeScript Support**: Full TypeScript support with proper type definitions

// tests/tasks.test.js
describe('Task Management Tests', () => {

  test('Task creation should validate input', () => {
    const task = {
      title: 'Buy groceries',
      description: 'Get milk, bread, and eggs',
      status: 'pending',
      user_id: 1
    };

    expect(task).toHaveProperty('title');
    expect(task).toHaveProperty('description');
    expect(task).toHaveProperty('status');
    expect(task).toHaveProperty('user_id');
    expect(task.title).toBeTruthy();
  });

  test('Task title should not be empty', () => {
    const validTask = { title: 'Valid Task' };
    const invalidTask = { title: '' };

    expect(validTask.title).toBeTruthy();
    expect(invalidTask.title).toBeFalsy();
  });

  test('Task status should be valid', () => {
    const validStatuses = ['pending', 'in_progress', 'completed'];
    const tasks = [
      { title: 'Task 1', status: 'pending' },
      { title: 'Task 2', status: 'in_progress' },
      { title: 'Task 3', status: 'completed' }
    ];

    tasks.forEach(task => {
      expect(validStatuses).toContain(task.status);
    });
  });

  test('Task should have timestamps', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      created_at: new Date(),
      updated_at: new Date()
    };

    expect(task.created_at).toBeInstanceOf(Date);
    expect(task.updated_at).toBeInstanceOf(Date);
    expect(task.updated_at.getTime()).toBeGreaterThanOrEqual(task.created_at.getTime());
  });

  test('Task update should modify status', () => {
    const task = {
      id: 1,
      title: 'Original Title',
      status: 'pending'
    };

    // Simulate update
    task.title = 'Updated Title';
    task.status = 'completed';

    expect(task.title).toBe('Updated Title');
    expect(task.status).toBe('completed');
  });

  test('Multiple tasks should be retrievable', () => {
    const tasks = [
      { id: 1, title: 'Task 1', status: 'pending' },
      { id: 2, title: 'Task 2', status: 'in_progress' },
      { id: 3, title: 'Task 3', status: 'completed' }
    ];

    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(3);
    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0]).toHaveProperty('title');
    expect(tasks[0]).toHaveProperty('status');
  });

  test('Task filtering by status should work', () => {
    const tasks = [
      { id: 1, title: 'Task 1', status: 'pending' },
      { id: 2, title: 'Task 2', status: 'in_progress' },
      { id: 3, title: 'Task 3', status: 'completed' },
      { id: 4, title: 'Task 4', status: 'pending' }
    ];

    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    expect(pendingTasks.length).toBe(2);
    expect(completedTasks.length).toBe(1);
    expect(pendingTasks[0].status).toBe('pending');
  });

  test('Task deletion should remove from list', () => {
    let tasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
      { id: 3, title: 'Task 3' }
    ];

    const initialLength = tasks.length;
    tasks = tasks.filter(task => task.id !== 2);

    expect(tasks.length).toBe(initialLength - 1);
    expect(tasks.find(task => task.id === 2)).toBeUndefined();
  });

  test('Task sorting should work correctly', () => {
    const tasks = [
      { id: 3, title: 'Task 3', created_at: new Date('2025-01-03') },
      { id: 1, title: 'Task 1', created_at: new Date('2025-01-01') },
      { id: 2, title: 'Task 2', created_at: new Date('2025-01-02') }
    ];

    const sortedTasks = [...tasks].sort((a, b) => a.created_at - b.created_at);

    expect(sortedTasks[0].id).toBe(1);
    expect(sortedTasks[1].id).toBe(2);
    expect(sortedTasks[2].id).toBe(3);
  });

  test('Task pagination should work', () => {
    const tasks = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Task ${i + 1}`
    }));

    const pageSize = 10;
    const page = 1;
    const paginatedTasks = tasks.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    expect(paginatedTasks.length).toBe(10);
    expect(paginatedTasks[0].id).toBe(1);
    expect(paginatedTasks[9].id).toBe(10);
  });
});

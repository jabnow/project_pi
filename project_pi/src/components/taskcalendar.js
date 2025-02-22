import React, { useState } from 'react';
import { Calendar, Badge, Button, Input, Modal, Popconfirm, message } from 'antd';

const TaskCalendar = () => {
    const [tasks, setTasks] = useState({
        '2025-02-25': [
            { id: 1, content: 'To do 1' },
            { id: 2, content: 'To do 2' }
        ]
    });


    const [selectedDate, setSelectedDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [taskInput, setTaskInput] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const dateCellRender = (value) => {
        const dateStr = value.format('YYYY-MM-DD');
        const taskList = tasks[dateStr] || [];

        return (
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {taskList.map((task) => (
                    <li key={task.id}>
                        <Badge status="success" text={task.content} />
                        <Button
                            type="link"
                            size="small"
                            onClick={() => handleEditTaskClick(task, dateStr)}
                        >
                            edit
                        </Button>
                        <Popconfirm
                            title="Sure you wanna deletel it?"
                            onConfirm={() => handleDeleteTask(task.id, dateStr)}
                            okText="Confirm"
                            cancelText="Cancel"
                        >
                            <Button type="link" size="small" danger>
                                delete
                            </Button>
                        </Popconfirm>
                    </li>
                ))}
            </ul>
        );
    };

    const handleAddTaskClick = () => {
        if (!selectedDate) {
            void message.warning('Please Choose a date first');
            return;
        }
        setIsModalVisible(true);
    };

    const handleEditTaskClick = (task) => {
        setEditingTask(task);
        setTaskInput(task.content);
        setIsModalVisible(true);
    };

    const handleSaveTask = () => {
        if (taskInput.trim()) {
            const dateStr = selectedDate.format('YYYY-MM-DD');
            const updatedTasks = { ...tasks };

            if (editingTask) {
                updatedTasks[dateStr] = updatedTasks[dateStr].map((task) =>
                    task.id === editingTask.id ? { ...task, content: taskInput } : task
                );
                void message.success('Task updated');
            } else {
                const newTask = { id: Date.now(), content: taskInput };
                updatedTasks[dateStr] = [...(updatedTasks[dateStr] || []), newTask];
                void message.success('Task added');
            }

            setTasks(updatedTasks);
            setTaskInput('');
            setEditingTask(null);
            setIsModalVisible(false);
        }
    };

    const handleDeleteTask = (taskId, dateStr) => {
        const updatedTasks = { ...tasks };
        updatedTasks[dateStr] = updatedTasks[dateStr].filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        void message.success('TaskDeleted');
    };

    return (
        <div style={{ display: 'flex', padding: '10px' }}>
            <div style={{ flex: 1, maxWidth: '100px' }}>
                <Calendar
                    cellRender={dateCellRender}
                    onSelect={(date) => setSelectedDate(date)}
                    headerRender={({ value }) => (
                        <div style={{ textAlign: 'center', padding: '8px' }}>
                            {value.format('YYYY / MM')}
                        </div>
                    )}
                />
            </div>


            <div style={{ marginLeft: '20px' }}>
                <Button type="primary" onClick={handleAddTaskClick}>
                    add task
                </Button>
            </div>

            <Modal
                title={editingTask ? 'edit task' : 'add task'}
                open={isModalVisible}
                onOk={handleSaveTask}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingTask(null);
                }}
            >
                <Input
                    placeholder="input task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default TaskCalendar;
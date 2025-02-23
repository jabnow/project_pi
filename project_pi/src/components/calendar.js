import React, { useState } from 'react';
import {usePlanData} from "./planContextProvider";
import { Modal, Button, Card, Calendar, Input, Table} from 'antd';

const AntdDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [task, setTask] = useState({
        '2025-02-22': [
            {id: 1, content: "hackathon morning", description:"go over the API and homepage"},
            {id: 2, content: "hackathon night", description: "integrate the AI with the rest of webapp"}
        ]
        }
    )
    const selectedDateTasks = selectedDate ? task[selectedDate.format('YYYY-MM-DD')] || [] : [];
    const [taskContent, setTaskContent ]= useState('');
    const [taskDescription, setTaskDescription]= useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAddTask = () =>{
        const DateFormatted = selectedDate.format('YYYY-MM-DD');
        const newTaskList = {...task}
        const newTask = {id: DateFormatted, content: taskContent, description: taskDescription}
        newTaskList[DateFormatted] = [...(task[DateFormatted] || []), newTask]
        setTask(newTaskList)
        setIsModalVisible(false);
        setTaskContent('');
        setTaskDescription('');

    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = { ...task };
        for (const date in updatedTasks) {
        updatedTasks[date] = updatedTasks[date].filter((task) => task.id !== taskId);
        }
        setTask(updatedTasks);
  };

    const columns = [
        {
            title: "date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "content",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "action",
            dataIndex: "action",
            key: "action",
            render: (_, selected) =>
                <Button
                onClick={()=>(handleDeleteTask(selected.id))}>
                    delete
                </Button>
        }
    ]

    const tableData = selectedDateTasks.map((task) => ({
        ...task,
        date: selectedDate.format('YYYY-MM-DD'),
    }));

    //for the context test
    const { planData } = usePlanData();

    return (
        <div style={{ display: 'flex', padding: '10px', gap: '20px' }}>
            <div style={{ flex: 1, padding: '10px' }}>
                <h2>Select a Date</h2>
                <Card style={{ maxWidth: '350px', width: '100%'}}>
                    <Calendar
                        fullscreen={false}
                        onSelect={handleDateChange} />
                    <p>Selected Date: {selectedDate ? selectedDate.format('YYYY-MM-DD') : 'None'}</p>
                </Card>
            </div>
            <div style={{flex:2}}>
                {selectedDate && (
                    <div style={{ flex: 1 }}>
                        <div style={{display: "flex", alignItems: 'center',justifyContent: 'space-between'}}>
                            <h2>Tasks for {selectedDate.format('YYYY-MM-DD')}</h2>
                            <Button
                                onClick={()=>setIsModalVisible(true)}>
                                add task
                            </Button>
                        </div>
                        <Table dataSource={tableData} columns={columns} rowKey="id" />
                    </div>
                )}

            </div>
            <Modal
                title="add task"
                open={isModalVisible}
                onOk={handleAddTask}
                onCancel={() =>{
                    setIsModalVisible(false)
                    setTaskContent('')
                    setTaskDescription('')
                }}
            >
                <Input
                    placeholder = "content"
                    value = {taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    >
                </Input>
                <Input
                    placeholder = "description"
                    value = {taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    >
                </Input>
            </Modal>

        </div>
    );
};

export default AntdDatePicker;
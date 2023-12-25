import React, {useState, useEffect} from 'react';
import {Collapse, Pagination, Descriptions, Button, message, Modal, Space, Tooltip, Tag} from 'antd';
import {UserAddOutlined, IdcardOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import {useData, UserData} from '../state/DataContext';
import EditUserModal from './EditUserModal';
import {testData} from "./testData";

const {Panel} = Collapse;

export default function UserList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [usersPerPage] = useState(10);
    const {userData, updateUserData} = useData();

    useEffect(() => {
        // Update user data from the context
        updateUserData(testData);
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const showEditModal = (user: UserData | null) => {
        setSelectedUser(user);
        setIsEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setSelectedUser(null);
        setIsEditModalVisible(false);
    };

    const handleEditSubmit = (values: any) => {
        if (selectedUser) {
            // Edit existing user
            updateUserData(
                userData.map((user) => (user.id === selectedUser.id ? {...user, ...values} : user))
            );
            message.success('User data updated successfully');
        } else {
            // Create new user and add at the top
            const newUser = {id: userData.length + 1, ...values};
            updateUserData([newUser, ...userData]);
            message.success('User created successfully');
        }

        // Close the modal
        handleEditCancel();
    };

    const showDeleteConfirm = (user: UserData) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: `Are you sure you want to delete User ${user.username}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleDelete(user);
            },
            onCancel() {
                // Do nothing on cancel
            },
        });
    };

    const handleDelete = (user: UserData) => {
        // Delete the user from the context
        updateUserData(userData.filter((u) => u.id !== user.id));

        // Display success message
        message.success('User deleted successfully');
    };

    const headerLeft = (user: UserData) => {
        return (
            <Space>
                <Tooltip title="User Name">
                    <Tag icon={<IdcardOutlined/>} color="default">
                        {user.username}
                    </Tag>
                </Tooltip>
                <Tooltip title="User Role">
                    <Tag icon={<IdcardOutlined/>} color="default">
                        {user.role}
                    </Tag>
                </Tooltip>
            </Space>
        );
    };

    return (
        <div>
            <Space style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Title level={4}>Users List</Title>
                <Button type="primary" onClick={() => showEditModal(null)} style={{marginLeft: 16}}>
                    <UserAddOutlined/> Create User
                </Button>
            </Space>
            {currentUsers.map((user, index) => (
                <Collapse style={{marginBottom: 10}}>
                    <Panel header={headerLeft(user)} key={user.id} extra={user.id}>
                        <Descriptions column={1}>
                            <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
                            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                            <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
                        </Descriptions>
                        <Space wrap style={{display: 'flex', justifyContent: 'end'}}>
                            <Button
                                type="primary"
                                disabled={user.role !== 'admin'}
                                onClick={() => showEditModal(user)}
                            >
                                <EditOutlined/> Edit
                            </Button>
                            <Button danger onClick={() => showDeleteConfirm(user)}>
                                <DeleteOutlined/> Delete
                            </Button>
                        </Space>
                    </Panel>
                </Collapse>
            ))}
            <Pagination style={{marginTop: 20}} current={currentPage} total={userData.length} pageSize={10}
                        onChange={paginate}/>
            <EditUserModal
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                onSubmit={handleEditSubmit}
                user={selectedUser}
            />
        </div>
    );
};


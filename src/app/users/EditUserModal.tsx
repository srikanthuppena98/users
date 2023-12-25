import React, {useEffect} from 'react';
import {Modal, Form, Input} from 'antd';
import {UserData} from "../state/DataContext";

interface EditUserModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    user: UserData | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({visible, onCancel, onSubmit, user}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form]);

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                onSubmit(values);
                form.resetFields();
                onCancel(); // Close the modal
            })
            .catch(errorInfo => {
                console.error('Validation failed:', errorInfo);
            });
    };

    const handleCancel = () => {
        form.resetFields(); // Reset the form fields
        onCancel(); // Close the modal
    };

    return (
        <Modal
            title={user ? 'Edit User' : 'Create User'}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please enter a username'},
                        {
                            pattern: /^[A-Za-z]+$/,
                            message: 'Username should only contain letters',
                        }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please enter an email'},
                        {type: 'email', message: 'Please enter a valid email address'},
                    ]}
                >
                    <Input type="email"/>
                </Form.Item>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{required: true, message: 'Please enter a role'}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );


};

export default EditUserModal;

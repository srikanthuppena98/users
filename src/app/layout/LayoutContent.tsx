import {
    UserOutlined,
} from '@ant-design/icons';

import {Layout, Menu, theme} from 'antd';
import AppRoutes from "../../App.Routes";
import {Link} from "react-router-dom";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React from "react";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";


export default function LayoutContent() {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    let {lg} = useBreakpoint()

    return (
        <Layout>
            <Header style={{display: 'flex', alignItems: 'center'}}>
                <div className="demo-logo"/>
                {!lg && <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[{
                        key: '',
                        label: <Link to={'/users'}>Users</Link>,
                    }]}

                    style={{flex: 1, minWidth: 0}}
                />}
            </Header>
            <Layout>
                {lg && <Sider width={lg ? 230 : 190} collapsedWidth="0"
                              breakpoint="lg" style={{background: colorBgContainer}}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
                          style={{height: '100%', borderRight: 0}}>
                        <Menu.Item key="1" icon={<UserOutlined/>}>
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>}
                <Layout>
                    <Content
                        style={{
                            padding: '0 24px 24px', minHeight: 'calc(100vh - 64px)',
                            background: '#F9FAFF',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <AppRoutes/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};


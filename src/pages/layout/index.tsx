import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SettingOutlined
    //VideoCameraOutlined,
    //UploadOutlined,
} from '@ant-design/icons';

import videoList from '../video/videoList';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class SiderBar extends React.Component<any, any> {
    state = {
        collapsed: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    logout = () => {
        localStorage.removeItem('token');
        this.props.history.push('/login');
    };
    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/videoList">视频列表</Link>
                        </Menu.Item>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(
                            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: this.toggle
                            }
                        )}
                        <Button className="logout" onClick={this.logout}>
                            退出
                        </Button>
                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280
                        }}
                    >
                        <Switch>
                            <Route path="/videoList" component={videoList} strict exact />
                            <Route path="/dashboard/analysis"></Route>
                            <Route path="/" component={videoList} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

//ReactDOM.render(<SiderDemo />, mountNode);

export default withRouter(SiderBar);

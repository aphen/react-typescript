import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { Switch, Route, Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import  videoList  from '../video/videoList';

const { Header, Sider, Content } = Layout;

class SiderBar extends React.Component<any, any> {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/videoList">视频列表</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <Button className="logout" onClick= {this.logout}>退出</Button>
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
                <Route path="/videoList" component = { videoList } strict exact />
                <Route path="/" component = { videoList }/>          
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

//ReactDOM.render(<SiderDemo />, mountNode);

export default withRouter(SiderBar);

import { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    // SettingOutlined
    VideoCameraOutlined,
    UploadOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const SiderBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    const changeHref = ({ key }: { key: string }) => {
        navigate(`/${key}`, { replace: true });
    };

    useEffect(() => {
        console.log([location.pathname.slice(1)]);
        setSelectedKeys([location.pathname.slice(1)]);
    }, [location.pathname]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onClick={changeHref}
                    items={[
                        {
                            key: 'video',
                            icon: <UserOutlined />,
                            label: '视频列表'
                        },
                        {
                            key: 'blog',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2'
                        },
                        {
                            key: 'nav3',
                            icon: <UploadOutlined />,
                            label: 'nav 3'
                        }
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                    <Button className="logout" onClick={logout}>
                        退出
                    </Button>
                </Header>

                <Content
                    className="site-layout-background"
                    id="subContainer"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    <Outlet />
                    {/* {routers} */}
                    {/* <Routes>
                        { routes.forEach(item => {
                            if(item.name='layout')
                                return <Route path={item.path} element={item.element} />;
                        })}
                        {/* <Route path="/video" element={<VideoList />} />
                        <Route path="/blog" element={<Blog />}></Route> */}
                    {/* </Routes> */}
                </Content>
            </Layout>
        </Layout>
    );
};

//ReactDOM.render(<SiderDemo />, mountNode);

export default SiderBar;

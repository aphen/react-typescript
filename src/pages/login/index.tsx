import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import bcrypt from 'bcryptjs';
import { login } from '../../api';
import '../../styles/login.less';

type Login = {
    username: string;
    password: string;
    remember: boolean;
};

// type Response = {
//     status: number;
//     data: object;
// }

const LoginForm = (): React.ReactNode => {
    const navigate = useNavigate();
    const onFinish = (values: Login) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(values.password, salt);
        values.password = hash;
        console.log('Received values of form: ', values);
        login(values)
            .then((res: any) => {
                console.log(res);
                if (res.data.status !== 0) {
                    message.error(res.data.errMsg);
                } else {
                    localStorage.setItem('token', res.data.token);
                    navigate('/video');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot">Forgot password</a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a>register now!</a>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;

import * as React from 'react';
import { Button, Modal, Form, Input } from 'antd';
//import { ColumnsType } from 'antd/es/table';
import { FormInstance } from 'antd/lib/form';
import { addVideo } from '../../api';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
interface Video {
    _id: any;
    id: string;
    name: string;
    key: number;
    age: number;
    address: string;
}
interface IState {
    data: Video[];
    isModalVisible: boolean;
}

class VideoAdd extends React.Component<any, IState> {
    formRef = React.createRef<FormInstance>();
    constructor(props: unknown) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false
        };
    }

    setIsModalVisible(isShow: boolean): void {
        this.setState({
            isModalVisible: isShow
        });
    }
    addRow = (): void => {
        this.setIsModalVisible(true);
    };

    // handleOk = () => {
    //     console.log(this.formRef.current)

    // };
    onFinish = (values: Record<string, unknown>): void => {
        addVideo(values).then(() => {
            this.props.onFinish();
            this.onReset();
            this.setIsModalVisible(false);
        });
        console.log(values);
    };
    handleCancel = (): void => {
        this.setIsModalVisible(false);
    };
    onReset = (): void => {
        this.formRef.current!.resetFields();
    };

    render(): JSX.Element {
        return (
            <>
                <Modal
                    title="添加一条信息"
                    // visible={this.state.isModalVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <Form
                        {...layout}
                        ref={this.formRef}
                        name="control-ref"
                        onFinish={this.onFinish}
                    >
                        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="age" label="数量" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="address" label="地址">
                            <Input />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default VideoAdd;

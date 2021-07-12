import * as React from 'react';
import { Form, Table, Tag, Space, Button, Input, Popconfirm, InputNumber, Typography } from 'antd';
//import { ColumnsType } from 'antd/es/table';
import { FormInstance } from 'antd/lib/form';
import { getVideoList, deleteVideo, editVideo } from '../../api';
import VideoAdd from './videoAdd';

interface Video {
    _id: string | number;
    id: string;
    name: string;
    key: number;
    age: number;
    address: string;
}
interface IState {
    data: Video[];
    isModalVisible: boolean;
    editingKey: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
    record: Video;
    index: number;
    children: React.ReactNode;
}

class table extends React.Component<any, IState> {
    formRef = React.createRef<FormInstance>();
    editFormRef = React.createRef<FormInstance>();
    videoRef: any;
    constructor(props: unknown) {
        super(props);
        this.state = {
            data: [],
            isModalVisible: false,
            editingKey: ''
        };
        this.videoRef = React.createRef();
    }

    EditableCell: React.FC<EditableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        //record,
        //index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: dataIndex === 'address' ? false : true,
                                message: `Please Input ${title}!`
                            }
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    isEditing = (record: Video): boolean => record.id === this.state.editingKey;

    edit = (record: Partial<Video> & { key: React.Key }): void => {
        this.editFormRef.current?.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record
        });
        this.setState({ editingKey: record.id || '' });
    };

    cancel = (): void => {
        this.setState({ editingKey: '' });
    };

    save = async (key: React.Key): Promise<void> => {
        try {
            const row = (await this.editFormRef.current!.validateFields()) as Video;
            const newData = [...this.state.data];
            const index = newData.findIndex((item) => key === item.id);

            editVideo(newData[index]._id, row).then(() => {
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row
                    });
                    this.setState({ data: newData });

                    this.setState({ editingKey: '' });
                } else {
                    console.log('不存在？？？');
                    newData.push(row);
                    this.setState({ data: newData });
                    this.setState({ editingKey: '' });
                }
            });
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    columns: any[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true
            //render: (text: String) => <i>{text}</i>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            editable: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            editable: true
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags = []): JSX.Element => (
                <>
                    {tags.map((tag: any) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: unknown, record: any): JSX.Element => {
                const editable = this.isEditing(record);
                return (
                    <Space size="middle">
                        {editable ? (
                            <span>
                                <a onClick={() => this.save(record.id)} style={{ marginRight: 8 }}>
                                    Save
                                </a>
                                <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
                                    <a>Cancel</a>
                                </Popconfirm>
                            </span>
                        ) : (
                            <Typography.Link
                                disabled={this.state.editingKey !== ''}
                                onClick={() => this.edit(record)}
                            >
                                Edit
                            </Typography.Link>
                        )}

                        <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() => this.handleDelete(record._id)}
                        >
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            }
        }
    ];
    mergedColumns = this.columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Video) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: this.isEditing(record)
            })
        };
    });

    handleDelete = (key: React.Key): void => {
        deleteVideo(key).then(() => {
            const data = [...this.state.data];
            this.setState({ data: data.filter((item) => item._id !== key) });
        });
        console.log(key);
    };

    addRow = (): void => {
        if (this.videoRef && this.videoRef.current) {
            this.videoRef.current.addRow();
            //console.log(text);
        }
        //this.setIsModalVisible(true);
    };
    getVideoListData = (): void => {
        getVideoList().then((response) => {
            //data = response.data;
            //console.log(data);
            this.setState({
                data: response.data
            });
        });
    };

    componentDidMount(): void {
        this.getVideoListData();
    }
    render(): JSX.Element {
        return (
            <>
                <Button onClick={this.addRow}>添加一行</Button>
                <Form ref={this.editFormRef} component={false}>
                    <Table
                        components={{
                            body: {
                                cell: this.EditableCell
                            }
                        }}
                        bordered
                        dataSource={this.state.data}
                        columns={this.mergedColumns}
                        rowClassName="editable-row"
                        rowKey="_id"
                    />
                </Form>

                <VideoAdd ref={this.videoRef} onFinish={this.getVideoListData}></VideoAdd>
            </>
        );
    }
}

export default table;

import React from 'react';
import { inject } from '../utils';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import PostService from '../service/post';

import { Empty, Input, Divider, List, Typography } from 'antd';


const { Search } = Input;
const { Text } = Typography;
const service = new PostService();


@inject({ service })
@observer
export default class SC extends React.Component {
    constructor(props) {
        super(props);
        props.service.posts = [];
    }

    handleChange(value) {
        this.props.service.finder(value);
    }

    render() {
        const posts = this.props.service.posts;
        if (posts.length) {

            return (
                <div className="search-box">
                    <br />
                    <Search size="large" placeholder="搜索" onSearch={this.handleChange.bind(this)} allowClear enterButton style={{ width: '50%' }} />
                    <Divider />
                    <Text strong>已为你搜到 {posts.length} 个结果，减少关键字长度可能搜到更多结果。</Text>
                    <br />
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={posts}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Link to={'/chapters/' + item.id} >{item.title}</Link>}
                                    description={item.tags}
                                />
                                {item.desc}
                            </List.Item>
                        )}
                    />
                    <Divider dashed orientation="left"><Text type="secondary">@</Text></Divider>
                </div>
            );
        } else {
            return (
                <div className="search-box">
                    <br />
                    <Search size="large" placeholder="搜索" onSearch={this.handleChange.bind(this)} allowClear enterButton style={{ width: '50%' }} />
                    <Divider />
                    <br /><br /><br />
                    <Empty />
                </div>
            );
        }
    }
}

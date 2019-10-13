import React from 'react';
import { inject, paging } from '../utils';
import { observer } from 'mobx-react';
import { Row, Col, Breadcrumb, Typography, Divider, Card, Icon, Skeleton, Anchor, Button } from 'antd';
import { Link } from 'react-router-dom';

import 'antd/lib/card/style'
import 'antd/lib/icon/style'
import 'antd/lib/typography/style'
import 'antd/lib/row/style'
import 'antd/lib/col/style'
import 'antd/lib/breadcrumb/style'
import 'antd/lib/skeleton/style'
import 'antd/lib/divider/style'
import 'antd/lib/button/style'

const { Title, Paragraph, Text } = Typography;

import PostService from '../service/post';

const service = new PostService();



@inject({ service })
@observer
class ShowContent extends React.Component {
    constructor(props) {
        super(props);
        props.service.showcontent(props.match.params.id, props.location.search);
    }

    render() {

        let data = this.props.service.posts;
        if (data.length) {
            const info = this.props.service.info;
            let page = new paging(info.chapterslist)
            info.prepage = page.pre(info.tid);
            info.nextpage = page.next(info.tid);
            
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="container" />
                            <span>{info.noveltype}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href={"/chapters/" + info.novel_id}>
                            <Icon type="book" />
                            <span>{info.title}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{info.c_title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <br />
                    <Row>
                        <Col span={2} offset={3}>
                            <Anchor>
                                <Link to={'/chapters/' + info.novel_id}>
                                    <Card hoverable={true} bordered={false} style={{ background: '#fafafa' }}>
                                        <Icon type="profile" theme="twoTone" twoToneColor="#eb2f96" />
                                        <Text strong={true}> 目录</Text>
                                    </Card>
                                </Link>
                                <Link to={'/content/' + info.prepage}>
                                    <Card hoverable={true} bordered={false} style={{ background: '#fafafa' }}>
                                        <Icon type="left-square" theme="twoTone" twoToneColor="#eb2f96" />
                                        <Text strong={true}> 上页</Text>
                                    </Card>
                                </Link>
                                <Link to={'/content/' + info.nextpage}>
                                    <Card hoverable={true} bordered={false} style={{ background: '#fafafa' }}>
                                        <Icon type="right-square" theme="twoTone" twoToneColor="#eb2f96" />
                                        <Text strong={true}> 下页</Text>
                                    </Card>
                                </Link>
                            </Anchor>
                        </Col>
                        <Col span={14}>
                            <Card bordered={false} style={{ background: '#f5f5f5' }}>
                                <Typography>
                                    <br />
                                    <Title>{info.c_title}</Title>
                                    <Text strong='true' type="secondary">作者：{info.author} <Divider type="vertical" /> 字数：{info.words} <Divider type="vertical" /> 更新时间：{new Date(info.ctime * 1000).toLocaleDateString()}</Text>
                                    <Divider dashed /><br />
                                    {data.split("|").map((d, n) => {
                                        return (
                                            <Paragraph key={n} >&#12288;&#12288;{d}</Paragraph>
                                        );
                                    })}
                                </Typography>

                                <Col span={8} offset={0}>
                                    <Button type="primary" block>
                                        <Icon type="left" />
                                        上一页
                                    </Button>
                                </Col>
                                <Col span={8} offset={8}>
                                    <Button type="primary" block>
                                        下一页
                                        <Icon type="right" />
                                    </Button>
                                </Col>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (<div>
                <br /><br />
                <Row><Col span={14} offset={5}>
                    <Card bordered={false}><Skeleton active paragraph={{ rows: 24 }} /></Card>
                </Col></Row>
            </div>)
        }
    }
}

export default (props) => <ShowContent {...props} key={props.location.pathname} />
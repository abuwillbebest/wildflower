import React from 'react';
import { inject, parse_qs } from '../utils';
import { List, Card, Pagination, PageHeader, Tag, Breadcrumb, Icon, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import PostService from '../service/post';

import 'antd/lib/list/style'
import 'antd/lib/card/style'
import 'antd/lib/pagination/style'
import 'antd/lib/page-header/style'
import 'antd/lib/tag/style'
import 'antd/lib/skeleton/style'


const service = new PostService();



@inject({ service })
@observer
class LOC extends React.Component {
    constructor(props) {
        super(props);
        props.service.listofchapters(props.match.params.id, props.location.search);

    }

    handleChange(pageNo, pageSize) {
        let search = '?page=' + pageNo + '&size=' + pageSize;
        this.props.service.listofchapters(this.props.match.params.id, search);
    }


    render() {
        let data = this.props.service.posts;
        if (data.length) {
            const heads = this.props.service.heads;
            const pagination = this.props.service.pagination;
            return (
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Icon type="container" />
                            <span>{heads.noveltype}</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item><Icon type="book" /><span>{heads.title}</span></Breadcrumb.Item>
                    </Breadcrumb>
                    <PageHeader title={heads.title} subTitle={heads.desc} tags={<Tag color="blue">{heads.tags}</Tag>} />
                    <List style={{ minHeight: 520 }}
                        grid={{
                            gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4,
                        }}
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <Link to={'/content/' + item.content_id}>
                                    <Card hoverable={true} bordered={false} >{item.c_title}</Card>
                                </Link>
                            </List.Item>
                        )}
                    />
                    <Pagination simple current={pagination.page} pageSize={pagination.size} total={pagination.count} onChange={this.handleChange.bind(this)} />
                </div>
            );
        } else {
            return (<div><Skeleton active paragraph={{ rows: 20 }} /></div>)
        }
    }
}


export default (props) => <LOC {...props} key={props.location.pathname} />
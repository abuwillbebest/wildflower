import React from 'react';
import { inject } from '../utils';
import { List, Card, Pagination, Breadcrumb, Icon, Skeleton, message, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import PostService from '../service/post';

import 'antd/lib/list/style'
import 'antd/lib/card/style'
import 'antd/lib/pagination/style'
import 'antd/lib/breadcrumb/style'
import 'antd/lib/icon/style'
import 'antd/lib/message/style'


const service = new PostService();

const { Paragraph } = Typography;

@inject({ service })
@observer
class LOT extends React.Component {
  constructor(props) {
    super(props);
    props.service.listoftype(props.match.params.id, props.location.search);
  }

  handleChange(pageNo, pageSize) {
    let search = '?page=' + pageNo + '&size=' + pageSize;
    this.props.service.listoftype(this.props.match.params.id, search);
  }

  render() {
    let data = this.props.service.posts;

    if (this.props.service.errMsg) {
      message.info(this.props.service.errMsg, 3,
        () => setTimeout(() => this.props.service.errMsg = ''), 1000);
    }

    if (data.length) {
      const info = this.props.service.info;
      const pagination = this.props.service.pagination;
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item >
              <Icon type="container" />
              <span>{info.noveltype}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <br />
          <List style={{ minHeight: 660 }}
            grid={{
              gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Link to={'/chapters/' + item.post_id}>
                  <Card hoverable={true} title={<b>{item.title}</b>} extra={<small>{item.author}</small>} ><Paragraph ellipsis>{item.desc}</ Paragraph></Card>
                </Link>
                <br />
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


export default (props) => <LOT {...props} key={props.location.pathname} />
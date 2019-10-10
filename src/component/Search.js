import React from 'react';
import { inject } from '../utils';
import { observer } from 'mobx-react';
import PostService from '../service/post';

import { Empty } from 'antd';

import 'antd/lib/empty/style';

const service = new PostService();


@inject({ service })
@observer
export default class SC extends React.Component {

    render() {
        return (
            <div>
                <Empty />
            </div>
        );
    }
}

import React from 'react';
import ReactDom from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Menu, Icon, Layout, Carousel } from 'antd';
import LOT from './component/ListOfType';
import LOC from './component/ListOfChapters';
import ShowContent from './component/ShowContent';
import SC from './component/Search';

import 'antd/lib/menu/style';
import 'antd/lib/icon/style';
import 'antd/lib/layout/style';
import 'antd/lib/carousel/style';

import './css/carousel.css';


const { Header, Content, Footer } = Layout;

const Home = function () {

  return (
    <Carousel autoplay>
      <div>
        <img src='src/img/x1.jpg' alt="x1" style={{ width:'100%' }}/>
      </div>
      <div>
        <img src='src/img/x2.jpg' alt="x2" style={{ width:'100%' }}/>
      </div>
      <div>
        <img src='src/img/x3.jpg' alt="x3" style={{ width:'100%' }}/>
      </div>
      <div>
        <img src='src/img/x4.jpg' alt="x4" style={{ width:'100%' }}/>
      </div>
      <div>
        <img src='src/img/x5.jpg' alt="x5" style={{ width:'100%' }}/>
      </div>
    </Carousel>
  )
};

const About = () => (
  <div>
    <h1>小说网站项目</h1>
    <ul>
      <li>采用前后端分离开发模式</li>
      <li>前端使用最新的React技术，后端使用Django框架</li>
      <li>使用Restful风格设计服务间API接口</li>
      <li>无session认证技术，强密码技术</li>
      <li>阿里开源Antd组件</li>
      <li>企业级nginx + uWSGI + Django部署</li>
    </ul>
  </div>
);



const App = () => (
  <Router>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" defaultSelectedKeys={['home']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="home"><Link to="/"><Icon type="home" />主页</Link></Menu.Item>
          <Menu.Item key="qihuan"><Link to="/type/1"><Icon type="appstore" />奇幻玄幻</Link></Menu.Item>
          <Menu.Item key="wuxia"><Link to="/type/2"><Icon type="appstore" />武侠仙侠</Link></Menu.Item>
          <Menu.Item key="about"><Link to="/about"><Icon type="heart" />关于</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '12px 200px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 780 }}>
          <Route exact path="/" component={Home} />
          <Route path="/type/:id" component={LOT} />
          <Route path="/chapters/:id" component={LOC} />
          <Route path="/content/:id" component={ShowContent} />
          <Route path="/search" component={SC} />
          <Route path="/about" component={About} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        君子以自强不息©2019-2022
      </Footer>
    </Layout>
  </Router>
);

ReactDom.render(<App />, document.getElementById('root'));
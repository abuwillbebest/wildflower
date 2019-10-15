import axios from 'axios';
import { observable } from 'mobx';


export default class PostService {

    constructor() {
        this.axios = axios.create({
            baseURL: '/api/post/'
        });
        this.heads = { "title": "title", "desc": "desc...", "tags": "tag" };
    }

    @observable posts = [];
    @observable pagination = { page: 1, size: 20, pages: 0, count: 0 }
    @observable errMsg = '';

    listoftype(typeid, search) {
        this.axios.get(typeid + search).then(
            response => {
                this.info = response.data.info;
                this.posts = response.data.posts;
                this.pagination = response.data.pagination;
            }
        ).catch(
            error => {
                console.log(error);
                this.errMsg = '信息获取失败';
            }
        )
    }


    listofchapters(cid, search) {
        this.axios.get('chapters/' + cid + search).then(
            response => {
                this.heads = response.data.header;
                this.posts = response.data.posts;
                this.pagination = response.data.pagination;
            }
        ).catch(
            error => {
                this.posts = [];
                this.errMsg = '信息获取失败';
                console.log(error);
            }
        )
    }

    showcontent(tid, search) {
        this.axios.get('showcontent/' + tid + search).then(
            response => {
                response.data.info.tid = tid;
                this.info = response.data.info;
                this.posts = response.data.posts;
            }
        ).catch(
            error => {
                this.errMsg = '信息获取失败';
                console.log(error);
            }
        )
    }

    finder(key) {
        if (key == '') {
            this.posts = [];
            return
        }
        
        this.axios.post('search', {
            words: key
        }).then(
            response => {
                this.posts = response.data.results;
            }
        ).catch(
            error => {
                this.errMsg = '获取结果失败';
                console.log(error);
            }
        )
    }
}
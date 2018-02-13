<!--Created by 337547038 on 2018/2/12.-->
<template>
    <div class="upload">
        <div class="upload-list" v-if="uploadList.length>0&&showList">
            <ul class="clearfix">
                <li v-for="(item,index) in uploadList"><img :src="item.src">
                    <span :style="{width:item.progress}" v-if="showProgress"></span>
                    <a href="javascript:;" class="del icon-close" @click="_delImg(index,item.src)"></a>
                </li>
            </ul>
        </div>
        <label :for="randomId" class="file">
            <slot></slot>
            <input type="file" @change="_onFileChange" :multiple="multiple" :id="randomId" :accept="accept">
        </label>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    export default {
        name: 'upload',
        data () {
            return {
                randomId: Math.random().toString(36).substr(2, 10),
                uploadList: [],//上传列表，多个上传时
                successTip: [],//多个上传时，用来保存上传的文件路径，
                uploadFailList: []//上传列表，没有通过验证的
            }
        },
        props: {
            action: String,//上传地址
            multiple: {//是否支持多选文件
                type: Boolean,
                default: false
            },
            showProgress: {//显示上传进度
                type: Boolean,
                default: true
            },
            name: {//上传的文件字段名
                type: String,
                default: 'file'
            },
            showList: {//显示上传列表，仅在multiple=true时有效
                type: Boolean,
                default: true
            },
            accept: String,//h5原生属性，接受上传的文件类型
            format: Array,//支持的文件类型，与 accept 不同的是，format 是识别文件的后缀名，accept 为 input 标签原生的 accept 属性，会在选择文件时过滤，可以两者结合使用
            maxSize: Number//文件大小限制，单位 kb

        },
        components: {},
        methods: {
            _onFileChange(e){
                let file = e.target.files;
                //this.uploadList.splice(0, this.uploadList.length);//清空
                if (this.multiple) {
                    //这次采用多次提交的方式，一次提交只能显示一个进度条。每个文件不能单独显示
                    //一次提交时表单名为数组形式，服务接收端要遍历接收，遍历完再提示即可
                    /*for(){
                     param.append('file[]', file[i]);
                     }
                     this._axios(param, '');*/
                    for (let i = 0; i < file.length; i++) {
                        let check = this._check(file[i]);
                        if (check) {
                            //没有通过
                            this.uploadFailList.push(check);
                        } else {
                            let files = {};
                            files.src = '';
                            files.progress = '0';
                            files.size = file[i].size;
                            this.uploadList.push(files);
                            let param = new FormData();
                            param.append(this.name, file[i]);
                            this._axios(param, files);
                        }
                    }
                    this.$emit('checkFail', this.uploadFailList);
                } else {
                    let check = this._check(file[0]);
                    if (check) {
                        //没有通过合法验证
                        this.$emit('checkFail', check);
                    }
                    else {
                        let param = new FormData();
                        param.append(this.name, file[0]);
                        this._axios(param, '');
                    }
                }
            },
            _axios(param, files){
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';
                        this.$emit('progress', complete);
                        //多图上传时
                        if (this.multiple && files) {
                            files.progress = complete;
                        }
                    }
                };
                axios.post(this.action, param, config)
                        .then(response => {
                            if (this.multiple && files) {
                                files.src = response.data;
                                this.successTip.push(response.data);
                                //只提示一次
                                if (this.successTip.length == this.uploadList.length) {
                                    this.$emit('success', this.successTip);
                                }
                            } else {
                                this.$emit('success', response.data);
                            }
                        }).catch(res=> {
                    this.$emit('error', res);
                });
            },
            _check(file){
                //检查上传文件合法性
                let name = file.name;
                let suffix = name.substr(name.length - 3, 3);
                if (this.format) {
                    if (this.format.indexOf(suffix) != -1) {
                        //console.log('pass');
                    } else {
                        let format = this.format ? this.format.toString() : "";
                        return '只支持上传类型为：' + format;
                    }
                }
                if (this.maxSize && file.size > this.maxSize * 1024) {
                    return `文件${name}超出最大${this.maxSize}kb上传限制`
                }
            },
            _delImg(index,src){
                //删除已上传图片
                this.uploadList.splice(index,1);
                this.$emit('delImg',src);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
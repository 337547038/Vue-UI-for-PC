<!--Created by 337547038 on 2018/2/12.-->
<template>
    <div class="demo">
        <h1>Upload Demo</h1>
        <comHeader name="backTop"/>
        <h2>Use</h2>
        <pre>import Upload from '../components/upload/index'</pre>
        <pre>&lt;Upload action="">&lt;/Upload></pre>
        <h2>说明</h2>
        <p>a.组件使用FormData提交，对浏览器有兼容要求；</p>
        <p>b.多文件上传时使用多次提交方式；</p>
        <p>c.示例要服务端接收，下面PHP服务端接收示例代码：</p>
        <pre>
            //php接收端代码：
            header("Access-Control-Allow-Origin: *");
            $filename = $_FILES['file']['name'];
            move_uploaded_file($_FILES['file']['tmp_name'],'upload/'.$filename);
            echo json_encode('upload/'.$filename);</pre>
        <p>如果使用单次提交，则服务端接收代码如下：</p>
        <pre>
            $filename = $_FILES['file']['name'];
            foreach ($filename as $k=>$names){
            	move_uploaded_file($_FILES['file']['tmp_name'][$k],'upload/'.$filename[$k]);
            }
            echo '批量上传成功'</pre>
        <h3>1、基本使用</h3>
        <Upload :action="action" @success="_success">
            选择图片
        </Upload>
        <h3>2、结合Input</h3>
        <div>
            <input type="text" v-model="inputUpload" class="input-control">
            <Upload :action="action" @success="_success2">
                选择图片
            </Upload>
        </div>
        <h3>3、上传后显示图片，带上传进度</h3>
        <div class="img-upload">
            <img :src="imgUpload" width="120" height="120">
            <span :style="{width:imgProgress}"></span>
        </div>
        <Upload :action="action" @success="_success3" :showProgress="false" @progress="_progress3">
            选择图片
        </Upload>
        <h3>4、合法验证</h3>
        <p>只能上传jpg格式且小于200kb</p>
        <p>:format="['jpg']" :maxSize="200"</p>
        <Upload :action="action" @success="_success" @checkFail="_checkFail4" :format="['jpg']" :maxSize="200">
            选择图片
        </Upload>
        <h3>5、多文件上传</h3>
        <p>多文件上传时会自动跳转没有通过验证的</p>
        <Upload :multiple="true" :action="action" @success="_success" :format="['jpg']" :maxSize="200" @checkFail="_checkFail5">
            多图片片上传
        </Upload>
        <h3>6、不带上传列表</h3>
        <Upload :action="action" @success="_success" :showList="false" :multiple="true" >
            多图片片上传
        </Upload>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>action</td>
                <td>String</td>
                <td>上传地址，必填</td>
            </tr>
            <tr>
                <td>multiple</td>
                <td>Boolean｜false</td>
                <td>是否支持多选文件</td>
            </tr>
            <tr>
                <td>showProgress</td>
                <td>Boolean｜true</td>
                <td>显示上传进度，显示上传列表时</td>
            </tr>
            <tr>
                <td>name</td>
                <td>String｜file</td>
                <td>上传的文件字段名</td>
            </tr>
            <tr>
                <td>accept</td>
                <td>String</td>
                <td>h5原生属性，接受上传的文件类型</td>
            </tr>
            <tr>
                <td>format</td>
                <td>Array</td>
                <td>支持上传的后缀名</td>
            </tr>
            <tr>
                <td>maxSize</td>
                <td>Number</td>
                <td>最大上传限制，单位kb</td>
            </tr>
            <tr>
                <td>checkFail</td>
                <td>Function</td>
                <td>上传文件合法性验证，返回错误提示</td>
            </tr>
            <tr>
                <td>progress</td>
                <td>Function</td>
                <td>文件上传进度，返回进度百分比</td>
            </tr>
            <tr>
                <td>success</td>
                <td>Function</td>
                <td>上传成功，返回成功上传的文件路径</td>
            </tr>
            <tr>
                <td>error</td>
                <td>Function</td>
                <td>上传失败，返回错误提示</td>
            </tr>
            <tr>
                <td>showList</td>
                <td>Boolean｜true</td>
                <td>显示上传列表，仅在multiple=true时有效</td>
            </tr>
        </table>
    </div>
</template>
<script type="text/ecmascript-6">
    import Upload from '../components/upload/index'
    export default {
        name: 'upload',
        path: '/upload',
        data () {
            return {
                images: [],
                progress: '',
                action: 'http://172.17.2.18/vue/upload.php',
                inputUpload: '',
                imgUpload: '',
                imgProgress: ''
            }
        },
        props: {},
        components: {Upload},
        methods: {
            _success(data){
                console.log('上传成功');
                console.log(data);
            },
            _error(data){
                console.log('上传失败');
                console.log(data);
            },
            _progress(num){
                console.log('完成' + num);
            },
            _success2(data){
                this.inputUpload = data;
            },
            _success3(data){
                this.imgUpload = 'http://172.17.2.18/vue/' + data;
            },
            _progress3(txt){
                this.imgProgress = txt;
            },
            _checkFail4(txt){
                alert(txt);
            },
            _checkFail5(txt){
                //上传文件不合法，超出大小或文件格式不对
                console.log(txt);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style>
    /*上传图片进度示例*/
    .img-upload{ position: relative; width: 120px; height: 120px; margin-bottom: 10px }
    .img-upload span{ position: absolute; left: 0; bottom: 0; height: 5px; background: #1dc116; }
</style>
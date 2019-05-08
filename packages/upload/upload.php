<?php
//PHP服务端接收示例代码
header("Access-Control-Allow-Origin: *");

$picname = $_FILES['file']['name'];
move_uploaded_file($_FILES['file']['tmp_name'],'upload/'.$picname);  
echo json_encode('upload/'.$picname);

//数组
//$name = $_FILES['file']['name']; 
//foreach ($name as $k=>$names){
//	move_uploaded_file($_FILES['file']['tmp_name'][$k],'upload/'.$name[$k]);
//	}
//echo '批量上传成功'
?>
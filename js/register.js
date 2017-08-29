$(function(){
	$('#yzm').focus(function(){
		var a = Math.random().toString(25).substring(3,4);
		var b = Math.random().toString(25).substring(4,5);
		var c = Math.random().toString(25).substring(5,6);
		var d = Math.random().toString(25).substring(7,8);
		//作为全局变量，便于下边获取
		str   = '' + a + ' ' + b + ' ' + c + ' '+ d;
		$('.sp-yzm').html(str);
 		$('.sp-yzm').fadeIn();	
 	})
});

/*检查注册*/
function checkRegister() {
	//获取输入框的值
	var 
		sPhone = $('#phone').val(),
		sYzm   = $('#yzm').val(),
	    sPass  = $('#setPas').val();
	    
	
	//手机号格式，密码格式
	var 
		oReg   = /^1\d{10}$/,
 		oReg1  = /^\d{1}\w{5,7}/;
 	
 	//判断手机号
 	if(sPhone === '' || !(oReg.test(sPhone))) {
 		alert('请输入正确的手机号！');
 		$('#phone').focus();
   		return false;
 	}else{
		//查看JSON是否存在该用户
		$.get("../data/users.json",function(data){
			//遍历JSON返回的数据
			$.each(data,function(i,n){
				//判断数据库中是否有该用户
				if(data[i].phone == sPhone) {
					alert('该用户已存在！');
					$('#phone').focus();
					return false;
				}
			});
		});
		
		//取出中间的空格
		var oReg2  = /\s/g;
		var str1   = str.replace(oReg2,'');
		//验证码
		if(sYzm === '' || sYzm != str1) {
			alert('请输入正确的验证码！');
			$('#yzm').focus();
			return false;
		} 
		
		/*检查密码*/
		if(sPass == '' || !(oReg1.test(sPass))) {
			alert('密码格式为6-8位的字母、数字和下划线组成！');
			$('#setPas').focus();
			return false;
		}
 	}
 	alert('注册成功，请登录！');
 	//跳转页面
	window.location.href = '../html/login.html';
}


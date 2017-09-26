function checkLogin() {
	//获取输入框的值
	var
	 	sPhone = $('#phone').val(),
	 	sPass  = $('#password').val();
	
	//进行登录判断
	if(sPhone === '' || sPass === '') {
		alert('请输入正确的信息！');
		$('#phone').val('');
		$('#phone').focus();
		return false;
	}else {
		$.get('../data/users.json',function(data){
			$.each(data,function(i,n){
//				console.log(data[i].phone);
//				console.log(sPhone);
				//如果手机号和密码都验证成功
				if(data[i].phone == sPhone && data[i].pass == sPass) {
					alert('登录成功啦！');
					window.location.href = '../index.html?' + data[i].name;
					return false;
				}else {
					alert('用户名或密码错误！');
					return false;
				}
			})
		})
	}
	
	//然后清空内容
	$('#phone').empty();
	$('#password').empty();
}


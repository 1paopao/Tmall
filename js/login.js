function checkLogin() {
	//获取输入框的值
	var
	 	sPhone = $('#phone').val(),
	 	sPass  = $('#password').val();
	
	if(sPhone === '' || sPass === '') {
		alert('请输入信息！');
		return false;
	}else {
		//获取JSON接口的数据
		$.get('../data/users.json',function(data) {
			//遍历信息进行比较
			$.each(data,function(i,n){
				//查找是否含有
				if(sPhone !== data[i].phone  &&  sPass !==  data[i].pass) {
					alert('信息不匹配');
					return false;
				}
			})
			alert('天猫超市欢迎你');
		});
		
		window.location.href = '../index1.html';
		//跳转页面
	}
	
//		$(window).load('../html/register.html');
		
}

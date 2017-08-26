/*页面加载完成*/
$(function(){
	//左侧菜单显示
	showMainLeft();
	//显示二级菜单
	showLeftCont();
});


/*显示左侧一级菜单*/
function showMainLeft() {
	//获取一级菜单的内容
	$.get('data/list.json',function(data){
		//console.log(JSON.stringify(data));
	    //设置模板
		var html =  template('foods',data); 
		//填充内容
		$('#mainLeft').html(html);
	});
};

/*显示二级菜单*/
function showLeftCont() {
	//用事件委托写
	$('#mainLeft').on('mouseenter','li',function(){
		//二级菜单显示
		$('#leftCont').fadeIn();
		var index = $(this).index();
		$.get('data/listClassify.json',function(data) {
			//创建模板
			var html1 = template('subview',data[index]);
			//将模板内容显示在页面上
			$('#subview1').html(html1);
			//每次滑动，top改变
			var iTop  = 73;
			//滑动到第三个的时候，top不在改变
			if(index < 3) {
				var a = iTop * index;
			}else {
				var a = iTop * 3;
			}
			//设置显示模块的top值
			$('#leftCont').css({'top':　a});
		})
	})
};


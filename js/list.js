$(function(){
	//树形菜单
	showTree();
	//显示商品列表信息
	showGoodMsg();
});


/*左侧菜单栏的树*/
function showTree() {
		//添加图标
	$('.listLeft li').has('ul').css({'list-style-image':'url(../images/list/-.gif)'})
	//当点击二级菜单的时候
	$('.listLeft li').has('ul').click(function(e){
		//阻止事件冒泡
		e.stopPropagation();
		if($(this).children().css('display') === 'block') {
			//隐藏匹配的元素
			$(this).children().slideUp();
			$(this).css({'list-style-image':'url(../images/list/1.gif)'})
		}else{
			$(this).children().slideDown();
			$(this).css({'list-style-image':'url(../images/list/-.gif)'})
		}
	})
}

/*显示商品信息*/
function showGoodMsg() {
	//获取json数据
	$.get('../data/milk.json',function(data) {
		//获取内容
		var html = template('milk',data);
		$('.rbottom').html(html);
			
		//点击购物车按钮
		$('.rprice2').on('click',function(){
			//获取点击的商品的id
			var sId = $(this).attr('data-id');
			//将该商品存储在cookie中
			cookie(sId,1,false);
		});
	});

}








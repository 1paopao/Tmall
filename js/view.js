$(function(){
	//显示信息
    showMsg();
	//选项卡事件
	viewCard();
	//添加购物车
	addGood();
	//添加数量
	addNum();
	//减少数量
	plus();
})

//显示商品详情
function showMsg(){
			var sId = location.search;
			//截取字符串,获取商品id
			var sid   = sId.slice(4);
			//遍历JSON中的数据
			$.get('../data/milk.json',function(data){
//				console.log(data);
//				console.log(data.milk);
				//id与json数据进行对比
				$.each(data.milk,function(i,n){
					if(data.milk[i].id == sid) {
						//创建模板
						var html = template('milk',data.milk[i]);
						$('.single-bottom').html(html);
					}
				})
			});
}


//选项卡
function  viewCard() {
	//点击每个li
	$('.viewMtop>li').each(function(){
		//获取下标
		var index = $(this).index();
		//获取点击事件
		$(this).click(function(){
			//修改滑动时显示的样式
			$(this).addClass('active')
			.siblings().removeClass('active');
			$(this).find('span').css({'borderRight':'0'});
			//根据下标找到内容中要跳转的页面，找到第几个子节点的进行显示
			$('.viewcont').children().eq(index).fadeIn()
			.siblings().fadeOut();
		})
	});
}

//添加数量
function addNum() {
	$(document).on('click','.add',function(){
		//获取input的值
		var oNum = $(this).parent().prev();
		var sNum = Number(oNum.val());
		//每次点击就加1
		sNum += 1;
		//将新的数量放到input中
		oNum.val(sNum);
	})
}

//减少数量
function plus() {
	$(document).on('click','.plus',function(){
		//先获取商品的个数
		var oNum = $(this).parent().prev();
		var sNum = Number(oNum.val());
		if(sNum  > 1) {
			//每点一次就减1
			sNum -= 1;
			//将最后的值写进去
			oNum.val(sNum);
		}
		//判断sNum 与  1的大小
		if(sNum == 1 || sNum < 0) {
			oNum.val(1);
			return false;
		}
	})
}


//加入购物车事件
function addGood() {
	//绑定点击事件
	$(document).on('click','.singleBtn',function(){
		console.log(1);
		//获取该商品的id
		var sId  = $(this).attr('data-id');
		//获取到该商品的数量
		var oNum = $(this).siblings(".totalNum").find("input[type='text']");
		var iNum = Number(oNum.val());
		//存到cookie中
		cookie(sId,iNum,false);
		
		console.log(cookie);
	})
}

$(function(){
	//获取cookie
	var sCookie  = $.cookie("cart");
	//将其转换为对象
	var oCookie  = sCookie ? JSON.parse(sCookie) : {};
	//每次满足条件data.milk[a].id == i  index就自加
	var index    = 0;
	//小计
	var subTotal = 0;
	//获取到商品个数的对象
	var oI  =  $('.cartlist').find('li:first i');
	//总件数
	var oTolNum  = $('.num').children();
	//总价钱
	var oTolPrice= $('.alltotal').children();
	

	//获取json数据
	$.get('../data/milk.json',function(data){
		//遍历json中取出的数据，注意修改索引的变量，会影响下面的
		$.each(data.milk,function(a,n){
			//遍历得到的cookie，判断cookie中含有json数据中的哪些商品
			for(var i in oCookie) {
				//取出cookie中存放的数据对应的内容
				if(data.milk[a].id == i) {
					var html = template('milk1',data.milk[a]);
					$('.cartgoods1').append(html);
					//获取到input输入框
					//将cookie中的值传入到输入框中
					//定位输入框，然后每次循环一次就将对应的数量放进去
					$('.nums').eq(index++).val(oCookie[i]);
				}
				//选择的商品的个数，显示在页面
				oI.html(index);
			}
		});
		
	
			
		//点击“-”进行数量的控制
		$('.prev').on('click',function(){
			//获取输入框的对象
			var oNum = $(this).next(); 
			//获取商品的id
			var sId = $(this).parent().attr('id');
			//通过id找到cookie对应的数量
			//每次点击时数量减少
			if(oCookie[sId]  > 1) {
				//每点一次就减1
				var num = --oCookie[sId];
				//将最后的值写进去
				oNum.val(num);
				//存放到cookie中
				cookie(sId,num,true);
				//计算小计，仍在完善
				
				return false;
			}
			//判断sNum 与  1的大小
			if(oCookie[sId] == 1) {
				oNum.val(1);
				cookie(sId,num,true);
				return false;
			}
		});
		
		//点击“+”
		$('.next').on('click',function(){
			//获取输入框的对象
			var oNum = $(this).prev(); 
			//获取商品的id
			var sId  = $(this).parent().attr('id');
			//每点击一次数量+1
			var iNum = ++oCookie[sId];
			//将值写进去
			oNum.val(iNum);
			//存入cookie中
			cookie(sId,iNum,true);
			return false;
		});
		
		
		//删除单条数据cookie
		$('.del').each(function(){
			$(this).on('click',function(){
				//获取这个商品的id
				var sId = $(this).parents('.cartgoods').attr('data-id');
				//找到含有该id的cookie
				//直接删除该元素
				delete oCookie[sId];
				//重新更新cookie
				var sCookie1 = JSON.stringify(oCookie);
				//更新cookie，调用cookie插件
				$.cookie("cart",sCookie1,{
					"path": "/",
					"expires": 7
				});
				//将页面上对应的商品删除
				$(this).parents('.cartgoods').remove();
				//商品数量减1
				index--;
				oI.html(index);
				//防止页面刷新
				return false;
			})
		});
		
		//总计
		function getTotal() {
			//选择的总件数
			var iSelected = 0;
			//选择商品的价钱
			var iPrice    = 0;
			
			//遍历每个商品
			$('.cartgoods').each(function(){
				//判断每个商品的单选框是否被选中
				if($(this).find('input:first').is(':checked')){
					//数量累加
					iSelected += parseInt($(this).find('input:last').val());
					//金额累加
					iPrice    += parseFloat($(this).find('span:last').text());
					console.log($(this).find('span:last').html());
					//将值传到总件数和总价钱上
				}
					oTolNum.html(iSelected);
					oTolPrice.html(iPrice.toFixed(2));
			})
		}
		//调用总价钱
		getTotal();
		
		
		
		
		
		//获取到所有的选择框
		var oSelect  = $(':checkbox');
		//遍历选择框
		$(':checkbox').each(function(i){
			$(this).on('click',function(){
//				alert(this.className);
				//如果是全选按钮,则所有的单选框都要被选择
				if(this.className === 'allSel') {
					$(':checkbox').each(function(){
						//设置checked为checked
						$(this).attr('checked','checked');
					})
				}
				
				//如果单选框的按钮被取消掉了,则“全选按钮”的都要消失掉
				if(this.checked == false) {
					$('.allSel').each(function(){
						$(this).removeAttr('checked');
					})
				}
				//获取总的商品价钱
				getTotal();
			})
		});
		
		
		
		//全删按钮
		var oTolDel = $('.alloper').find('a').eq(0);
		oTolDel.on('click',function(){
			if(oTolNum.html != 0) {
				var conf = confirm('你确定要删除嘛？');
				if(conf) {
					//遍历每一个商品
					$('.cartgoods').each(function(){
						//如果被选中
						if($(this).find('input:first').is(':checked')){
//							console.log($(this).attr('data-id'));
							//找到该商品的id
							var sId = $(this).attr('data-id');
							//删除cookie
							delete oCookie[sId];
							//重新更新cookie
							var sCookie1 = JSON.stringify(oCookie);
							console.log(sCookie1);
							//更新cookie，调用cookie插件
							$.cookie("cart",sCookie1,{
								"path": "/",
								"expires": 7
							});
							//将页面上对应的商品删除
							$(this).remove();
							//商品数量减1
							index--;
							oI.html(index);
							//防止页面刷新
							return false;
						}
					})
				}
			}
		});
		
		//默认所有的选择框都是选择的
		$(':checkbox').each(function(){
			$(this).attr('checked','checked');
			//获取总的商品价钱
			getTotal();
		});
		

		
		//小计
		$('.nums').each(function(){
			//获取小计的对象
			var oSubtotal = $(this).parent().next().find('span');
			//获取到数量
			var iNum      = $(this).val();
			//定位到价格
			var oPrice    = $(this).parent().prev().find('span');
			//获取值
			var iPrice    = oPrice.html();
			//保留两位小数
			var subTotal  = Number(iNum  *　iPrice).toFixed(2);
			//设置值
			oSubtotal.text(subTotal);
		});
		
    }) 
});



	
	
	



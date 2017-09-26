$(function(){
		//获取元素对象
	var 
		oBox  = $('#spxq'),
		aLi   = $('#img-list li'),
		aSpan = $('#btn-list span');
	
	var iIndex= 0,//图片的个数
		oTimer= null;
	
	//鼠标进入
	oBox.on('mouseenter',function(){
		//清除定时器
		clearInterval(oTimer);
	});
	
	//鼠标移除
	oBox.on('mouseleave',function(){
		//定时器
		oTimer = setInterval(function(){
			iIndex++;
			if(iIndex >= 5) {
				iIndex = 0;
			}
			//根据下标找到对应的图片,进行滑动
			aLi.eq(iIndex).animate({'opacity':'1'}).siblings().animate({'opacity':'0'});
			//小图标跟随图标运动
			aSpan.eq(iIndex).addClass('active').siblings().removeClass('active');
		},2500)
	});
	
  //鼠标滑动到小圆圈显示相对应的图片
	aSpan.each(function(){
		//span下标
		var index = $(this).index();
		$(this).mouseenter(function(){
			//根据下标找到该图片
			aLi.eq(index).animate({'opacity':'1'},500)
			.siblings().animate({'opacity':'0'},500);
			//小圆标随着变化
			aSpan.eq(index).addClass('active')
			.siblings().removeClass('active');
		})
	});
	
	
		//定时器
		oTimer = setInterval(function(){
			iIndex++;
			if(iIndex >= 5) {
				iIndex = 0;
			}
			//根据下标找到对应的图片,进行滑动
			aLi.eq(iIndex).animate({'opacity':'1'}).siblings().animate({'opacity':'0'});
			//小图标跟随图标运动
			aSpan.eq(iIndex).addClass('active').siblings().removeClass('active');
		},2500)
})

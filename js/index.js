/*页面加载完成*/
$(function(){
	//左侧菜单显示
	showMainLeft();
	//显示二级菜单
	showLeftCont();
});


/*==============页面滚动===============*/
$(document).scroll(function(){
	//设置为全局，供页面功能使用
	iScrH = $(this).scrollTop();
	//导航定位
	showMenu();
	
	
	
});


/*========导航定位=============*/
function showMenu(){
	//获取页面滚动的高度，左侧菜单的相对文档的距离，和导航栏相对文档的距离
	var 
		iConH = $('.cont1').offset().top,
		iH    = $('.nav-wrap').offset().top;
	//当页面滚动的高度大于等于top的时候
	if(parseInt(iScrH) >= parseInt(iH)) {
		$('.nav-wrap').css({
			'position':'fixed',
			'background':'#fff',
			'top':'0',
			'z-index':'4',
			'border-top':'1px solid #2f2f2f',
			'border-bottom':'2px solid #2f2f2f'
		});
	//当滚动的高度小于固定的top值，回到原来的位置
		if(parseInt(iScrH) < 122) {
			$('.nav-wrap').css({
				'position':'relative',
				'background':'#fff',
				'top':'120',
				'z-index':'1',
				'border-top':'none',
				'border-bottom':'none'
				}
			);
			$('.nav').css({
				'border-bottom':'2px solid #2f2f2f'
			});
		}
	}
	
	//鼠标移动到菜单的时候显示分类
	if(parseInt(iScrH) >= parseInt(iConH)) {
		$('.classify').mouseenter(function(){
			$('#main1').css({
					'width':'240px',
					'position':'fixed',
					'top':'38px',
					'z-index':'1'
			});
		});
		
		//鼠标离开菜单，菜单消失
		$('#main1').mouseleave(function(){
			$('#main1').css({
				'width':'240px',
				'position':'relative',
				'top':'0px',
				'z-index':'2'
			});
		});

		//当小于它的top的时候，回到原来的位置
		if(parseInt(iScrH) <= 781) {
			$('#main1').css({
				'width':'240px',
				'position':'relative',
				'top':'0px',
				'z-index':'0'
			});
		}
	}
};


/*=============显示左侧一级菜单=============*/
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
	});
	
	//定位到整个菜单div,这样鼠标才能进入
	$('#main1').on('mouseleave',function(){
		//二级菜单消失
		$('#leftCont').fadeOut();
	});
};




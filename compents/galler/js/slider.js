var Silder = {
	silderIndexs: '.silder-index',
	leftBtn: '#leftBtn',
	rightBtn: '#rightBtn',
	itemWrap: '#itemWrap',
	subItem: '#itemWrap .sub-item',
	exdends: {},/*扩展参数*/
	init: function(params){
		if(params){
			this.sliderCreate(params);
		}

		this.scroll();
		this.autoTurnLeft();
		this.sliderIndex();
	},
	//初始配置
	sliderCreate(params){
		for(var ele in params){
			if(params[ele]){
				Silder[ele] = params[ele];
			}
		}
	},
	scroll: function(){
		//jquery对象实例化
		var $itemWrap = $(this.itemWrap);
		var $imgItems = $(this.subItem);
		var $leftBtn = $(this.leftBtn);
		var $rightBtn = $(this.rightBtn);
		var $silderIndexs = $(this.silderIndexs);
		
		$leftBtn.on('click', function(){
			$itemWrap.animate({
				'margin-left': 0 - $imgItems.width()
			}, 1000, function(){
				$itemWrap.append($(Silder.subItem).first());
				$itemWrap.css("margin-left",0);
			})
			//对应导航图标激活状态绑定
			var currentIndex = $(Silder.subItem).first().attr('data-index');
			$silderIndexs.each(function(){
				$this = $(this);
				if($this.attr('data-index') == (currentIndex-0+1)){
					$this.addClass('active');
				}else{
					$this.removeClass('active');
				}
			})
		})
		$rightBtn.on('click', function(){
			$itemWrap.prepend($('#itemWrap .sub-item').last());
				$itemWrap.css("margin-left",0 - $imgItems.width());
			$itemWrap.animate({
				'margin-left': 0
			}, 1000)

			//对应导航图标激活状态绑定
			var currentIndex = $(Silder.subItem).last().attr('data-index');
			$silderIndexs.each(function(){
				$this = $(this);
				if($this.attr('data-index') == (currentIndex-0+1)){
					$this.addClass('active');
				}else{
					$this.removeClass('active');
				}
			})
		})
	},
	//自动轮播
	autoTurnLeft: function(Time){
		var $leftBtn = $(this.leftBtn);
		var Time = Time || 5000;
		this.exdends['s_leftInterval'] = setInterval(function(){
			$leftBtn.trigger('click');
		}, Time);
	},
	autoTurnRight: function(Time){
		var $rightBtn = $(this.leftBtn);
		var Time = Time || 5000;
		this.exdends['s_rightInterval'] = setInterval(function(){
			$rightBtn.trigger('click');
		}, 5000)
	},
	//取消轮播
	cancelTurnLeft: function(){
		clearInterval(this.exdends['s_leftInterval']);
	},
	cancelTurnRight: function(){
		clearInterval(this.exdends['s_rightInterval']);
	},
	sliderIndex: function(){
		//jquery对象实例化
		var $itemWrap = $(this.itemWrap);
		var $imgItems = $(this.subItem);
		var $silderIndexs = $(this.silderIndexs);

		$silderIndexs.each(function(){
			$this = $(this);
			$this.on('click', function(){
				//jquery对象实例化
				$itemWrap = $(Silder.itemWrap);
				$imgItems = $(Silder.subItem);
				$silderIndexs = $(Silder.silderIndexs);

				$$this = $(this);
				var index = $$this.attr('data-index');
				$imgItems.each(function(){
					_this = $(this);
					if(_this.attr('data-index') == index){
						$itemWrap.css('margin-left', 0);
						//退出循环
						return false;	
					}else{
						$itemWrap.append($(Silder.subItem).first());
					}
					//导航按钮状态切换
					$silderIndexs.removeClass('active');
					$$this.addClass('active');				
				})
			})
		})
	}
}

$(function(){
	Silder.init();
})
var Silder = {
	itemWrap: '#itemWrap',
	subItem: '#itemWrap .sub-item',
	silderIndexs: '.silder-index',
	leftBtn: '#leftBtn',
	rightBtn: '#rightBtn',
	init: function(){
		//jquery对象实例化
		this.itemWrap = $(this.itemWrap);
		this.imgItems = $(this.subItem);
		this.silderIndexs = $(this.silderIndexs);
		this.leftBtn = $(this.leftBtn);
		this.rightBtn = $(this.rightBtn);

		this.scroll();
		this.sliderIndex();
	},
	scroll: function(){
		var $itemWrap = this.itemWrap;
		var $imgItems = this.imgItems;
		var $leftBtn = this.leftBtn;
		var $rightBtn = this.rightBtn;
		var $silderIndexs = this.silderIndexs;
		
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
	sliderIndex: function(){
		var $silderIndexs = this.silderIndexs;
		var $itemWrap = this.itemWrap;
		var $imgItems = this.imgItems;
		$silderIndexs.each(function(){
			$this = $(this);
			$this.on('click', function(){
				$$this = $(this);
				var index = $$this.attr('data-index');
				var currentIndex = 0;
				$imgItems.each(function(){
					_this = $(this);
					if(_this.attr('data-index') == index){
						$itemWrap.animate({
							'margin-left': 0 - $imgItems.width()*currentIndex
						}, 1000)
						//导航按钮状态切换
						$silderIndexs.removeClass('active');
						$$this.addClass('active');
						return true;
					}
					currentIndex++;				
				});
			})
		})
	}
}

$(function(){
	Silder.init();
})
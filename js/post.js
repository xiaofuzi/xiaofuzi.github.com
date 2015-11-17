/*更多文章查看*/
var Post = {
	init: function(){
		this.showContent();
		this.upToTop();
	},
	//show more content
	showContent: function(){
		var $postMoreContent = $(".post-more");
		$postMoreContent.hide();
		$(".postMore").on('click', function(){
			$this = $(this);
			$this.parent().find('.post-more').toggle();
			if($this.attr("data-show") == 'false'){
				$this.text('查看文章摘要');
				$this.attr("data-show", 'true');
			}else{
				$this.text('......查看全文');
				$this.attr("data-show", 'false');
			}
		})
	},
	//up to top
	upToTop: function(){
		var $upTop = $("#upToTop");
		$(window).scroll(function(){
			console.log($(window).scrollTop());
			if($(window).scrollTop() > 1200){
				$upTop.css("display", "block");
			}else{
				$upTop.css("display", "none");
			}
		})
		$upTop.on("click", function(){
			$('body,html').animate({scrollTop:0},500); 
		})
	}
}

$(function(){
	Post.init();
})
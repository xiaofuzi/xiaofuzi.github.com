/*更多文章查看*/
var Post = {
	init: function(){
		this.showContent();
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
	}
}

$(function(){
	Post.init();
})
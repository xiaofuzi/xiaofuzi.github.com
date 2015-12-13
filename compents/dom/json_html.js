/*测试数据*/
var container = {
    div: {
        attr: {
            id: "headerWrapper",
            class: "cf"
        },
        innerHTML: {
            header: {
                attr: {
                    id: 'header',
                    class: 'cf'
                },
                innerHTML: {
                    attr: null,
                    innerHTML: {
                        img: {
                            attr: {
                                class: "image"
                            },
                            innerHTML: ''
                        }
                    }
                }
            },
            div: {
                attr: null,
                innerHTML: "yangxiaofu"
            }
        }
    }
}



var json_html = function(jsonData) {
    var process = {
        html: null,
        srcData: jsonData
    }

    /*辅助函数*/
    var _helper = {
            /*自闭合标签处理*/
            self_close: ['img', 'input'],
            is_close: function(tag) {
                for (var key in this.self_close) {
                    if (tag == key) {
                        return true;
                    }
                    //console.log("1111",key);
                }
                return false;
            }
        }
        //process.__proto__ = _helper;

    process.render = function(data) {
        var data = data || null;
        var _html = '';
        if (typeof data != 'object' || data == null) {
            _html = data;
            return _html;
        } else if(data.innerHTML) {
            console.log("tag", data.innerHTML);
            if (_helper.is_close(tag) == true) {
                /*自闭合标签没有子元素*/
                /*<img src="" alt="">*/
                _html += '<' + tag + ' />';
            } else {
                _html += '<' + tag + '>';
                console.log('11111', tag, data, data[tag]);
                if (typeof data[tag]['innerHTML'] == 'string') {
                    _html += data[tag].innerHTML;
                } else {
                    _html += this.render(data[tag]['innerHTML']);
                }
                _html += '<' + tag + '/>';
            }
        }
        return _html;
    }
    return process;
}




var return_data = json_html(container);
console.log('html:', return_data.render(container));

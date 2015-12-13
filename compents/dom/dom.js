/*查询dom元素：querySelector和querySelectorAll，对其进行封装*/
var qs = function(selector, parent) {
    /*如果没指定父级则默认为document*/
    parent = parent || document;
    return parent.querySelector(selector); /*返回匹配的第一个值*/
};

var qsa = function(selector, parent) {
    parent = parent || document;
    return parent.querySelectorAll(selector); /*返回所有匹配的值*/
}

/*dom操作函数*/
var dom = function(el, parent) {
    var api = {
        el: null
    }

    /*选择符类型：
    DOM元素——类库的val方法会非常方便，所以我们可能需要使用已经引用的元素；
    JavaScript对象——为了创建包含多个DOM元素的JavaScript对象。
    */

    switch (typeof el) {
        case 'string':
            parent = parent && typeof parent === 'string' ? qs(parent) : parent;
            api.el = qs(el, parent);
            break;
        case 'object':
            if (typeof el.nodeName != 'undefined') {
                /*说明el是一个DOM元素*/
                api.el = el;
            } else {
            	var loop = function(value, obj){
            		obj = obj||this;
            		for(var prop in obj){
            			if(typeof obj[prop].el != 'undefined'){
            				obj[prop] = obj[prop].val(value);
            			}else if(typeof obj[prop] == 'object'){
            				obj[prop] = loop(value, obj[prop]);
            			}
            		}
            		//delete obj.val;
            		return obj;
            		console.log(obj);
            	}
                var res = {
                	val: loop
                };
                for (var key in el) {
                    res[key] = dom(el[key], parent);
                }
                return res;
            }
            break;
    }

    api.val = function(value) {
        if (!this.el) return null;
        var set = value ? true : false;
        var userValueProperty = function(value) {
            if (set) {
                this.el.value = value;
                return api;
            } else {
                return this.el.value;
            }
        }
        switch (this.el.nodeName.toLowerCase()) {
            case 'input':
                var type = this.el.getAttribute('type');
                if (type == 'radio' || type == 'checkbox') {
                    var els = qsa('[name="' + this.el.getAttribute('name') + '"]', parent);
                    values = [];
                    for (var i = 0; i < els.length; i++) {
                        if (set && els[i].checked && els[i].value !== value) {
                            els[i].removeAttribute('checked');
                        } else if (set && els[i].value === value) {
                            els[i].setAttribute('checked', 'checked');
                            els[i].checked = 'checked';
                        } else if (els[i].checked) {
                            values.push(els[i].value);
                        }
                    }
                    if (!set) {
                        return type == 'radio' ? values[0] : values;
                    }
                } else {
                    return userValueProperty.apply(this, [value]);
                }
                break;
            case 'textarea':
                return userValueProperty.apply(this, [value]);
                break;
            case 'select':
                if (set) {
                    var options = qsa('option', this.el);
                    for (var i = 0; i < options.length; i++) {
                        if (options[i].getAttribute('value') === value) {
                            this.el.selectIndex = i;
                        } else {
                            options[i].removeAttribute('selected');
                        }
                    }
                } else {
                    return this.el.value;
                }
                break;
            default:
                if (set) {
                    this.el.innerHTML = value;
                } else {
                    if (typeof this.el.textContent != 'undefined') {
                        return this.el.textContent;
                    } else if (typeof this.el.innerText != 'undefined') {
                        return typeof this.el.innerText;
                    } else {
                        return this.el.innerHTML;
                    }
                }
                break;
        }
        return set ? api : null;
    }
    return api;
}

// console.dir(dom("p").el);
// console.dir(dom(dom("p").el).el);


// var els = dom({
//     footer: 'footer',
//     paragraphs: {
//         header: 'header p',
//         footer: 'footer p'
//     }
// })


// 最后我们在此得到JavaScript对象。
// 它的属性是实际的结果
// 执行dom函数。例如，获取值
// footer是paragraphs的属性
// console.log('els:',els);
// els.paragraphs.footer.el


var formValue = dom({
    name: '[type="text"]',
    data: {
        options: '[type="radio"',
        count: 'select'
    },
    version: 'footer'
}, 'form');

console.log(formValue.val());


/**
 * Created by 楠 on 2017/6/9.
 */

/**
 * 首先理解需求，定义一个create方法，可以创建元素，创建标签属性，创建子元素，
 * */
window.dom={}; // 必须写
window.dom.create=function(tagName,child,attr){
    var tag = document.createElement(tagName);

    if(typeof child === 'string'){
        var text = document.createTextNode(child);
        tag.appendChild(text);
    }else if(child instanceof HTMLElement){
        tag.appendChild(child);
    }else if(child instanceof Array){
        for(var i=0;i<child.length;i++){
            if(typeof child[i] === 'string'){
                tag.appendChild(document.createTextNode(child[i]));
            }else{
                tag.appendChild(child[i]);
            }

        }
    }

    if(typeof attr === 'object'){
        for(var key in attr){
            //  tag.style[key] = attr[key]; // 不能设置自定义样式
            tag.setAttribute(key,attr[key])
        }
    }
    return tag;
}
// 查找某一范围内的标签
window.dom.find = function(selector,scope){
    var tag = (scope instanceof HTMLElement) ? scope :document;
    return tag.querySelectorAll(selector);
}
// 删除ele的子节点
window.dom.empty = function(ele){
    var firstChild = ele.childNodes[0];
    while(firstChild){
        firstChild.remove(); //removeChild()会将text节点一一删除，remove()删除对象
        firstChild = ele.childNodes[0];
    }
}
 // 获取某一标签下的子元素
window.dom.children = function(tag){
    return tag.children;
}

// 获取某一标签下的文本内容
window.dom.text = function(tag){
    var result = '';
    for(var i=0;i<tag.childNodes.length;i++){
        if(tag.childNodes[i].nodeType === 3){
            result += tag.childNodes[i].textContent;
        }
    }
    return result;
}

// 设置属性
window.dom.attr = function(tag,attr){
    if(typeof attr === 'object'){
        for(var key in attr){
            //  tag.style[key] = attr[key]; // 不能设置自定义字体
            tag.setAttribute(key,attr[key])
        }
    }
}
// 设置样式
window.dom.style = function(tag,styles){
    for(var key in styles){
        tag.style[key] = styles[key]
    }
}
// 获取距离该标签最近的标签（不包含text节点 ）
window.dom.bigBrother = function(tag){
    var b = tag.previousSibling;
    while(b !== null && b.nodeType !== 1){
        b = b.previousSibling;
    }
    return b;
}


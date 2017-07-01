## 选择器
- 1.基本选择器：
  - \*
  - \#
  - \.
  - 后代选择器
  - 子代选择器
  - 相邻弟弟(+)
  - 所有弟弟(~)
  - 组合选择器(,)
- 属性选择器
  - div[class]{*只是用属性名 选择出含有这个属性名的元素*}
  - div[class="box1"]{*指定属性名=属性值 必须是一模一样*}
  - div[class*="box"]{*属性名中包含了指定的属性值只要属性值这个字符串中含有指定属性值字符*}
  - div[class~="box"]{*先将属性值按照空格拆分再判断是否含有属性值*}
  - div[class^="box"]{*属性值以什么什么开头*}
  - div[class$="box2"]{*属性值以什么什么结尾*}
  - div[class|="box"]{*属性名等于box或者是以box-为前缀*}
- 动态伪类选择器
  - a:hover{*鼠标放上*}
  - a:focus{*获取焦点 一般用在表单元素上*}
  - a:active{*鼠标点一下的时候效果*}
  - a:visited{*一般用在锚点链接 链接被访问过*}
  - a:link{*一般用在锚点链接 链接未被访问过*}
- UI伪类选择器 *Ie6-8不支持这三*
  - input:disabled{}
  - input:enabled{}
  - input:checked{}
- 结构伪类选择器
  -  div:first-child{*选择第一个子元素*}
  -  div :last-child{*选择最后一个子元素*}
  -  div :nth-child(2){
				*选取第几个子元素 从前面数*
				*nth-child(n) 所有的n是整数从1开始*
				*nth-child(3n)*
				*nth-child(2n)*
				*nth-child(2n+1)*
			}
	- div :nth-last-child(1){*倒着数*}
	- div :nth-of-type(2){*同类型的第几个 从头开始数*}
	- div :nth-last-of-type(1){*从结尾开始数*}
	- ul :first-of-type{*同类型的第一个*}
	- ul :last-of-type{*同类型的最后一个*}
	- div :only-child{*父级只有他一个孩子*}
	- div :only-of-type{*父级只有他一个同类型孩子*}
	- div :empty{*没有任何内容的div里面的元素*}
- 伪元素选择器（伪元素 :: :都可以）
	- :after
	- :before
	- :first-line
	- :first-letter

## 渐变
### 线性渐变
- 从顶部到底部：top,to bottom,
- 从底部到顶部：bottom,to top,
- 从左到右：left，to right
- 从右到左：left，to right
- 从右下角到左上角：bottom right，to top left，
- 从左下角到右上角：bottom left，to top right，
- 自定义渐变 颜色后面加百分比

### 径向渐变
- 50px 200px
- circle
- ellipse
- 200px 200px at 0px 0px
- circle at top
- circle at 0 50%
- circle closest-side/closest-corner
- circle farthest-side/farthest-corner
- -webkit-repeating-radial-gradient

## 边框
### box-show（x y a b c i）
- x:水平方向偏移 正：右边 负值：左边
- y:垂直方向偏移 正：下边 负值：上边
- a:模糊半径
- b:延伸半径
- c:颜色
- i:inset 设置内阴影
### border-radius
```
border-radius:50px 70px 60px/80px 90px 70px；
border-top-left-radius: 30px 40px;
半圆
椭圆
```
### border-images
    stretch 拉伸 默认值
    round  平铺
    repeat  复制
### 制作按钮
```
.border-image-btn{
	display: inline-block;
	border: 18px solid green;
	border-width:0 18px ;
	border-image: url(../img/button_sprite.png) 0 18 50 18;
	text-decoration: none;
	padding: 13px 10px 17px;
	color: #fff;
	font-size: 16px;
	font-weight:bold;
	line-height: 15px;
	margin: 10px;
}
.border-image-btn:hover{
	border-image: url(../img/button_sprite.png) 50 18 0 18;
	text-decoration: none;
}
```
## 背景
### background-origin
`顾上不顾下，顾左不顾右，只要超出边框就可以`

- border-box  从border的外边界算起
- padding-box 从padding的外边界算起 也就是把padding算在内
- content-box 从padding的内边界算起

### background-clip
- border-box
- padding-box
- content-box

### 背景图片的字体
    webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
### background-size
- auto   默认值
- 100% 100%
- cover  将图片放大 以适应铺满整个容器 宽高比例不变 会使图片失真
- contain 将图片缩小 目的是在容器中将图片完全展示 原来宽高比例不变 会使图片失真

### 多背景图，制作相框
```
.box{
	width: 240px;
	font-size: 25px;
	line-height: 1.5;
	text-align: center;
	border:20px solid rgba(104,104,142,.5);
	padding: 60px 40px;
	border-radius:10px ;
	color: #f36;
	background: url(../img/bg-tl.png)        no-repeat top left,
        url(../img/bg-tr.png) no-repeat top right,
        url(../img/bg-br.png) no-repeat bottom right,
        url(../img/bg-bl.png) no-repeat bottom left,
        url(../img/bg-repeat.png) repeat left top;
	background-origin: border-box,border-box,border-box,border-box,padding-box;

}
```
## 文本
### text-overflow:clip/ellipsis
- clip:表示不显示省略标记 只是简单的裁剪，但是在一定的高度范围内配合使用overflow：hidden
- ellipsis:超出部分用省略号表示 配合使用overflow：hidden  white-space: nowrap 才有效果;

### word-wrap:normal|break-word
- norma:默认值 控制连续文本换行（允许内容撑破容器边界
- break-word:将内容在容器边界换行（不截断英文单词例如：aaaaaa）如果想截断英文单词就用word-break:all;

### word-break:normal|break-all|keep-all
- word-break:normal  默认值中文换行 英文不换行
- word-break:break-all 可以强行截断英文换行
- word-break:keep-all 不允许：断开。中文把前后标点符号内的一个汉字或短语整个换行

### text-show
```
.text-wrap{
	background-color: #665757;
	width: 600px;
	margin: 15px auto;
	padding: 10px 0;
	border: 5px solid #ccc;
	position: relative;
	font-size: 50px;
	color: #f7edf7;
	clear: both;
	text-align: center;
	letter-spacing: 5px;
	box-shadow: 0 0 0 rgb(188,178,188),
	            1px 1px 0 rgb(173,163,173),
	            2px 2px 0 rgb(157,147,157),
	            3px 3px 0 rgb(142,132,142),
	            4px 4px 0 rgb(126,116,126),
	            5px 5px 0 rgb(111,101,111),
	            6px 6px 5px rgba(0,0,0,0.4);
}
.text2{
	text-shadow: 0 0 0 rgb(188,178,188),
	            1px -1px 0 rgb(173,163,173),
	            2px -2px 0 rgb(157,147,157),
	            3px -3px 0 rgb(142,132,142),
	            4px -4px 0 rgb(126,116,126),
	            5px -5px 0 rgb(111,101,111),
	            6px -6px 0 rgb(95,85,95),
	            7px -7px 0 rgb(79,69,79),
	            8px -8px 7px rgba(0,0,0,.2),
	            8px -8px 1px rgba(0,0,0,.5),
	            0px 0px 7px rgba(0,0,0,.3);
}
.text1:active{
	box-shadow: 0 0 0 rgb(188,178,188),
	            1px 1px 0 rgb(173,163,173);
	top:14px;
}
```
### 字体图标
https://icomoon.io/
### 制作按钮
```
.btn-bevel{
	border: none;
	border-radius: 4px;
	padding: 10px 25px 12px;
	font-family: arial,helvetica,sans-serif;
	font-size: 13px;
	color: #fff;
	text-decoration: none;
	text-align: center;
	display: inline-block;
	margin: 10px;
	cursor: pointer;
	text-shadow: 0 1px 1px rgba(0,0,0,0.4);
	background: rgb(120,107,201);
	background: -webkit-linear- gradient
	(top,rgba(120,107,201,1),
	rgba(120,107,201,0.8),
	rgba(120,107,201,0.5),
	rgba(120,107,201,0.3));
	box-shadow: rgba(120,107,201,0.5) 1px 6px 0,
	rgba(0,0,0,0.3) 1px 10px 3px;
}
.btn-bevel:active{
	position: relative;
	top:5px;
	box-shadow: rgba(120,107,201,0.7) 0px 1px 3px;
}
.btn{
	border: none;
	outline: none;
	display: inline-block;
	width: 80px;
	height: 80px;
	border-radius:50% ;
	margin-right: 90px;
	font-size: 0;
	background: #e982ab;
	box-shadow:0 1px 5px rgba(255,255,255,0.5) inset,
	0 -2px 5px rgba(0,0,0,0.5) inset,
	0 3px 8px rgba(0,0,0,0.8);
	background: -webkit-radial-gradient
	(closest-corner circle at top,#f28fb8,#e982ab,#ec568c);
}
.btn:hover:after{
	color: #fff;
	text-shadow:0 1px 20px #fccdda,1px 0px 15px #fccdda ;
}
 .btn:active{
	box-shadow:0 2px 2px rgba(0,0,0,0.5) inset,
	0 -3px 10px rgba(0,0,0,0.1) inset,
	0 2px 4px rgba(255,255,255,0.8);
	background: -webkit-radial-gradient
	(closest-corner circle at bottom,
	#f28fb8,#e982ab,#ec568c);
}
```
## 配色
    rgb(0-255红,0-255绿,0-255蓝)
	rgba(0-255红,0-255绿,0-255蓝,opacity)
	HSL(H色调,S饱和度,L亮度)
	HSLa(H色调,S饱和度,L亮度,opacity)
	HSL色彩模式 是工业界的一种颜色标准
	Hue:色调 0(360)红色 60黄色 120绿色 180天蓝色 240blue 300紫红色
	中间可以随意取值来代表其他颜色
	Saturation(饱和度) 0%-100%
	Lightness(亮度) 0%-100%
## 滤镜filter
- grayscale(1)：灰度
- sepia(1)  褐色
- saturate(500%) 饱和度
- hue-rotate(180deg) 色相反转
- invert(1) 反色
- opacity(0.6) 透明度
- brightness(250%) 亮度
- contrast(200%) 对比度
- blur(5px) 模糊度
- drop-shadow(2px 3px 5px rgba(0,0,0,0.8)) 阴影

## 2D变形
### 平移
    translate(x,y) 如果你传了一个就是translateX(x)
	translateX(x)
	translateY(y)
### 缩放
    scale(n) n:(0-1) 缩小 > 1表示放大
	scaleX(nX)
	scaleY(ny)
### 旋转
    rotate(deg)
### 倾斜
    skew(xdeg,ydeg)  如果传一个值代表 skewX(xdeg)
	skewX(xdeg)
	skewY(ydeg)
### 顺序问题
### 过渡
    transition: opacity 2s 1s ease-out ;
    ease:渐渐慢
	linear：匀速直线运动
	ease-in:由慢变快
	ease-out：由快变慢
	ease-in-out：由慢变快再变慢
##3D变形
    transform-style: preserve-3d;
    translateZ
    rotateX，rotateY，rotateZ
    rotate3d()

// 百度地图API功能	
map = new BMap.Map("allmap");
// 默认中心点
map.centerAndZoom(new BMap.Point(116.417854,39.921988), 5);
//启用滚轮放大缩小，默认禁用
map.enableScrollWheelZoom(); 
//启用地图惯性拖拽，默认禁用  
map.enableContinuousZoom();    

// 自定义icon
var we = new BMap.Icon("image/fox.gif", new BMap.Size(300,157));
var you = new BMap.Icon("image/fox.gif", new BMap.Size(300,157));
var i = new BMap.Icon("image/fox.gif", new BMap.Size(300,157));
var opts = {
			width : 250,     // 信息窗口宽度
			height: 120,     // 信息窗口高度
			title : "<span style='font-weight:bold'>足迹</span>" , // 信息窗口标题
			enableMessage:true//设置允许信息窗发送短息
		   };

function addToMap(data){
	data.forEach(function(item){
	// 创建标注
	var marker;  
	switch(item.customIcon){
		case "we":
		  	marker = new BMap.Marker(new BMap.Point(item.lng,item.lat),{icon:we});
		  	break;
		case "you":
		  	marker = new BMap.Marker(new BMap.Point(item.lng,item.lat),{icon:you});
		  	break;
	  	case "i":
	  		marker = new BMap.Marker(new BMap.Point(item.lng,item.lat),{icon:i});
	  		break;
	  	case "default":
	  		marker = new BMap.Marker(new BMap.Point(item.lng,item.lat));
	  		break;
		default:
		  	marker = new BMap.Marker(new BMap.Point(item.lng,item.lat));
	}

	if(item.animation && item.animation === "BOUNCE"){
		// 标注是否跳动
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	}
	// 将标注添加到地图中
	map.addOverlay(marker);               
	addClickHandler(item.content,marker);
})
}	   


function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}

function openInfo(content,e){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	// 创建信息窗口对象 
	var infoWindow = new BMap.InfoWindow(content,opts);  
	// 开启信息窗口
	map.openInfoWindow(infoWindow,point); 
}
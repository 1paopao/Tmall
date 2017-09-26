//setCookie
function setCookie(name,value,day,path){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+day);
	document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate+';path='+path;
}

//getCookie
function getCookie(name){
	var sCookie=document.cookie;
	var aCookie=sCookie.split('; ');
	for(var i=0;i<aCookie.length;i++){
		var aTemp=aCookie[i].split('=')
			if(aTemp[0]===name){
				return decodeURIComponent(aTemp[1]);
			}
	}
}
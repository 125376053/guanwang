window.onload=function(){
	//菜单弹窗
	var icontag = document.querySelector(".tag-icon"),
		shadombg= document.querySelector(".shadom-bg"),
		pop= document.querySelector(".pop-ul"); 

	icontag.addEventListener("touchend", function(e){  
	     shadombg.style.display="block";
	     pop.style.display="block";
	     e.preventDefault();
	});  
	shadombg.addEventListener("touchend",function(e){
		shadombg.style.display="none";
	     pop.style.display="none";
	     e.preventDefault();
	});
	
};
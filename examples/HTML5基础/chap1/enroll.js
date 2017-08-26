var enroll = document.getElementById("enroll");
enroll.onclick = function(e){
	e.preventDefault();
	enroll.innerHTML = "报名成功";
	enroll.style.background = "#27cb8b";
	enroll.style.borderColor = "#27cb8b";
}
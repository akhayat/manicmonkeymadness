function toggleHelp() {
	var help = $("#top").get(0);
	var middle = $("#middle").get(0);
	
	if (help.style.display === "block") {
		help.style.display = "none";
		middle.style.display = "none";
	}
	else {
		help.style.display = "block";
		middle.style.display = "block";
	}
}
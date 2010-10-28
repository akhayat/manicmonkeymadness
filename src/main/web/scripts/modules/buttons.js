function toggleHelp() {
	var help = document.getElementById("top");
	var middle = document.getElementById("middle");
	
	if (help.style.display === "block") {
		help.style.display = "none";
		middle.style.display = "none";
	}
	else {
		help.style.display = "block";
		middle.style.display = "block";
	}
}
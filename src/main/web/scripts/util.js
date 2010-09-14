$(document).ready(function() {
	m3.util = function() {
		return {
			log_count:     0,
			max_log_count: 1000,
			
			log: function(text) {
				$("#console_items").append("<p>" + text + "</p>");
				this.log_count++;
				
				if (this.log_count > this.max_log_count) {
					$("#console_items").children("p").first().remove();
				}
			},
		};
	}();
});
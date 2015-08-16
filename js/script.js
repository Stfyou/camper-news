function getStories(){
	var apiURL = 'http://www.freecodecamp.com/stories/hotStories';
	$.getJSON(apiURL, appendToDOM);
}

function appendToDOM(json){
	var rowNum = 0;
	var rowID$ = "#row";
	for(var i = 0; i < json.length; i++){
		if (i % 4 === 0){
			rowNum++;
			//check if rowID$ = $("#row" + rowNum.toString()); works
			rowID$ = "#row" + rowNum.toString();
			addRowToDOM(rowNum);
		}
		var htmlBlock = getColHtml(json[i]);
		$(rowID$).append(htmlBlock);
	}
}

function addRowToDOM(rowNum){
	rowNum = rowNum.toString();
	var rowHtml = "<div class='row' id='row" + rowNum + "'></div>";
	$('.container').append(rowHtml);
}

function getColHtml(story){
	var htmlBlock =
	"<a href = '" + story.link + "'>" +
	"<div class='col-md-3'><div class='inner-content'>" +
	"<img src='" + getImageURL(story.image, story.author.picture) +
	"'><div class='article'>" +
	"<p>" + story.headline + "</p><h4 class='author'>" + story.author.username +
  "</h4><h4 class='comments'>Comments" +
	"<span class='glyphicon glyphicon-thumbs-up pull-right' aria-hidden='true'>" +
	(story.upVotes.length+1).toString() +
	"</span></h4></div></div></div></a>";

	return htmlBlock;
}

function getImageURL(imageURL, authorURL){
	if (imageURL)
		return imageURL;
	else if (authorURL)
		return authorURL;
	else
		return 'http://goo.gl/7sSmH6';
}
function IsValidImageUrl(url){
	var obj = new Image();
	    obj.src = url;

	if (obj.complete) {
	    return true;
	} else {
	    return false;
	}
}
$(document).ready(function(){
	(getStories());
	setTimeout(function(){ $("img").error(function () {
  	$(this).unbind("error").attr("src", "http://goo.gl/7sSmH6");
	}); }, 1500);
});

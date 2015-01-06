//
//http://stackoverflow.com/questions/14094697/javascript-how-to-create-new-div-dynamically-change-it-move-it-modify-it-in
//

var e = window.event;
var div = document.createElement('div');
document.body.appendChild(div);
div.innerHTML = '<div class="popup-penso-auto-meta" style="position: absolute; left:200px; top: 300px; min-width: 380px; display: block; height: 200px; box-shadow: 0px 0px 10px #888888; background: #ffffff">\
					<div class="list-words">\
					</div>\
				</div>';

var selectedText = localStorage.dataAutoMeta;

function pasteSelection() {;

	//chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
	//	function(tab) {
	//		chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
	//			function(response){
	//				var text = document.getElementById('select-text');
	//				selectedText = response.data;
	//				$('.run-analysis').click();
	//			});
	//	});

}

AutoMetaPopup.prototype.init = function()
{
	this.analyseDoc(this);
};

function AutoMetaPopup()
{
	this.stopWords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all",
		"almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst",
		"amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around",
		"as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand",
		"behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by",
		"call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do",
		"done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty",
		"enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen",
		"fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from",
		"front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here",
		"hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however",
		"hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last",
		"latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill",
		"mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely",
		"neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not",
		"nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others",
		"otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put",
		"rather", "re", "said","same","say", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she",
		"should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something",
		"sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their",
		"them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon",
		"these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout",
		"thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under",
		"until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence",
		"whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether",
		"which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within",
		"without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];
}


AutoMetaPopup.prototype.analyseDoc = function(event)
{console.log(selectedText);
	//var $doc = $('.auto-meta-document');
	var text = selectedText;//$doc.val()
	var cleanText = this.removePunctuation(text);
	var words = cleanText.split(" ");
	var terms = {};
	var i;

	event.preventDefault();

	function Term(word)
	{
		this.word = word;
		this.frequency = 0;
	}

	for(i=0;i<words.length;i++)
	{
		var word = words[i].toLowerCase();

		if(word.slice(-1) =="s")
		{
			var stemmed = word.substring(0,word.length-1);
			if(terms.hasOwnProperty(stemmed))
			{
				word = stemmed;
			}
			if(this.stopWords.indexOf(stemmed) != -1)
			{
				word = "";
			}
		}

		if(word.length > 2 && this.stopWords.indexOf(word) == -1)
		{
			if(terms.hasOwnProperty(word) === false)
			{
				terms[word] = new Term(word);
			}
			terms[word].frequency++;
		}
	}
	var sorted = [];
	for(var key in terms)
	{
		sorted.push(terms[key]);
	}
	sorted.sort(function(a,b)
	{
		return b.frequency - a.frequency;
	});


	var html = "<p class='suggest-list'>Suggested Keywords:</p><br/><ul class='list-group'>";
	for(i =0;i<Math.min(10,sorted.length);i++)
	{
		html += "<li class='list-group-item'>"+"("+Math.round(sorted[i].frequency/(sorted[0].frequency +1)*100)/100+") "+sorted[i].word+"</li>";
		console.log(Math.round(sorted[i].frequency/(sorted[0].frequency +1)*100)/100+") "+sorted[i].word);
	}
	html+="</ul>";
	$('.list-words').html(html);


};

AutoMetaPopup.prototype.removePunctuation = function(text)
{console.log("3");
	return text.replace(/[^\w\s]|_/g, "")
		.replace(/\s+/g, " ");
};



(function(){

	pasteSelection();
	var popup = new AutoMetaPopup();
	popup.init();

}());
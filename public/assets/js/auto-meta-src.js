
$(document).on('ready',function()
{
 var autometa = new AutoMeta();
    autometa.init();
});

function AutoMeta()
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

AutoMeta.prototype.init = function()
{
    $('.run-analysis').on('click',this.analyseDoc.bind(this));
};

AutoMeta.prototype.analyseDoc = function(event)
{
    var $doc = $('.auto-meta-document');
    var text = $doc.val();
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
    }
    html+="</ul>";
    $('.auto-keywords-output').html(html);

};

AutoMeta.prototype.removePunctuation = function(text)
{
    return text.replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, " ");
};

AutoMeta.prototype.removeStopWords = function(words)
{

};


function pasteSelection() {
	chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
		function(tab) {
			chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
				function(response){
					var text = document.getElementById('select-text');
					text.innerHTML = response.data;
					$('.run-analysis').click();
				});
		});
}

$(function(){
	pasteSelection();
});








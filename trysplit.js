var fs=require("fs");
var burmeseterms={};
var loadburmeseterms=function() {
	var lines=fs.readFileSync("burmeseterms.txt","utf8").replace(/\r?\n/g,"\n").split("\n");
	for (var i=0;i<lines.length;i++) {
		var arr=lines[i].split("=");
		burmeseterms[arr[0]]=arr[1];
	}
}
console.log("load burmeseterms");
loadburmeseterms();
console.log("load token");
var tokens_=fs.readFileSync("vrimulatokencount.txt","utf8").replace(/\r?\n/g,"\n").split("\n");
var tokens=[];
for (var i=0;i<tokens_.length;i++) {
	var tokenarr=tokens_[i].split(",");
	tokens.push([tokenarr[0],parseInt(tokenarr[1])]);
}

console.log("try split");
var nsplit=0,freq=0,totalfreq=0;

var trimToken=function(tk) {
	var last=tk[tk.length-1];
	var last3=tk.substr(tk.length-3);

	if (last=="ṃ") tk=tk.substr(0,tk.length-1);
	else if (last=="o") tk=tk.substr(0,tk.length-1)+"a";
	else if (last=="e") tk=tk.substr(0,tk.length-1)+"a";
	else if (last=="ā") tk=tk.substr(0,tk.length-1)+"a";
	else if (last3=="ssa") tk=tk.substr(0,tk.length-3);
	else if (last3=="ena") tk=tk.substr(0,tk.length-3)+"a";
	return tk;
}
var notsplitted=[],shorttokens={};

var addsplitted=function(s,freq) {
	var tks=s.split("+");
	for (var j=0;j<tks.length;j++) {
		if (!shorttokens[tks[j]]) {
			shorttokens[tks[j]]=0;
		}
		shorttokens[tks[j]]++;
	}
}
for (var i=0;i<tokens.length;i++) {
	var tk=trimToken(tokens[i][0]);

	var splitted=burmeseterms[tk];
	if (splitted) {
		//console.log(splitted);
		addsplitted(splitted,tokens[i][1]);
		freq+=tokens[i][1];
		nsplit++;
	} else {
		if (tokens[i][1]>100) freq+=tokens[i][1];
		notsplitted.push(tokens[i][0]);
	}

	totalfreq+=tokens[i][1];
}
console.log("total",tokens_.length,"nsplit",nsplit);
console.log("total freq",totalfreq,"freq",freq);
fs.writeFileSync("notsplitted.txt",notsplitted.join("\n"),"utf8");

var output=[];
for (var i in shorttokens) {
	output.push([i,shorttokens[i]]);
}
output.sort(function(a,b){return b[1]-a[1]});
fs.writeFileSync("vrimula_shorttoken.txt",output.join("\n"),"utf8");
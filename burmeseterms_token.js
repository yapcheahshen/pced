var fs=require("fs");
var arr=fs.readFileSync("burmeseterms.txt","utf8").replace(/\r?\n/g,"\n").split("\n");
var tokens={};
for (var i=0;i<arr.length;i++) {
	var ar=arr[i].split("=");
	var tks=ar[1].split("+");
	for (var j=0;j<tks.length;j++) {
		if (!tokens[tks[j]]) {
			tokens[tks[j]]=0;
		}
		tokens[tks[j]]++;
	}
}
var output=[];
for (var i in tokens) {
	output.push([i,tokens[i]]);
}
output.sort(function(a,b){return b[1]-a[1]});
fs.writeFileSync("burmeseterms_token.txt",output.join("\n"),"utf8");
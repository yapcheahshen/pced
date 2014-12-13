var fs=require("fs");
console.log("loading cidian");
var arr=fs.readFileSync("cidian","utf8").split("\r\n");
console.log("loaded");
var out=[];
var pat=/(.+?):.+?[\[«]([^<^\]]+)[\]»]/;
var extract=function() {
	for (var i=0;i<arr.length;i++) {
		var line=arr[i];
		if (line[0]!="B") continue;

		var m=line.substr(2).match(pat);
		if (m) {
			var split=m[2];
			var dot=split.indexOf(".");
			var comma=split.indexOf(",");
			if (dot>-1) split=split.substr(0,dot);
			if (comma>-1 && comma<dot) {
				split=split.substr(0,comma);
			}
			out.push(m[1]+"="+split);
		}
	}
}
extract();
fs.writeFileSync("burmeseterms.txt",out.join("\n"),"utf8");
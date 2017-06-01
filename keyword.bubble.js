// code from http://www.infocaptor.com/bubble-my-page
$(document).ready(function () {
    var keys = ["선풍기", "이케아", "파우치", "에코백", "수납장", "양산", "아이폰케이스", "시계", "텐바이텐배송", "카드지갑", "텀블러", "부채", "슬리퍼", "실내화", "의자", "휴지통", "마우스패드", "팔찌"];
    var vals = [268, 210, 177, 170, 139, 131, 107, 99 , 99 , 83 , 79 , 73 , 71 , 70 , 70 , 66 , 63 , 63];
    var data = [keys, vals];

    var diameter = 600 - 30,
        limit = 5000,
        format = d3.format(",d"),
        color = d3.scale.category20c();

    var bubble = d3.layout.pack()
        .sort(null)
        .size([diameter, diameter])
        .padding(1.5);

    var svg = d3.select("#svgid").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

    var dobj = [];

    for (var di = 0; di < data[0].length; di++) {
        dobj.push({"key":di, "value":data[1][di]});
    }
	display_pack({children: dobj});
    function display_pack(root)
    {
        var node = svg.selectAll(".node")
            .data(bubble.nodes(root)
                  .filter(function(d) { return !d.children; }))
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
	        .style("fill", function(d) { return color(data[0][d.key]); })
	  	    .on("mouseover", function(d,i) {
                d3.select(this).style("fill", "gold");
                d3.select(this).style("cursor", "pointer");
                // showToolTip(" "+data[0][i]+"<br>"+data[1][i]+" ",d.x+d3.mouse(this)[0]+50,d.y+d3.mouse(this)[1],true);
	        })
	        .on("mousemove", function(d,i) {
		        tooltipDivID.css({top:d.y+d3.mouse(this)[1],left:d.x+d3.mouse(this)[0]+50});
	        })
            .on("mouseout", function() {
		        d3.select(this).style("fill", function(d) { return color(data[0][d.key]); });
                d3.select(this).style("cursor", "default");
		        // showToolTip(" ",0,0,false);
	        })
            .on("click", function(d,i) {
                document.location.href = "http://www.10x10.co.kr/search/search_result.asp?rect=" + data[0][i];
            });

        node.append("circle")
            .attr("r", function(d) { return d.r; });

        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
	        .style("fill","black")
            .text(function(d) { return data[0][d.key].substring(0, d.r / 3); });
    }

    /*
    function showToolTip(pMessage,pX,pY,pShow) {
        if (typeof(tooltipDivID)=="undefined") {
            tooltipDivID =$('<div id="messageToolTipDiv" style="position:absolute;display:block;z-index:10000;border:2px solid black;background-color:rgba(0,0,0,0.8);margin:auto;padding:3px 5px 3px 5px;color:white;font-size:12px;font-family:arial;border-radius: 5px;vertical-align: middle;text-align: center;min-width:50px;overflow:auto;"></div>');
		    $('body').append(tooltipDivID);
        }
        if (!pShow) { tooltipDivID.hide(); return;}
        tooltipDivID.html(pMessage);
        tooltipDivID.css({top:pY,left:pX});
        tooltipDivID.show();
    }
    */

}); //document ready

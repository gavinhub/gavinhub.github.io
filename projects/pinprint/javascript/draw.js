$(function(){

var canvas = $("#canvas");

var counter = 0;

function drawPoint(svg, pos_x, pos_y, color) {
    svg.circle(pos_x, pos_y, 4, {fill: color, strokeWidth: 2});
}

function addEntry(list, pos_x, pos_y) {
    list.append("<li>"+pos_x+', '+pos_y+"</li>");
}

$("#show_btn").click(function(){
    $("#board").show();
    $("#canvas").svg();

    var min_x, max_x, min_y, max_y;
    min_x = parseFloat($('#input_minx').val());
    max_x = parseFloat($('#input_maxx').val());
    min_y = parseFloat($('#input_miny').val());
    max_y = parseFloat($('#input_maxy').val());

    var can_width = $("#canvas").width();
    var can_height = $("#canvas").height();

    $("#canvas").click(function(evt){
        var offset = $(this).offset();
        var relativeX = (evt.pageX - offset.left);
        var relativeY = (evt.pageY - offset.top);

        var svg = $("#canvas").svg('get');
        drawPoint(svg, relativeX, relativeY, 'red');

        x = min_x + relativeX / can_width * (max_x - min_x)
        y = min_y + relativeY / can_height * (max_y - min_y)
        addEntry($("#points"), x.toFixed(4), y.toFixed(4));
    })

    $("#import_btn").click(function(){
        var svg = $("#canvas").svg('get');
        $("#import").val().split("\n").forEach(function(ele){
            t = ele.split(",");
            if (t.length != 2) return;
            t1 = parseFloat(t[0])
            t2 = parseFloat(t[1])
            px = (t1 - min_x) * 1.0 / (max_x - min_x) * can_width;
            py = (t2 - min_y) * 1.0 / (max_y - min_y) * can_height;
            drawPoint(svg, px, py, 'blue');
        });

    });
})


});
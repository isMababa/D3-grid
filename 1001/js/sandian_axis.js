/**
 * Created by Administrator on 2017/9/29.
 */

//添加坐标轴函数
//y轴标尺数据 yDta=[1000,8000];
//x轴标尺数据 xDta=["湖南","技能","负担","谨防","监护人","节目","健康","戈壁"];
//x轴的标尺间距 xPadding=0.3;
//"myBar"为id名
function axisBar(yDta,xDta,myBar) {
    /*获取容器宽高*/
    var svgWidth=d3.select("#"+myBar)._groups[0][0].clientWidth;
    var svgHeight=d3.select("#"+myBar)._groups[0][0].clientHeight;
    /*绘图区分组x方向位移，可修改*/
    var gLateX=50;
    /*绘图区分组y方向位移，可修改*/
    var gLateY=50;
    /*绘图区分组y轴轴线x方向位移，可修改*/
    var yLateY=30;
    /*y轴的轴高*/
    var axisHeight=svgHeight-gLateY*2-yLateY;
    /*x轴的纵向位移*/
    var xAxisY=axisHeight;
    /*x轴的轴宽*/
    var axisWidth=svgWidth-gLateX*2;
    /*绘图区分组的id的名称，可修改*/
    var gId=myBar+"tuBar";
    /*x轴轴线的id的名称，可修改*/
    var yId=myBar+"yAxis";
    /*y轴轴线的id的名称，可修改*/
    var xId=myBar+"xAxis";
    /*插入svg画布*/
    d3.select("#"+myBar).append("svg")
        .attr("width",svgWidth)
        .attr("height",svgHeight)
        .style("background-color","#cecece")
        .append("g")    //此分组为绘图区（表格标题可不在组内）
        .attr("transform","translate("+gLateX+","+(gLateY+yLateY)+")")
        .attr("id",gId);
    /*y轴轴线添加*/
    d3.select("#"+gId).append("g")
        .attr("id",yId);
    /*y轴比例尺*/
    var _lineDate=d3.scaleLinear()
        .domain(yDta).nice()
        .range([axisHeight,0]);
    /*创建y轴*/
    var yAxis=d3.axisLeft()
        .scale(_lineDate)
        .ticks(8)     //刻度间隔设置，可修改
        .tickSize([4])     //刻度线长度设置，可修改，默认6
        .tickPadding([5]);     //刻度线与自体间距设置，可修改，默认3
    yAxis(d3.select("#"+yId));
    /*x轴轴线添加*/
    d3.select("#"+gId).append("g")
        .attr("id",xId)
        .attr("transform","translate(0,"+xAxisY+")");
    /*x轴比例尺*/
    var _bandDate=d3.scaleLinear()
        .domain(xDta).nice()
        .range([0,axisWidth]);
    /*创建x轴*/
    var xAxis=d3.axisBottom()
        .scale(_bandDate)
        .tickSize([4])    //刻度线长度设置，可修改，默认6
        .tickPadding([5]);     //刻度线与自体间距设置，可修改，默认3
    xAxis(d3.select("#"+xId));
    /*返回值：比例尺（line：y轴比例尺；band：x轴比例尺）*/
    return {"line":_lineDate,"band":_bandDate};
}
let cells = document.querySelectorAll('#table-container td');


cells.forEach(function (cell) {
    let spans = cell.getElementsByTagName('span');
    let backgroundColor = '';
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].classList.contains('percent_positive')) {
            backgroundColor = 'lightgreen';
            spans[i].style.color = 'darkgreen';
            break;
        } else if (spans[i].classList.contains('percent_negative')) {
            backgroundColor = 'lightpink';
            spans[i].style.color = 'red';
            break;
        }
    }
    cell.style.backgroundColor = backgroundColor;
});


function showGraph() {
    let tr = document.getElementById(event.target.parentNode.id);
    if (tr.className === "unclicked") {
        tr.className = "clicked";
    } else {
        tr.className = "unclicked";
        var graphContainer = document.getElementById("graph-container");
        graphContainer.remove();
        location.reload();
    }
    let trChildNodes = tr.childNodes;
    let data = Array();
    for (i = 0; i < trChildNodes.length; i++) {
        if (trChildNodes[i].nodeType === 1) {
            let textContent = trChildNodes[i].textContent;
            let isNumeric = /^\d+$/.test(textContent);
            if (isNumeric) {
                data.push(textContent);
            }
        }
    }
    let div = document.createElement("div");
    div.id = "graph-container";
    let canvas = document.createElement("canvas");
    canvas.id = "graph";

    let ctx = canvas.getContext("2d");

    let maxDataValue = Math.max(...data);

    let chartWidth = canvas.width - 40;
    let chartHeight = canvas.height - 40;

    let xScale = chartWidth / (data.length - 1);
    let yScale = chartHeight / maxDataValue;

    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(20, chartHeight + 20);
    ctx.lineTo(chartWidth + 20, chartHeight + 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, chartHeight + 20 - (data[0] * yScale));
    for (let i = 1; i < data.length; i++) {
        let x = i * xScale + 20;
        let y = chartHeight + 20 - (data[i] * yScale);
        ctx.lineTo(x, y);
        ctx.arc(x, y, 3, 0, Math.PI * 2);
    }
    ctx.strokeStyle = 'green';
    ctx.stroke();

    div.appendChild(canvas);
    tr.insertAdjacentElement("afterend", div);
}

function displayText() {
    console.log("test")
    var canvas = document.getElementById("myCanvas")
    var context = canvas.getContext("2d")

    context.font = "20pt Calibri"
    context.fillStyle = "green"
    context.fillText("Welcome to tutorial", 5, 30);
}

function displayClearColor(){
    console.log("hello")
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("experimental-webgl")
    console.log(gl)
    gl.clearColor(0.8, 0.9, 0.9, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function setupWebGL(){
    console.log("Setup Web GL")
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, 0.5]
    var vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    absolutePath = getAbsoluteUrl(".");
    console.log("path: " + absolutePath)
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    vertShaderTxt = {text:""}
    getShaderText(absolutePath + "vertShader.glsl", vertShaderTxt)
    gl.shaderSource(vertShader, vertShaderTxt.text)
    console.log("vertShaderTxt: " + vertShaderTxt.text) 
    gl.compileShader(vertShader);

    fragShaderTxt = {text:""}
    getShaderText(absolutePath + "fragShader.glsl", fragShaderTxt)
    console.log("fragShaderTxt: " + fragShaderTxt.text)
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragShader, fragShaderTxt.text);
    console.log("fragShaderTxt: " + fragShaderTxt.text);
    gl.compileShader(fragShader);


    var shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);

    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    console.log("gl.bindBuffer")
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    console.log("gl.clearColor")
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    console.log("end of setup web gl");
}
function getAbsoluteUrl(url){
    var img = new Image();
    img.src = url; 
    url = img.src; 
    img.src = null; 
    return url;
}

function getShaderText(filePath, shaderText) 
{
    var shaderFile = new XMLHttpRequest();
    console.log("filePath: " + filePath)
    shaderFile.open("GET", filePath, false);
    shaderFile.onreadystatechange = function ()
    {
        if (shaderFile.readyState == 4)
        {
            if(shaderFile.status == 200 || shaderFile.status == 0)
            {
                text = shaderFile.responseText;
                shaderText.text = text
            }
        }
    }
    shaderFile.send(null)
}
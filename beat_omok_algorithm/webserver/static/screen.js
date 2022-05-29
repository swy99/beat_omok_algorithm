class Shader {};
class Screen extends Shader {
    constructor(canvasid, width, height) {
        super();
        this.range = [[-width/2,height/2],[width/2,height/2],[-width/2,-height/2],[width/2,-height/2]];
        this.canvas = document.getElementById(canvasid);
        this.width = width;
        this.height = height;
        this.backgroundcolor = "#408000";
        this.adjust = new Object();
        if(canvas.getContext){
            this.adjustScreenSize();
        }
    }
    adjustScreenSize(){
        const adj = this.adjust;
        adj.ww = window.innerWidth;
        adj.wh = window.innerHeight;
        let ratio = this.height/this.width;
        if(adj.wh/adj.ww >= ratio){
            adj.multiplier = adj.ww/this.width;
            adj.xoffset = 0;
            adj.yoffset = (adj.wh - this.height*adj.multiplier)/2;
        }
        else{
            adj.multiplier = adj.wh/this.height;
            adj.xoffset = (adj.ww - this.width*adj.multiplier)/2;
            adj.yoffset = 0;
        }
    }
    render(){
        const adj = this.adjust;
        this.canvas.width = adj.ww;
        this.canvas.height = adj.wh;
        this.canvas.style.background = "FFFFFF";
        let context = canvas.getContext('2d');
        context.fillStyle = this.backgroundcolor;
        context.fillRect(adj.xoffset, adj.yoffset, adj.multiplier*this.width, adj.multiplier*this.height);
    }
};

    //window.addEventListener('resize', adjustScreenSize);
    //document.addEventListener("click", e=>{clickHandler(e.offsetX,e.offsetY)});
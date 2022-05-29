class PickingShader extends Shader {
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
        this.adjust = new Object();
        this.adjustScreenSize();
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
        this.clearbuffer();
    }
    clearbuffer() {
        this.framebuffer = new Array();
        for(let i=0;i<this.adjust.ww;i++){
            this.framebuffer[i] = new Array();
            for(let j=0;j<this.adjust.wh;j++){
                this.framebuffer[i][j] = 0;
            }
        }
    }
    getID(x,y) {
        return this.framebuffer[x][y];
    }
}
class RenderObject {
    constructor(mesh, pickingID = 0){
        console.assert(mesh instanceof Mesh);
        this.mesh = mesh;
        this.pickingID = pickingID;
        this.position = new Object();
        this.position.x = 0;
        this.position.y = 0;
        this.scale = new Object();
        this.color = "#FFFFFF";
        this.alpha = 1;
    }
    render(shader) {
        if(this.mesh instanceof Circle)
            this.renderCircle(shader);
        else if(this.mesh instanceof Rectangle)
            this.renderRectangle(shader);
        else
            console.log("error: unknown mesh");
    }
    renderCircle(shader){
        console.assert(shader instanceof Shader);
        const realcenter = [(this.position.x + shader.width / 2) * shader.adjust.multiplier  + shader.adjust.xoffset, (-this.position.y + shader.height / 2) * shader.adjust.multiplier + shader.adjust.yoffset];
        const realradius = this.mesh.radius * shader.adjust.multiplier;
        if(shader instanceof Screen){
            const context = shader.canvas.getContext("2d");
            context.globalAlpha = this.alpha;
            context.strokeStyle = this.color;
            context.beginPath();
            context.arc(...realcenter, realradius, 0, 2*Math.PI);
            context.stroke();
            context.fillStyle = this.color;
            context.fill();
        }
        else if(shader instanceof PickingShader){
            for(let i=Math.round(realcenter[0]-realradius);i<=realcenter[0]+realradius;i++){
                for(let j=Math.round(realcenter[1]-realradius);j<=realcenter[1]+realradius;j++){
                    if(i>=0 && j>=0 && i<shader.adjust.ww && j<shader.adjust.wh && (i-realcenter[0])**2+(j-realcenter[1])**2<=realradius**2){
                        shader.framebuffer[i][j] = this.pickingID;
                    }
                }
            }
        }
    }
    renderRectangle(shader){
        console.assert(shader instanceof Shader);
        const realxy = [(this.position.x - this.mesh.width / 2 + shader.width / 2) * shader.adjust.multiplier  + shader.adjust.xoffset, (-this.position.y - this.mesh.height / 2 + shader.height / 2) * shader.adjust.multiplier + shader.adjust.yoffset];
        const realwidth = this.mesh.width * shader.adjust.multiplier;
        const realheight = this.mesh.height * shader.adjust.multiplier;
        if(shader instanceof Screen){
            const context = shader.canvas.getContext("2d");
            context.globalAlpha = this.alpha;
            context.strokeStyle = this.color;
            context.fillStyle = this.color;
            context.fillRect(...realxy, realwidth, realheight);
        }
        else if(shader instanceof PickingShader){
            for(let i=Math.round(realxy[0]);i<=realxy[0]+realwidth;i++){
                for(let j=Math.round(realxy[1]);j<=realxy[1]+realheight;j++){
                    if(i>=0 && j>=0 && i<shader.adjust.ww && j<shader.adjust.wh){
                        shader.framebuffer[i][j] = this.pickingID;
                    }
                }
            }
        }
    }
}
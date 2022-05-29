class OmokBoard {
    constructor(size) {
        this.thickness = 0.6;
        this.size = size;

        this.colorset = new Object();
        this.colorset.board = "#dcb35c";
        this.colorset.black = "#000000";
        this.colorset.white = "#FFFFFF";
        this.state = [];
        for(let i=0;i<this.size;i++){
            this.state.push(new Array());
            for(let j=0;j<this.size;j++) this.state[i].push(0);
        }

        this.screen = new Screen("canvas", 200, 200);
        this.screen.backgroundcolor = this.colorset.board;
        this.pickingshader = new PickingShader(200, 200);
        
        this.mouseOver = true;
        this.currentcell = [null,null];
        this.getInput = false;
        this.inputcolor = 1;
        this.inputfunction = null;
    }
    set size(size){
        this.boardsize = size;
        this.spacing = (200 - size * this.thickness) / (size+1);
        this.length = size * this.thickness + (size-1) * this.spacing;
    }
    get size(){
        return this.boardsize;
    }
    getpos(i,j){// (i,j) is a matrix indexing
        return [-100 + this.spacing + 0.5 * this.thickness + j * (this.thickness + this.spacing), 100 - this.spacing - 0.5 * this.thickness - i * (this.thickness + this.spacing)];
    }
    render(){
        const thingsToRender = [];
        thingsToRender.push(this.screen);

        const verticalLineMesh = new Rectangle(this.thickness, this.length);
        const verticalLines = [];
        for(let i=0;i<this.size;i++){
            const line = new RenderObject(verticalLineMesh, 1);
            line.color = "#000000";
            line.position.x = this.getpos(10,i)[0];
            verticalLines.push(line);
        }
        thingsToRender.push(...verticalLines);
        
        const horizonalLineMesh = new Rectangle(this.length, this.thickness);
        const horizontalLines = [];
        for(let i=0;i<this.size;i++){
            const line = new RenderObject(horizonalLineMesh, 1);
            line.color = "#000000";
            line.position.y = this.getpos(i,10)[1];
            horizontalLines.push(line);
        }
        thingsToRender.push(...horizontalLines);

        if(this.size == 19){
            const starPointMesh = new Circle(1);
            const starPoints = [];
            for(let i=3;i<=15;i+=6){
                for(let j=3;j<=15;j+=6){
                    const point = new RenderObject(starPointMesh, 1);
                    point.color = "#000000";
                    const pos = this.getpos(i,j);
                    point.position.x = pos[0];
                    point.position.y = pos[1];
                    starPoints.push(point);
                }
            }
            thingsToRender.push(...starPoints);
        }

        if(this.state){
            const stones = [];
            const rad = 4.89;
            const stoneMesh = new Circle(rad);
            const squareMesh = new Rectangle(2*rad, 2*rad);
            for(let i=0;i<this.size;i++){
                for(let j=0;j<this.size;j++){
                    console.assert(this.state[i][j] == 0 || this.state[i][j] == 1 || this.state[i][j] == 2);
                    switch(this.state[i][j]) {
                        case 0:
                            const square = new RenderObject(stoneMesh, 1000000+100*i+j);
                            square.color = "#0000FF";
                            square.alpha = 0;
                            square.position.x = this.getpos(i,j)[0];
                            square.position.y = this.getpos(i,j)[1];
                            stones.push(square);
                            break;
                        case 1: // black stone
                            const blackStone = new RenderObject(stoneMesh, 101);
                            blackStone.color = this.colorset.black;
                            blackStone.position.x = this.getpos(i,j)[0];
                            blackStone.position.y = this.getpos(i,j)[1];
                            stones.push(blackStone);
                            break;
                        case 2: // white stone
                            const whiteStone = new RenderObject(stoneMesh, 102);
                            whiteStone.color = this.colorset.white;
                            whiteStone.position.x = this.getpos(i,j)[0];
                            whiteStone.position.y = this.getpos(i,j)[1];
                            stones.push(whiteStone);
                            break;
                    }
                }
            }
            thingsToRender.push(...stones);
        }

        thingsToRender.forEach(x => {x.render(this.screen);x.render(this.pickingshader)});
    }
    showtranslucentstone(i,j,player) {
        const stoneMesh = new Circle(4.89);
        const stone = new RenderObject(stoneMesh, 200);
        stone.alpha = 0.6;
        if(player == 1) {
            stone.color = this.colorset.black;
        }
        else if(player == 2) {
            stone.color = this.colorset.white;
        }
        stone.position.x = this.getpos(i,j)[0];
        stone.position.y = this.getpos(i,j)[1];
        stone.render(this.screen);
    }
    mousemoveHandler(x,y) {
        if(this.mouseOver && this.getInput) {
            let id = this.pickingshader.getID(x,y);
            var i=null,j=null;
            if(id >= 1000000) {
                i = parseInt((id-1000000)/100);
                j = (id-1000000)%100;
            }
            if(i != this.currentcell[0] || j != this.currentcell[1]){
                if(!i&&!j){
                    this.render();
                }
                else{
                    this.render();
                    this.showtranslucentstone(i,j,this.inputcolor);
                }
                this.currentcell = [i,j];
            }
        }
    }
    clickHandler(x,y) {
        if(this.getInput){
            let id = this.pickingshader.getID(x,y);
            if(id >= 1000000) {
                let i = parseInt((id-1000000)/100);
                let j = (id-1000000)%100;
                this.state[i][j] = this.inputcolor;
                this.render();
                this.getInput = false;
                this.inputfunction(i,j);
            }
        }
    }
    get nextplayercolor() {
        var black = 0, white = 0;
        for(var i=0;i<this.size;i++){
            for(var j=0;j<this.size;j++){
                if(this.state[i][j] == 1) black++;
                else if(this.state[i][j] == 2) white++;
            }
        }
        if(black > white) return 2;
        else return 1;
    }
}
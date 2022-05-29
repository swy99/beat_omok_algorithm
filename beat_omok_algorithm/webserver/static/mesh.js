class Mesh {
}

class Circle extends Mesh {
    constructor(radius=10){
        super();
        this.radius = radius;
    }
}

class Rectangle extends Mesh {
    constructor(width=10, height=10){
        super();
        this.width = width;
        this.height = height;
    }
}
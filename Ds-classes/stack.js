class Stack {
    constructor() {
        this.top = 0;
        this.elements = [];
    }

    empty () {
        if (this.top === 0) {
            return true;
        } 
        return false;
    }

    push (x) {
        this.elements[this.top] = x;
        this.top++;
    }

    pop () {
        if (this.top === 0) {
            return undefined;
        }
        this.top--;
        var y = this.elements[this.top];
        // delete this.elements[this.top];
        return y;
    }

    peek () {
        if (this.top === 0) {
            return undefined;
        }
        var y = this.elements[this.top - 1];
        return y;
    }

    size () {
        return this.top;
    }
}



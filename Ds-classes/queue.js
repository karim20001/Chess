class Queue {
    constructor() {
        this.front = 0;
        this.rear = 0;
        this.elements = [];
    }

    size () { 
        return this.rear - this.front;
    }

    makeNull () {
        this.front = 0;
        this.rear = 0;
        this.elements = [];
    }

    empty () {
        if (this.front == this.rear) {
            return true;
        }
        return false;
    }

    enqueue (x) {
        this.elements[this.rear] = x;
        this.rear++;
    }

    dequeue () {
        if (this.empty()) {
            return undefined;
        } else {
            var y = this.elements[this.front];
            // delete this.elements[this.front];
            this.front++;
            return y;
        }
    }

    look () {
        if (this.empty()) {
            return undefined;
        } else {
            var y = this.elements[this.front];
            return y;
        }
    }
}


export default class Queue {
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
}

b = new Queue();
b.enqueue(5);
b.enqueue(7);

b.size();
console.log(b.size());
console.log(b.dequeue());
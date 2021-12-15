class Node {
    constructor(x) {
        this.data = x;
        this.next = null;
    }
}

class Stack {
    constructor () {
        this.top = null;
    }

    push (x) {
        var p = new Node(x);
        p.next = this.top;
        this.top = p;
    }

    pop () {
        if (this.top == null) {
            return undefined;
        } 
        var p = this.top;
        this.top = this.top.next;
        return p.data;
    }

    makeNull () {
        while (this.top != null) {
            this.top = this.top.next;
        }
    }

    empty () {
        if (this.top == null) {
            return true;
        }
        return false;
    }
}

class Queue {
    constructor () {
        this.s1 = new Stack();
        this.s2 = new Stack();
    }

    enqueue (x) {
        if (this.s1.empty ()) {
            this.s1.push(x);
        } else {
            while (!this.s1.empty ()) {
                this.s2.push(this.s1.pop());
            }
            this.s1.push(x);
            while (!this.s2.empty ()) {
                this.s1.push(this.s2.pop());
            }
        }
    }

    dequeue () {
        if (this.s1.empty()) {
            return undefined;
        }
        return this.s1.pop()
    }
}

q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
console.log(q.dequeue ());
console.log(q.dequeue ());
console.log(q.dequeue ());
console.log(q.dequeue ());
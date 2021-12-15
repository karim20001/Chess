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

b = new Stack();
b.push(5);
b.push(6);
// b.makeNull();

console.log(b.empty());
console.log(b.pop());
console.log(b.pop());

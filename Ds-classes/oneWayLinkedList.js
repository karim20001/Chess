class Node {
    constructor(x) {
        this.data = x;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert (p, x) { 
        var q = new Node(x);
        if (p == null) {
            q.next = this.head;
            this.head = q;
        } else {
            q.next = p.next;
            p.next = q;
        }
    }

    makeNull () {
        var p;
        while (this.head != null) {
            p = this.head.next;
            this.head = p;
        }
    }

    empty () {
        if (this.head == null) {
            return true;
        }
        return false;
    }

    first () {
        return this.head;
    }

    next (p) {
        if (p != null) {
            return p.next;
        }  
        return this.head;
    }

    prev (p) {
        var q;
        if (p != this.head) {
            q = this.head;
            while (q.next != p) {
                q = q.next;
            }
            return q;
        }
        return null;
    }

    delete (p) {
        var q = this.head;
        if (p != this.head) {
            while (q.next != p) {
                q = q.next;
            }
            q.next = p.next;
            p = q.next;
        } else {
            this.head = this.head.next;
            p = this.head;
        }
    }

}


class Node {
    constructor(x) {
        this.data = x;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert (p, x) { 
        var q = new Node(x);
        if (this.empty()) {
            this.head = q;
        } else {
            if (p != null) {
                q.next = p.next;
                q.prev = p;
                if (p.next != null) {
                    p.next.prev = q;
                }
                p.next = q; 
            } else {
                q.next = this.head;
                this.head.prev = q;
                q.prev = null;
                this.head = q;
            }
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
        if (p != null) {
            return p.prev;
        }  
        return undefined;
    }
    
    delete (p) {
        var q = p.next;
        if (p != this.head) {
            p.prev.next = p.next;
            if (p.next != null) {
                p.next.prev = p.prev;
            }
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        p = q;
    }
    
}

a = new LinkedList();
a.insert(null,1);
a.insert(a.head,2);
a.insert(a.head.next,3);
a.insert(a.head.next.next,4);

console.log(a.empty());
console.log(a.head)
a.delete(a.first());
a.makeNull();
console.log(a.prev(a.next(a.first())));
console.log(a);
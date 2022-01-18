class Action {
    constructor (mohre, origin, destination, deleted, last_soldier) {
        this.mohre = mohre;
        this.origin = origin;
        this.destination = destination;
        this.deleted = deleted;
        this.last_soldier = last_soldier;
    }
    to_string(){
        return this.mohre + " " + this.origin + " " + this.destination + " " + this.deleted + " " + this.last_soldier + "\n";
    }
}
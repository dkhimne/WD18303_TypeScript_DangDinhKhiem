export class User {
    public username: string;
    public name: string;
    public email: string;

    constructor(name: string, username: string, email: string) {
        this.name = name;
        this.username = username;
        this.email = email;
    }

    getUsername() {
        return this.username;
    }

    getName() {
        return this.name;
    }
}

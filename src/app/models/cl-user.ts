/**
 * Available properties for CL user.
 * 
 * Extend this model for your own user model
 * 
 * e.g. ```export class customUser & CLUser {}```
 */
export class CLUser {
    public accountId: string;
    public userId: string;
    public name: string;
    public photoUrl: string;
    public role: string;
}


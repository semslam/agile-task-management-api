module.exports = class User{
    constructor(user){
        this.id = user._id
        this.name = user.name
        this.username = user.username
        this.isActive = user.isActive
        this.createdAt = user.createdAt
        this.modifiedAt = user.modifiedAt
    }
}
module.exports = class Group{
    constructor(group){
    this.id = group._id
    this.adminId = group.adminId
    this.topic = group.topic,
    this.priorities = group.priorities
    this.totalPoint = group.totalPoint
    this.totalNumberOfTicket = group.totalNumberOfTicket
    this.startDate = group.startDate
    this.dueDate = group.dueDate
    this.createdAt = group.createdAt
    this.modifiedAt = group.modifiedAt
    }
}
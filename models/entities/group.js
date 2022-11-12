module.exports = class Group{
    constructor(group){
    this.id = group._id
    this.adminId = group.adminId
    this.topic = group.topic,
    this.totalPoint = group.totalPoint
    this.totalNumberOfTicket = group.totalNumberOfTicket
    this.totalNumberOfTicketCreated = group.totalNumberOfTicketCreated
    this.status = group.status
    this.createdAt = group.createdAt
    this.modifiedAt = group.modifiedAt
    }
}
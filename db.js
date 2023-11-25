const mongoose = require('mongoose')
const Pusher = require("pusher");

const pusher = new Pusher({
   appId: "1706872",
   key: "6a9b4a71a4a2103bc0d3",
   secret: "5c4a0a3fa367ea2c8f02",
   cluster: "ap2",
   useTLS: true
});


const connectToMongo = async () => {
   await mongoose.connect(process.env.MONGO_URI)
   console.log('Connected to Database Successfully')




}
const db = mongoose.connection

db.once("open", () => {
   console.log('PUSHER HERE')


   const msgCollection = db.collection("Chat")
   const changeStream = msgCollection.watch()
   changeStream.on("change", (change) => {
      console.log("Change Occurred")

      if (change.operationType === 'insert') {
         const msgDetails = change.fullDocument
         console.log("THHHISIISIIISISIIS", msgDetails)

         pusher.trigger("messages", "inserted", {

            msgContent: msgDetails.msgContent,
            peers: msgDetails.peers,
            // participants: msgDetails.participants,
            sender: msgDetails.sender,
            // senderName: msgDetails.senderName,
            receipient: msgDetails.receipient,
            // receipientName: msgDetails.receipientName,
            user: msgDetails.user,
            // target: msgDetails.target,
            msgTime: msgDetails.msgTime,
            // data: "hello world"
         });


      }
   })
})
db.once("error", () => {
   return console.log('PUSHER HERE AGAIN')
})

module.exports = connectToMongo
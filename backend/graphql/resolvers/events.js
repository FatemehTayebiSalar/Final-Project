const { transformEvent } = require('./merge');
const Event = require('../../models/event');
// const User = require('../../models/user')



module.exports = {
    events: async () => {
        try{
        const events = await Event.find()
            return events.map(event =>{
                return transformEvent(event);
            });
        } catch (err){
            throw err;
        }
    },
    createEvent: async(args) => {
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated!');
        // }
        const event = new Event({
            title: args.eventInput.title,
            information: args.eventInput.information,
            organizer:args.eventInput.organizer,
            date: new Date(args.eventInput.date),
            address: args.eventInput.address,
            price: +args.eventInput.price,
            capacity: +args.eventInput.capacity
        });
        let createdEvent;
        try{
        const result = await event
          .save()
             createdEvent = transformEvent(result); 
            // const creator =await User.findById(req.userId)

            // if(!creator){
            //     throw new Error("User not found.")
            // }
            // creator.createdEvents.push(event);
            // await creator.save();

            return createdEvent;
        } catch (err){
            console.log(err);
            throw err;
        }
        
    }
};
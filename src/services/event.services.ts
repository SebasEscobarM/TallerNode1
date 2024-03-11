import EventModel, { EventDocument, EventInput } from "../models/event.models";


class EventService {

    public  async createEvent(eventInput: EventInput, organizador: string): Promise<EventDocument> {

        try {

            const event = await EventModel.create(eventInput);
            event.organizador = organizador;
            return event;

        } catch (error) {

            throw error;

        }

    }

    public async updateEvent(id: string, eventInput: EventInput): Promise<EventDocument | null> {

        try {

            const event = await EventModel.findOneAndUpdate({_id: id}, eventInput);
            return event;

        } catch (error) {

            throw error;

        }

    }

    public async deleteEvent(id: string): Promise<EventDocument | null> {

        try {

            return await EventModel.findByIdAndDelete({_id: id});;

        } catch (error) {

            throw error;

        }

    }

    public async findAll(): Promise<EventDocument[]> {
        
        try{

            const events = await EventModel.find();
            return events;  

        }catch(error){

            throw error;

        }

    }

    public async findByTitle(title: string): Promise<EventDocument | null> {

        try {

            const event = await EventModel.findOne({title: title.toLowerCase()});
            return event;

        } catch (error) {

            throw error;

        }

    }

    public async findById(id: string): Promise<EventDocument | null> {
        
        try {

            const event = await EventModel.findOne({_id: id});
            return event;

        } catch (error) {

            throw error;

        }

    }

    public async findByType(type : string): Promise<EventDocument[]> {

        try {

            const events = await EventModel.find({type: type.toLowerCase()});
            return events;

        } catch (error) {

            throw error;

        }

    }

    public async findByLocation(location : string): Promise<EventDocument[]> {

        try {

            const events = await EventModel.find({location: location.toLowerCase()});
            return events;

        } catch (error) {

            throw error;

        }

    }

    public async findAllByRol(userId : string): Promise<EventDocument[]> {

        try {

            const events = await EventModel.find({userId: userId.toLowerCase()});
            return events;

        } catch (error) {

            throw error;

        }

    }

}

export default new EventService();
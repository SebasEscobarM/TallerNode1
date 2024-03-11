import { Request, Response } from "express";
import { EventDocument, EventInput } from "../models/event.models";
import eventServices from "../services/event.services";


class eventController {

    public async create(req: Request, res: Response) {

        try {

            const userExist : EventDocument | null = await eventServices.findByTitle(req.body.title.toLowerCase());
            
            if (userExist) {

                return res.status(409).json({ message: 'Event already exists' });

            }

            const event: EventDocument = await  eventServices.createEvent(req.body as EventInput, req.body.organizador);

            return res.status(201).json(event);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async update(req: Request, res: Response) {

        try {

            const eventExist : EventDocument | null = await eventServices.findById(req.params.id);

            console.log(req.params.id);

            if (!eventExist) {

                return res.status(404).json({message:'Event not found'});

            }

            const updatedEvent = { ...eventExist, ...req.body };

            if (updatedEvent.organizador !== eventExist.organizador) {

                return res.status(400).json({message:'Organizador attribute cannot be modified'});

            }

            delete updatedEvent.organizador;

            const updateEvent: EventDocument | null = await eventServices.updateEvent(req.params.id, req.body);

            return res.status(200).json(updateEvent);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async delete(req: Request, res: Response) {

        try {

            const eventExist : EventDocument | null = await eventServices.findById(req.params.id);
    
            console.log(req.params.id);

            if (!eventExist) {

                return res.status(404).json({message:'Event not found'});

            }

            const event: EventDocument | null = await eventServices.deleteEvent(req.params.id);

            return res.status(200).json({message: "Event has been deleted", event});

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async findByID(req: Request, res: Response) {

        try {
            
            const event : EventDocument | null = await eventServices.findById(req.params.id);

            console.log(req.params.id);

            if (!event) {

                return res.status(404).json({message:'Event not found'});

            } 

            return res.status(200).json(event);

        } catch (error) {
            
            return res.status(500).json(error);

        }

    }

    public async getEvents(req: Request, res: Response) {

        try {

            const events = await eventServices.findAll();
            res.json(events);

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

    public async getFilterEventType(req: Request, res: Response) {

        try {

            const events = await eventServices.findByType(req.body.type.toLowerCase());
            res.json(events);

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

    public async getFilterEventLocation(req: Request, res: Response) {

        try {

            const events = await eventServices.findByType(req.body.location.toLowerCase());
            res.json(events);

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

    public async addAttendee(req: Request, res: Response) {

        const event: EventDocument | null = await eventServices.findById(req.params.id);

        if (!event) {

          throw new Error("Event not found");

        }
      
        event.asistentes.push(req.body.userId);

        await event.save();

        return res.status(200).json(event);
        
    }
      
    public async removeAttendee(req: Request, res: Response) {

        const event: EventDocument | null = await eventServices.findById(req.params.id);

        if (!event) {

          throw new Error("Event not found");

        }

        let toSave: string[] = [];
        
        for (let i in event.asistentes) {  
            if (req.body.loggedUser.user_id !== event.asistentes[i]) {

                toSave.push(event.asistentes[i]);

            }

        }
        console.log(toSave);
        var nwE = event;
        nwE.asistentes=toSave;
        await event.updateOne(nwE);

        return res.status(200).json(nwE);

    }

    public async getEventsByRol(req: Request, res: Response) {

        try {

            const rol = req.body.rol.toLowerCase();
            
            const events = 0;

            if (rol === "organizador") {

                const events = await eventServices.findAllByRol(req.params.id);

            } else {

                const events = await eventServices.findAll();

            }

            res.json(events);

        } catch (error) {
            
            return res.status(500).json(error);

        }
        
    }

}

export default new eventController();
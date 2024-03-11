import mongoose from "mongoose";

export interface EventInput {

    title: string;
    description: string;
    date: Date;
    location: string;
    type:  string;
    organizador: string;
    asistentes: any[];

}

export interface EventDocument extends EventInput, mongoose.Document {

    createdAt: Date;
    updateAt: Date;
    deletedAt: Date;

};

const eventSchema = new mongoose.Schema({

    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    type: {type: String, required: true},
    organizador: {type: String, required: true},
    asistentes: [{type: String}],

}, {timestamps: true, collectoin: "events"});

const Event = mongoose.model<EventDocument>("Event", eventSchema);

export default Event;
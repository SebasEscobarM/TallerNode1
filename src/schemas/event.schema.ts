import { UserDocument } from './../models/user.models';
import {date, object, string, TypeOf} from 'zod';

const eventSchema = object ({

    title : string({required_error: "Title is required"}).max(30, "Title  should be less than 100 characters"),
    description : string({required_error: "Description is required"}).max(200, "Description  should be less than 100 characters"),
    date : string({required_error: "Date is required"}),
    location : string({required_error: "Location is required"}).max(30), 
    type : string({required_error: "Type is required"}),

})

export default eventSchema;
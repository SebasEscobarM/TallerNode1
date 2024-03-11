import { UserDocument } from './../models/user.models';
import {date, object, string, TypeOf} from 'zod';

const eventSchema = object ({

    rol : string({required_error: "Role is required"}).includes("organizador"),

})

export default eventSchema;
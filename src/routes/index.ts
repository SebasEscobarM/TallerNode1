import { Express } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import validator from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import eventController from "../controllers/event.controller";
import eventSchema from "../schemas/event.schema";

const routes = (app: Express) => {
    app.get('/users', auth, userController.getUsers);
    app.post('/users', auth, validator.validateSchema(userSchema), userController.create);
    app.put('/users/:id', auth, validator.validateSchema(userSchema), userController.update);
    app.delete('/users/:id', auth, validator.validateSchema(userSchema), userController.delete);
    app.get('/users/profile', auth, validator.validateSchema(userSchema), userController.findByID);
    app.get('/user/:id', auth, validator.validateSchema(userSchema), userController.findByID);
    app.post('/login', validator.validateSchema(userSchema), userController.login);
    app.get('/user/rol/:id', auth, validator.validateSchema(userSchema), userController.getUsersByRol);
    
    app.post('/event/subs/:id', auth, validator.validateSchema(eventSchema), eventController.addAttendee);
    app.delete('/event/subs/:id', auth, validator.validateSchema(eventSchema), eventController.removeAttendee);
    
    app.get('/events',validator.validateSchema(eventSchema),  eventController.getEvents);
    app.get('/events/type', validator.validateSchema(eventSchema), eventController.getFilterEventType);
    app.get('/events/location', validator.validateSchema(eventSchema), eventController.getFilterEventLocation);
    app.post('/events/org', auth, validator.validateSchema(eventSchema), eventController.create);
    app.put('/events//org/:id', auth, validator.validateSchema(eventSchema), eventController.update);
    app.delete('/events/org/:id', auth, validator.validateSchema(eventSchema), eventController.delete);
};

export default routes;
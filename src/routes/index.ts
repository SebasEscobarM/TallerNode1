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
    app.put('/users/:id', auth, userController.update);
    app.delete('/users/:id', auth, userController.delete);
    app.get('/users/profile', auth, userController.findByID);
    app.get('/user/:id', auth, userController.findByID);
    app.post('/login', userController.login);
    app.get('/user/rol/:id', auth, userController.getUsersByRol);
    
    app.post('/event/subs/:id', auth, eventController.addAttendee);
    app.delete('/event/subs/:id', auth, eventController.removeAttendee);
    
    app.get('/events', eventController.getEvents);
    app.get('/events/type', eventController.getFilterEventType);
    app.get('/events/location', eventController.getFilterEventLocation);
    app.post('/events/org', auth, validator.validateSchema(eventSchema), eventController.create);
    app.put('/events//org/:id', auth, eventController.update);
    app.delete('/events/org/:id', auth, eventController.delete);
};

export default routes;
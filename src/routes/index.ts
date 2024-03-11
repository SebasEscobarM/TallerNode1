import { Express } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth";
import validator from "../middlewares/validateSchema";
import userSchema from "../schemas/user.schema";
import eventController from "../controllers/event.controller";
import eventSchema from "../schemas/event.schema";

const routes = (app: Express) => {
    app.get('/users', userController.getUsers);
    app.post('/users', validator.validateSchema(userSchema), userController.create);
    app.put('/users/:id', userController.update);
    app.delete('/users/:id', userController.delete);
    app.get('/users/profile', auth, userController.findByID);
    app.get('/user/:id', userController.findByID);
    app.post('/login', userController.login);
    app.get('/user/rol/:id', validator.validateSchema(eventSchema), userController.getUsersByRol);
    

    app.post('/user/event/:id', eventController.addAttendee);
    app.delete('/user/event/:id', eventController.removeAttendee);
    
    app.get('/events', eventController.getEvents);
    app.get('/events/type', eventController.getFilterEventType);
    app.get('/events/location', eventController.getFilterEventLocation);
    app.post('/events', validator.validateSchema(eventSchema), eventController.create);
    app.put('/events/:id', validator.validateSchema(eventSchema), eventController.update);
    app.delete('/events/:id', validator.validateSchema(eventSchema), eventController.delete);
};

export default routes;
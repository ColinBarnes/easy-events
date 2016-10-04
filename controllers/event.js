import { GraphQLError } from 'graphql';

// Mock data
import {getEvent, getEvents} from '../schema/resolvers';

class EventController {
  constructor(options) {
    this.db = options.db;
    this.ctx = options.ctx;
    this.log = this.ctx.log;
  }

  // Create ====================================================================

  /*
  *  Add a new event
  *  @param event
  *  @return event
  */
  create(event) {
    /*
    *  Creating an event requires a bunch of asynchronous calls. The end order
    *  of events will be:
    *  1. Grab the "pending" status id
    *  2. Get the org id
    *  3. Get all of the tag ids
    *  4. Save the event and get the event id
    *  5. Map all of the tag ids to the event id
    *  6. Return the fully formed event object
    */

    // Strip out the org
    let org = event.organization;
    delete event.organization;

    //  Strip out tags
    let tags = event.tags;
    delete event.tags;

    // Set the event status to pending
    let status = new Promise((resolve, reject) => {
      this.db.status.findOne({status: 'pending'}, (err, _status) => {
        if(err){
          console.log(err);
          throw new GraphqLError("Error setting event status");
        }
        resolve(_status);
      });
    });

    // Attach the org to the event if an org is submitted
    return status.then((_status) => {
      event.status_id = _status.id;

      // If an org was sent with the request, associate to the event
      if(org) {
        return this.ctx.Organizations.findOrSave(org)
          .then((_org) => {
            event.organization_id = _org.id;
          });
      }
    // Save the event
    }).then(() => {
      return new Promise((resolve, reject) => {
        this.db.events.save(event, (err, _event) => {
          if(err) {
            console.log(err);
            throw new GraphQLError("There was an error saving the event");
          }
          resolve(_event);
        });
      });
    }).then((_event) => {
      if(tags) {
        // Save the tags
        let tag_promises = tags.map((tag) => this.ctx.Tags.findOrSave(tag));

        // Map the tags to the event
        return Promise.all(tag_promises).then((_tags) => {
          let tag_map = _tags.map((tag) => ({event_id: _event.id, tag_id: tag.id}));

          return new Promise((resolve, reject) => {
            this.db.tagmap.save(tag_map, (err, res) => {
              if(err) {
                console.log(err);
                throw new GraphQLError("Error mapping tags to event");
              }
              resolve(_event);
            });
          });
        });
      }
      return _event;
    }).then((_event) => {
      return _event;
    });
  }

  // Read ======================================================================

  /*
  *  Get event by id
  *  @param id
  *  @return event
  */
  getByID(id) {
    return new Promise((resolve, reject) => {
      this.db.events.findOne(id, (err, event) => {
        if(err) {
          console.log(err);
          throw new GraphQLError(`Error retrieving event with id: ${id}`);
        }
        resolve(event);
      });
    });
  }

  /*
  *  Get all events
  *  @return {Object[]} events
  */
  getAll() {
    this.log.info("test");
    return new Promise((resolve, reject) => {
      this.db.events.find({}, (err, events) =>{
        if(err) {
          console.log(err);
          throw new GraphQLError(`Error returning all events`);
        }
        resolve(events);
      });
    });
  }

  /*
  *  Get a list of events by organization id
  *  @param organization_id
  *  @return {Object[]} events
  */
  getByOrganizationID(organization_id) {
    return '';
  }

  /*
  *  Get a list of events by tag id
  *  @param tag_id
  *  @return {Object[]} events
  */
  getByTagID(tag_id) {
    return '';
  }

  getStatusById(event_id) {
    return new Promise((resolve, reject) => {
      this.db.statusByEventId(event_id, (err, status) => {
        if(err) {
          console.log(err);
          throw new GraphQLError(`Error retrieving status for event with id: ${id}`);
        }
        resolve(status[0].status);
      });
    });
  }
  // Update ====================================================================

  // Delete ====================================================================
}

export default EventController;

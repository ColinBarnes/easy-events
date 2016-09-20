import { GraphQLError } from 'graphql';

// Mock data
import {getEvent, getEvents} from '../schema/resolvers';

class EventController {
  constructor(options) {
    this.db = options.db;
  }

  // Create ====================================================================

  /*
  *  Add a new event
  *  @param event
  *  @return event
  */
  create(event) {
    return new Promise((resolve, reject) => {
      console.log("creating event");
      console.log(event);
      if(isNaN(Date.parse(event.start_time))) {
        throw new GraphQLError(`start_time "${event.start_time}" is not a valid date`);
      }
      /*
      *  Creating an event requires a bunch of asynchronous calls. The end order
      *  of events will be:
      *  1. Grab the pending event id
      *  2. Get the org id
      *  3. Get all of the tag ids
      *  4. Save the event and get the event id
      *  5. Map all of the tag ids to the event id
      *  6. Return the fully formed event object
      */

      /*
      *  Strip out org. If it has the id property, it's an existing org.
      *  Otherwise, it needs to be saved and an id retrieved.
      */
      let org = event.organization;
      delete event.organization;

      /*
      *  Strip out tags. If they have an id property, it's an existing tag.
      *  Otherwise, it they will need to be saved and an id retrieved.
      */
      let tags = event.tags || [];
      delete event.tags;
      let tag_ids = [];

      let findOrSaveOrg = () => {
        // If org id is supplied
        if(org && org.hasOwnProperty('id')){
          // verify that the org already exists
          this.db.organizations.findOne(org.id, (err, res) => {
            if(err) {
              //throw new GraphqLError(`Can't find organization with id: ${org.id}`);
              // handle can't find org with this id error
            } else {
              event.organization_id = org.id;
              findOrSaveTags(0, tags.length);
            }
          });
        } else if(org){
          // if org does not exist, add as a new organization
          this.db.organizations.save(org, (err, res) => {
            if(err) {
              throw new GraphQLError(`Could not save organization: ${org}`);
            }
            event.organization_id = res.id;
            findOrSaveTags(0, tags.length);
          });
        } else {
          // No org
          findOrSaveTags(0, tags.length);
        }
      }

      /*
      *  Called recursively till all tags are saved,
      *  and all tag ids are in tag_ids.
      */
      let findOrSaveTags = (count, max) => {
        console.log("tags: " + tags);
        console.log(`count: ${count} max: ${max}`);
        if(count < max) {
          console.log(`(In IF) count: ${count} max: ${max}`);
          // If tag already exists
          if(tags[count].id) {
            this.db.tags.findOne(tags[count].id, (err, res) => {
              if(err){
                // handle can't find tag with this id error
              } else {
                tag_ids.push(tags[count].id);
                findOrSaveTags(++count,max);
              }
            });
          } else if(max > 0){
            console.log("current tag: " + tags[count]);
            this.db.tags.save(tags[count], (err, res) => {
              if(err) {
                throw new GraphQLError(`Could not save tag: ${tag[count]}`);
              }
              tag_ids.push(res.id);
              findOrSaveTags(++count, max);
            });
          } else {
            // No tags
            saveEvent();
          }
        } else {
          saveEvent();
        }
      }

      let saveEvent = () => {
        this.db.events.save(event, (err, saved_event) => {
          if(err) {
            throw err;
            // handle save event error
            console.log("save event error");
          }
          if(tag_ids.length > 0) {
            /*
            *  Map tags to event
            */
            let all_tags = tag_ids.map((tag_id) => ({event_id: saved_event.id, tag_id: tag_id}));

            this.db.tagmap.save(all_tags, (err, res) => {
              if(err) {
                // handle tag map save error
                console.log("save tag map error");
              }
              console.log("Promise:")
              let prom = this.getByID(saved_event.id);
              console.log(prom);
              // return the fully formed event object
              resolve(prom);
            });
          } else {
            console.log("Promise:")
            let prom = this.getByID(saved_event.id);
            console.log(prom);
            // return the fully formed event object
            resolve(prom);
          }
        });
      }

      /*
      *  Set the event status to pending
      */
      this.db.status.findOne({status: 'pending'}, (err, res) => {
        if(err){console.log("error finding status");}
        console.log(res);
        event.status_id = res.id;
        findOrSaveOrg();
      });
    });

  }

  // Read ======================================================================

  /*
  *  Get event by id
  *  @param id
  *  @return event
  */
  getByID(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.db.events.findOne(id, (err, event) => {
        if(err) { console.log("Error finding event");}
        delete event.status_id;
        delete event.organization_id;
        console.log(event);
        resolve(event);
      });
    });
  }

  /*
  *  Get all events
  *  @return {Object[]} events
  */
  getAll() {
    return getEvents();
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

  // Update ====================================================================

  // Delete ====================================================================
}

export default EventController;

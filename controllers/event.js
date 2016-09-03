// Mock data
import {getEvent, getEvents} from '../schema/resolvers';

class EventController {
  constructor(options) {
    this.db = options.db;
  }

  /*
  *  Get event by id
  *  id
  *  event
  */
  getByID(id) {
    return getEvent(id);
  }

  /*
  *  Get all events
  *
  *  [event]
  */
  getAll() {
    return getEvents();
  }

  /*
  *  Get a list of events by organization id
  *  organization_id
  *  [event]
  */
  getByOrganizationID(organization_id) {
    return '';
  }

  /*
  *  Get a list of events by tag id
  *  tag_id
  *  [event]
  */
  getByTagID(tag_id) {
    return '';
  }
}

export default EventController;

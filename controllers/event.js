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
    return event;
  }

  // Read ======================================================================

  /*
  *  Get event by id
  *  @param id
  *  @return event
  */
  getByID(id) {
    return getEvent(id);
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

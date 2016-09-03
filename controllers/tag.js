// Mock data
import {getTag, getTags} from '../schema/resolvers';

class TagController {
  constructor(options) {
    this.db = options.db;
  }

  /*
  *  Get tag by id
  *  id
  *  tag
  */
  getByID(id) {
    return getTag(id);
  }

  /*
  *  Get all tags
  *
  *  [tag]
  */
  getAll() {
    return getTags();
  }

  /*
  *  Get a list of tags by organization id
  *  organization_id
  *  [tag]
  */
  getByOrganizationID(organization_id) {
    return '';
  }

  /*
  *  Get a list of tags by event id
  *  event_id
  *  [tag]
  */
  getByEventID(tag_id) {
    return '';
  }
}

export default TagController;

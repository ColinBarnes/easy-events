// Mock data
import {getOrganization, getOrganizations} from '../schema/resolvers';

class OrganizationController {
  constructor(options) {
    this.db = options.db;
  }

  /*
  *  Get organization by id
  *  id
  *  organization
  */
  getByID(id) {
    return getOrganization(id);
  }

  /*
  *  Get all organizations
  *
  *  [organization]
  */
  getAll() {
    return getOrganizations();
  }

  /*
  *  Get organization by event id
  *  event_id
  *  organization
  */
  getByEventID(event_id) {
    return '';
  }

  /*
  *  Get a list of organizations by tag id
  *  tag_id
  *  [organization]
  */
  getByTagID(id) {
    return '';
  }
}

export default OrganizationController;

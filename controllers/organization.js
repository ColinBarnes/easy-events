import { GraphQLError } from 'graphql';
// Mock data
import {getOrganization, getOrganizations} from '../schema/resolvers';

class OrganizationController {
  constructor(options) {
    this.db = options.db;
    this.ctx = options.ctx;
  }

  // Create ====================================================================

  /*
  *  Add a new organization
  *  @param org
  *  @return org
  */
  create(org) {
    return new Promise((resolve, reject) => {
      this.db.organizations.save(org, (err, _org) => {
        if(err) {
          throw new GraphQLError(`Could not save organization: ${org}`);
        }
        resolve(_org);
      });
    });
  }

  findOrSave(org) {
    // If org id is supplied
    if(org.hasOwnProperty('id')){
      return new Promise((resolve, reject) => {
        // verify that the org already exists
        this.db.organizations.findOne(org.id, (err, _org) => {
          if(err) {
            throw new GraphqLError(`Can't find organization with id: ${org.id}`);
          }
          resolve(_org);
        });
      });
    } else {
      delete org.id;
      return this.create(org);
    }
  }

  // Read ======================================================================

  /*
  *  Get organization by id
  *  id
  *  organization
  */
  getByID(id) {
    return new Promise((resolve, reject) => {
      this.db.organizations.findOne(id, (err, org) => {
        if(err) {
          throw new GraphQLError(`Error retrieving organization with id: ${id}`);
        }
        resolve(org);
      });
    });
  }

  /*
  *  Get all organizations
  *
  *  [organization]
  */
  getAll() {
    return new Promise((resolve, reject) => {
      this.db.organizations.find({},{limit: 20}, (err, orgs) =>{
        if(err) {
          throw new GraphQLError(`Error returning all organizations`);
        }
        resolve(orgs);
      });
    });
  }

  /*
  *  Get organization by event id
  *  event_id
  *  organization
  */
  getByEventID(event_id) {
    return new Promise((resolve, reject) => {
      this.db.organizationByEventId(event_id, (err, org_arr) => {
        if(err) {
          throw new GraphQLError(`Error returning all organization by id: ${event_id}`);
        }
        resolve(org_arr[0]);
      });
    });
  }

  /*
  *  Get a list of organizations by tag id
  *  tag_id
  *  [organization]
  */
  getByTagID(id) {
    return '';
  }

  // Update ====================================================================

  // Delete ====================================================================

}

export default OrganizationController;

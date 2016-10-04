import { GraphQLError } from 'graphql';
// Mock data
import {getTag, getTags} from '../schema/resolvers';

class TagController {
  constructor(ctx) {
    for (let prop in ctx) {
      this[prop] = ctx[prop];
    }
  }

  // Create ====================================================================

  /*
  *  Add a new tag
  *  @param tag
  *  @return tag
  */
  create(tag) {
    return new Promise((resolve, reject) => {
      this.db.tags.save(tag, (err, _tag) => {
        if(err) {
          this.log.error(err);
          throw new GraphQLError(`Error saving tag: ${tag}`)
        }
        resolve(_tag);
      });
    });
  }

  findOrSave(tag) {
    // If tag id is supplied
    if(tag.hasOwnProperty('id')){
      return new Promise((resolve, reject) => {
        // verify that the tag already exists
        this.db.tags.findOne(tag.id, (err, _tag) => {
          if(err) {
            this.log.error(err);
            throw new GraphqLError(`Can't find organization with id: ${org.id}`);
          }
          resolve(_tag);
        });
      });
    } else {
      delete tag.id;
      return this.create(tag);
    }
  }

  // Read ======================================================================

  /*
  *  Get tag by id
  *  id
  *  tag
  */
  getByID(id) {
    return new Promise((resolve, reject) => {
      this.db.tags.findOne(id, (err, tag) => {
        if(err) {
          this.log.error(err);
          throw new GraphQLError(`Error finding tag with id: ${id}`);
        }
        resolve(tag);
      });
    });
  }

  /*
  *  Get all tags
  *
  *  [tag]
  */
  getAll() {
    return new Promise((resolve, reject) => {
      this.db.tags.find({},{limit: 20}, (err, tags) =>{
        if(err) {
          this.log.error(err);
          throw new GraphQLError(`Error returning all tags`);
        }
        resolve(tags);
      });
    });
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
  getByEventID(event_id) {
    return new Promise((resolve, reject) => {
      this.db.tagsByEventId(event_id, (err, tags) => {
        if(err) {
          this.log.error(err);
          throw new GraphQLError(`Error returning tags by event id: ${event_id}`);
        }
        resolve(tags);
      });
    });
  }

  // Update ====================================================================

  // Delete ====================================================================
}

export default TagController;

// Mock data
import {getTag, getTags} from '../schema/resolvers';

class TagController {
  constructor(options) {
    this.db = options.db;
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
          throw new GraphQLError(`Error saving tag: ${tag}`)
        }
        resolve(_tag);
      });
    });
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
  getByEventID(tag_id) {
    return '';
  }

  // Update ====================================================================

  // Delete ====================================================================
}

export default TagController;

import massive from 'massive';

let db = massive.connectSync({db: 'thecall'});

// Sample data
import {events, tags, organizations}  from './example';

export function getEvent(id) {
  return events[Number(id)];
}

export function getEvents() {
  return events;
}

export function getOrganization(id) {
  return organizations[Number(id)];
}

export function getOrganizations() {
  return organizations;
}

export function getTag(id) {
  return tags[Number(id)];
}

export function getTags() {
  return tags;
}

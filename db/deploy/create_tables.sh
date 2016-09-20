#!/bin/bash

# psql -f create_status.sql thecall
psql -f create_organizations.sql thecall
psql -f create_events.sql thecall
psql -f create_tags.sql thecall
psql -f create_tagmap.sql thecall

import axios from 'axios';
import {
  GET_ALL_SITES,
  ADD_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  DELETE_SITE_ENGINES,
  ADD_SITE_ENGINE,
} from './types';
import { SITE_SERVER } from '../components/Config';

export function getAllSites() {
  const request = axios
    .get(`${SITE_SERVER}/getAllSites`)
    .then(response => response.data);

  return {
    type: GET_ALL_SITES,
    payload: request,
  };
}

export function addSite(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/addSite`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_SITE,
    payload: request,
  };
}

export function updateSite(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/updateSite`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_SITE,
    payload: request,
  };
}

export function deleteSite(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/deleteSite`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_SITE,
    payload: request,
  };
}

export function addSiteEngine(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/addSiteEngine`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_SITE_ENGINE,
    payload: request,
  };
}

export function deleteSiteEngines(dataToSubmit) {
  const request = axios
    .post(`${SITE_SERVER}/deleteSiteEngines`, dataToSubmit)
    .then(response => response.data);

  return {
    type: DELETE_SITE_ENGINES,
    payload: request,
  };
}

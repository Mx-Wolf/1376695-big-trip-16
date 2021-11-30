import {createSiteInfoTemplate} from './view/site-menu-info.js';
import {createSiteFiltersTemplate} from './view/site-menu-filters.js';
import {createMainSortTemplate} from './view/main-sort.js';
import {createTripEventsList} from './view/trip-events-list.js';
import {createTripEventsListItemEditTemplate} from './view/trip-events-list-item-edit.js';
import {createTripEventsListItemTemplate} from './view/trip-event-list-item.js';
import {RenderPosition, renderTemplate} from './render.js';
import { createPageHeaderTemplate } from './view/page-header.js';
import { createNavigationTemplate } from './view/menu-navigation.js';
import { createTripCostTemplate } from './view/trip-info-cost.js';
import { createTripInfoMainTemplate } from './view/trip-info-main.js';

const renderTripInfo = (container)=>{
  renderTemplate(container,createTripInfoMainTemplate());
  renderTemplate(container,createTripCostTemplate());
};

const renderTripNavigation = (container)=>{
  renderTemplate(container, createNavigationTemplate());
};
const renderTripFilter = (container)=>{
  renderTemplate(container, createSiteFiltersTemplate());
};
const renderPageHeader = (body) => {
  renderTemplate(body,createPageHeaderTemplate());
  renderTripInfo(body.querySelector('.trip-main__trip-info'));
  renderTripNavigation(body.querySelector('.trip-controls__navigation'));
  renderTripFilter(body.querySelector('.trip-controls__filters'));
};

const renderPageMain = (body)=>{
  throw new Error(!!body);
};

const renderPage = (body) => {
  renderPageHeader(body);
  renderPageMain(body);
  const siteMainElement = body.querySelector('.trip-main');

  renderTemplate(siteMainElement, createSiteInfoTemplate(), RenderPosition.AFTERBEGIN);

  const siteMainControls = siteMainElement.querySelector('.trip-main__trip-controls ');
  renderTemplate(siteMainControls, createSiteFiltersTemplate());

  const pageBodyContainer = body.querySelector('.trip-events');
  renderTemplate(pageBodyContainer, createMainSortTemplate());
  renderTemplate(pageBodyContainer, createTripEventsList());

  const tripEventsList = body.querySelector('.trip-events__list');
  renderTemplate(tripEventsList, createTripEventsListItemEditTemplate());
  for (let i = 0; i < 3; i++) {
    renderTemplate(tripEventsList, createTripEventsListItemTemplate());
  }
};

renderPage(document.querySelector('.page-body'));


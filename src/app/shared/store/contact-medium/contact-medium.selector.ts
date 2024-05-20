import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactMediumState } from './contact-medium.state';

const selectContactMediumState = createFeatureSelector<ContactMediumState>('contactMedium');

export const selectContactMedium = createSelector(
  selectContactMediumState,
  (state: ContactMediumState) => state ? state.contactMedium : undefined
);

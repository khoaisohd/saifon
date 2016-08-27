import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/HotelCard.stories.js');
}

configure(loadStories, module);

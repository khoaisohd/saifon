import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/HotelCard.stories.js');
  require('../stories/Rate.stories.js');
}

configure(loadStories, module);

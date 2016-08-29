import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/HotelCard.stories.js');
  require('../stories/StarRating.stories.js');
  require('../stories/Filters/StarRatingsFilter.stories.js');
}

configure(loadStories, module);

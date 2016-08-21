import React from 'react';
import { Link } from 'react-router'

class HotelsSearchesForm extends React.Component {
  render() {
    return (
      <div>
        Hotel Search Form
        <div>
          <Link to="/hotels/overlay/date-picker">Check in && Check out</Link>
        </div>
      </div>
    );
  }
}

export default HotelsSearchesForm;
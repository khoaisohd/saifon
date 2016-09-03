import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateRoomsCount, updateGuestsCount } from '../actions';
import appStyles from 'containers/App/styles.css';
import { getRoomsCount, getGuestsCount } from '../selectors';
import Stepper from 'components/Stepper';
import styles from './styles.css';

class TravellersPicker extends React.Component {
  getRoomsCountOptions() {
    const options = [];
    for (let i = 1; i <= 8; i++) {
      options.push({
        value: i,
        text: `${i} room${i > 1 ? 's' : ''}`,
      });
    }
    return options;
  }

  getGuestsCountOptions() {
    const { roomsCount } = this.props;
    const options = [];
    for (let i = roomsCount; i <= 4 * roomsCount; i++) {
      options.push({
        value: i,
        text: `${i} guest${i > 1 ? 's' : ''}`,
      });
    }
    return options;
  }

  render() {
    const { updateRoomsCount, roomsCount, guestsCount, updateGuestsCount } = this.props;
    return (
      <div>
        <div className={appStyles.toolbar}>
          Select travel options
        </div>
        <div>
          <div className={styles.row}>
            <select value={roomsCount} onChange={e => updateRoomsCount(parseInt(e.target.value))}>
            {
              this.getRoomsCountOptions().map(option =>
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              )
            }
            </select>
            <i className={styles.iconDownDir}></i>
            <div className={styles.stepper}>
              <Stepper
                onIncrease={() => updateRoomsCount(roomsCount + 1)}
                onDecrease={() => updateRoomsCount(roomsCount - 1)}
                increaseEnabled={roomsCount < 8}
                decreaseEnabled={roomsCount > 1}
              />
            </div>
          </div>
          <div className={styles.row}>
            <select value={guestsCount} onChange={e => updateGuestsCount(parseInt(e.target.value))}>
              {
                this.getGuestsCountOptions().map(option =>
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                )
              }
            </select>
            <i className={styles.iconDownDir}></i>
            <div className={styles.stepper}>
              <Stepper
                className={styles.stepper}
                onIncrease={() => updateGuestsCount(guestsCount + 1)}
                onDecrease={() => updateGuestsCount(guestsCount - 1)}
                increaseEnabled={guestsCount < 4 * roomsCount}
                decreaseEnabled={guestsCount > roomsCount}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TravellersPicker.propTypes = {
  updateRoomsCount: PropTypes.func.isRequired,
  roomsCount: PropTypes.number.isRequired,
  updateGuestsCount: PropTypes.func.isRequired,
  guestsCount: PropTypes.number.isRequired,
};

TravellersPicker.contextTypes = {
  router: React.PropTypes.object,
};

const mapStateToProps = state => ({
  roomsCount: getRoomsCount(state),
  guestsCount: getGuestsCount(state),
});

const mapDispatchToProps = dispatch => ({
  updateRoomsCount: roomsCount => dispatch(updateRoomsCount(roomsCount)),
  updateGuestsCount: guestsCount => dispatch(updateGuestsCount(guestsCount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TravellersPicker);

import React from 'react';
import PropTypes from 'prop-types';
import Section from '../../Utilities/Section/Section';
import Modal from '../../Utilities/Modal/Modal';
import { constants } from '../../utils';

import styles from './Amenities.css';

const { amenitiesThreshold } = constants;

export default class Amenities extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      showModal: false,
    };
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { amenities } = this.props;
    const { showModal } = this.state;
    const amenitiesShort = <AmenitiesShortList amenities={amenities} />;
    const amenitiesLong = <AmenitiesFullList amenities={amenities} />;
    const link = amenities.length > amenitiesThreshold ? `Show all ${amenities.length} amenities` : '';
    const action = amenities.length > amenitiesThreshold ? this.toggleModal : null;
    return (
      <div>
        <Section title="Amenities" content={amenitiesShort} link={link} action={action} />
        {showModal && (
          <Modal title="Amenities" content={amenitiesLong} dismiss={this.toggleModal} />
        )}
      </div>
    );
  }
}

Amenities.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const AmenitiesShortList = (props) => {
  const { amenities } = props;
  return (
    <div className={styles.amenityList}>
      {amenities.map(
        (amenity, index) => index < amenitiesThreshold && (
        <div className={styles.amenityItem}>
          <span>
            <img className={styles.icon} src={amenity.icon} alt={amenity.value} />
          </span>
          {amenity.value}
        </div>
        ),
      )}
    </div>
  );
};

AmenitiesShortList.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const AmenitiesFullList = (props) => {
  const { amenities } = props;
  return (
    <div className={styles.amenitiesList}>
      {amenities.map(amenity => (
        <div className={styles.amenityItem}>
          {amenity.value}
          <hr />
        </div>
      ))}
    </div>
  );
};

AmenitiesFullList.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

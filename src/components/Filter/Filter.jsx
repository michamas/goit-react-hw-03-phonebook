import { Component } from 'react';
import PropTypes from 'prop-types';

export class Filter extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        <label htmlFor="filter">
          <input
            placeholder="search by name"
            id="filter"
            type="search"
            value={value}
            onChange={onChange}
          />
        </label>
      </div>
    );
  }
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

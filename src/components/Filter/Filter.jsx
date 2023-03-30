import { Component } from 'react';

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

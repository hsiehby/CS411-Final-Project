import React from 'react';
import PropTypes from "prop-types";
import './styles_search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    return (
        <div>
          <div className="Search">
            <input className="Search-input" onChange={this.handleChange} />
          </div>
        </div>
    );
  }
}

export default Search;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TransactionTable, Header, Table } from '@bpanel/bpanel-ui';
import BoxGrid from './BoxGrid';

/*
 * general list component that renders
 * different types of lists and a header
 */
class List extends PureComponent {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      text: PropTypes.string,
      headers: PropTypes.array,
      data: PropTypes.array,
      type: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      text: '',
      headers: [],
      data: [],
      type: null,
    };
  }

  render() {
    const { data, text, headers, type } = this.props;
    let render;
    if (type === 'transaction') render = <TransactionTable />;
    else render = <Table colHeaders={headers} tableData={data} />;

    return (
      <BoxGrid>
        <div>
          <Header type="h5">{text}</Header>
          {render}
        </div>
      </BoxGrid>
    );
  }
}

export default List;
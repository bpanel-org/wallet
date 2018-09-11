import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown, Text, TabMenu } from '@bpanel/bpanel-ui';
import { SendFunds, ReceiveFunds } from '../Components';

class SendReceive extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const tabs = [
      {header: 'Send Funds', body: (<SendFunds />)},
      {header: 'Receive Funds', body: (<ReceiveFunds />)},
    ];
    return (
      <div>
        <Header type="h5">Select Wallet</Header>
        <Dropdown options={[]} />
        <Text>Funds will be sent or received from this Wallet</Text>
        <Dropdown options={[]} />
        <TabMenu
          tabs={tabs}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, otherProps) => {
  return { ...otherProps };
};

const mapDispatchToProps = dispatch => {
  return {
    undefined: async () => dispatch(),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendReceive);
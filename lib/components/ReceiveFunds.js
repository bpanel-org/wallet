import React, { PureComponent } from 'react';
import { Header, Text, Button, QRCode } from '@bpanel/bpanel-ui';
import PropTypes from 'prop-types';
import BoxGrid from './BoxGrid';
import Label from './Label';

class ReceiveFunds extends PureComponent {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      receiveAddress: PropTypes.string,
      createAddress: PropTypes.func,
      selectedAccount: PropTypes.string,
      selectedWallet: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      receiveAddress: '',
      selectedAccount: '[select account]',
      selectedWallet: '[select wallet]',
    };
  }

  // generate new receive address
  async new() {
    const { createAddress, selectedWallet, selectedAccount } = this.props;
    await createAddress(selectedWallet, selectedAccount, {
      addressType: 'receive',
    });
  }

  render() {
    const {
      receiveAddress,
      selectedAccount,
      selectedWallet,
      createAddress,
    } = this.props;
    return (
      <BoxGrid
        rowClass="text-center"
        colClass="flex-column justify-content-center"
        colcount={2}
      >
        <BoxGrid rowClass="d-inline" colcount={1}>
          <Header type="h2">Receive Funds</Header>
          <Label text="Address:">
            <Text>{receiveAddress}</Text>
          </Label>
          {createAddress /* only render button when create address fn is passed */ && (
            <Button onClick={() => this.new()}>New Address</Button>
          )}
        </BoxGrid>
        <BoxGrid rowClass="d-inline" colcount={1}>
          <QRCode text={receiveAddress} />
          <Text>
            Funds sent to this address will be received in account{' '}
            {selectedAccount} in wallet {selectedWallet}
          </Text>
        </BoxGrid>
      </BoxGrid>
    );
  }
}

export default ReceiveFunds;

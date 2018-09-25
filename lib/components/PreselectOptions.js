import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SelectStep from './SelectScreens';

class PreselectOptions extends PureComponent {
  constructor(props) {
    super(props);

    /*
     * each Opts array builds user selectable options
     * header   - larger text
     * text     - sub text
     * icon     - font awesome icon
     * click[0] - key in state to change
     * click[1] - value in state to change
     *
     * the click array allows user input
     * to be propagated to setState where
     * it can be used to selectively render
     * sepecific components
     */

    this.walletTypeOpts = [
      {
        header: 'Personal Wallet',
        text: 'Personal Wallet',
        icon: 'fa-user',
        click: ['walletType', 'personal'],
      },
      {
        header: 'Multi Party',
        text: 'Multiple signatures required',
        icon: 'fa-users',
        click: ['walletType', 'multiparty'],
      },
    ];

    this.keyManagementOpts = [
      {
        header: 'Node Managed',
        text: 'The connected node will manage your keys',
        icon: 'fa-desktop',
        click: ['keyManagement', 'node'],
      },
      {
        header: 'Hardware',
        text: 'A hardware device will manage your keys',
        icon: 'fa-server',
        click: ['keyManagement', 'hardware'],
      },
    ];

    this.walletOpts = {
      node: [
        {
          header: 'New Wallet',
          text: 'A standard wallet for sending and receiving',
          icon: 'fa-plus',
          click: ['walletOpt', 'standard'],
        },
        {
          header: 'Watch Only',
          text: 'You cannot spend from this wallet',
          icon: 'fa-eye',
          click: ['walletOpt', 'watch-only'],
        },
      ],
      hardware: [
        {
          header: 'Import',
          text: 'Import a hardware wallet',
          icon: 'fa-download',
          click: ['walletOpt', 'import'],
        },
      ],
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.array,
      walletType: PropTypes.string,
      keyManagement: PropTypes.string,
      walletOpt: PropTypes.string,
      select: PropTypes.func,
    };
  }

  render() {
    const {
      children,
      walletType,
      keyManagement,
      walletOpt,
      select,
    } = this.props;

    /*
     * render logic:
     * this.children are the terminal views
     * where each stage of SelectStep updates state
     * that determines which terminal view is rendered
     *
     * step one: select wallet type
     * if user selects multiparty, render terminal view
     * step two: select key management options
     * step three: render wallet type specific options
     * step four: render terminal view
     */

    let render;
    if (!walletType)
      render = <SelectStep select={select} selection={this.walletTypeOpts} />;
    else if (walletType === 'multiparty') render = children;
    else if (!keyManagement)
      render = (
        <SelectStep select={select} selection={this.keyManagementOpts} />
      );
    else if (!walletOpt)
      render = (
        <SelectStep
          select={select}
          selection={this.walletOpts[keyManagement]}
        />
      );
    else render = children;

    return <div>{render}</div>;
  }
}

export default PreselectOptions;
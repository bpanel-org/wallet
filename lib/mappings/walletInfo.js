import { selectWallet } from '../actions';

import {
  selectWalletInfo,
  selectMultisigWalletInfo,
  selectSelectedWallet,
} from './selectors';

function mapStateToProps(state, otherProps) {
  const walletInfo = selectWalletInfo(state);
  const multisigWalletInfo = selectMultisigWalletInfo(state);
  const selectedWallet = selectSelectedWallet(state);

  return {
    walletInfo,
    multisigWalletInfo,
    selectedWallet,
    ...otherProps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectWallet: (walletId, type) => dispatch(selectWallet(walletId, type)),
  };
}

export default {
  mapStateToProps,
  mapDispatchToProps,
};
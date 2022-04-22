const ACCOUNT_TYPES = {
  CHECKING: 'checking',
  SAVINGS: 'savings',
  MONEY_MARKET: 'money-market',
  CERTIFICATES_OF_DEPOSIT: 'certificates-of-deposit',
  BROKERAGE: 'brokerage',
  INDIVIDUAL_RETIREMENT: 'individual-retirement',
};

const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  DELINQUENT: 'DELINQUENT',
  DISPATCHED: 'DISPATCHED',
  HOLD: 'HOLD',
  SEIZED: 'SEIZED'
};

module.exports = {
  ACCOUNT_TYPES,
  ACCOUNT_STATUS,
}
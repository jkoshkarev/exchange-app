import { ReactComponent as UKFlag } from './svg/united-kingdom.svg';
import { ReactComponent as USFlag } from './svg/united-states.svg';
import { ReactComponent as EUFlag } from './svg/world.svg';

export default function mapCurrencyToFlag(currency) {
  switch (currency) {
    case 'EUR':
      return EUFlag;
    case 'USD':
      return USFlag;
    case 'GBP':
      return UKFlag;
    default:
      return null;
  }
}

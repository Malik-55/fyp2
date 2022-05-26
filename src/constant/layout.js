import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CUSTOMWIDTH = (number) => {
  return wp(number.toString())
};
const CUSTOMHEIGHT = (number) => {
  return hp(number.toString())
};

export { CUSTOMWIDTH, CUSTOMHEIGHT };

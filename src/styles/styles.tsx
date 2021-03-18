import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacingSizes } from '../constants/constants';
import Fonts, { FontSizes } from '../constants/fonts';

export const HeaderStyles = StyleSheet.create({
  trainingName: {
    fontFamily: Fonts.strong,
    fontSize: FontSizes.medium,
    color: Colors.text
  },
  trainingDetails: {
    fontFamily: Fonts.default,
    fontSize: FontSizes.small,
    color: Colors.fadedText
  },
  exerciseName: {
    fontFamily: Fonts.default,
    fontSize: FontSizes.small,
    color: Colors.text
  },
  exerciseDetails: {
    fontFamily: Fonts.default,
    fontSize: FontSizes.tiny,
    color: Colors.fadedText
  }
});

export const InputStyles = StyleSheet.create({
  textInput: {
    paddingVertical: spacingSizes.small,
    backgroundColor: Colors.white
  },
  label: {
    paddingVertical: spacingSizes.small,
    fontSize: FontSizes.small
  }
});

export const PaddingStyles = {
  horizontal: StyleSheet.create({
    tiny: {
      paddingHorizontal: spacingSizes.tiny,
    },
    small: {
      paddingHorizontal: spacingSizes.small
    },
    medium: {
      paddingHorizontal: spacingSizes.medium
    },
    large: {
      paddingHorizontal: spacingSizes.large
    },
    extraLarge: {
      paddingHorizontal: spacingSizes.extraLarge
    }
  }),
  vertical: StyleSheet.create({
    tiny: {
      paddingVertical: spacingSizes.tiny,
    },
    small: {
      paddingVertical: spacingSizes.small
    },
    medium: {
      paddingVertical: spacingSizes.medium
    },
    large: {
      paddingVertical: spacingSizes.large
    },
    extraLarge: {
      paddingVertical: spacingSizes.extraLarge
    }
  })
}

export const FlexStyles = StyleSheet.create({
  columnView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export const FooterStyles = StyleSheet.create({
  executionFooter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  timer: {
    textAlign: 'center',
    fontSize: FontSizes.medium
  }
})
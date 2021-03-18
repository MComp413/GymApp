import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { paddingSizes } from '../constants/constants';
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
    padding: 5,
    backgroundColor: "white"
  }
});

export const PaddingStyles = {
  horizontal: StyleSheet.create({
    tiny: {
      paddingHorizontal: paddingSizes.tiny,
    },
    small: {
      paddingHorizontal: paddingSizes.small
    },
    medium: {
      paddingHorizontal: paddingSizes.medium
    },
    large: {
      paddingHorizontal: paddingSizes.large
    },
    extraLarge: {
      paddingHorizontal: paddingSizes.extraLarge
    }
  }),
  vertical: StyleSheet.create({
    tiny: {
      paddingVertical: paddingSizes.tiny,
    },
    small: {
      paddingVertical: paddingSizes.small
    },
    medium: {
      paddingVertical: paddingSizes.medium
    },
    large: {
      paddingVertical: paddingSizes.large
    },
    extraLarge: {
      paddingVertical: paddingSizes.extraLarge
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
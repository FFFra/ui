import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { connectStyle } from '@shoutem/theme';

import { makeZoomable } from '@shoutem/animation';

const ZoomableImage = makeZoomable(Image);

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  source: Image.propTypes.source,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
};

const CLOSE_ICON_NAME = 'clear';
const CLOSE_ICON_SIZE = 25;

/**
 * Renders an ImagePreview which shows an inline image preview.
 * When clicked, the image is displayed in full screen.
 */
class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.onPressCloseButton = this.onPressCloseButton.bind(this);
    this.onPressImage = this.onPressImage.bind(this);
  }

  state = {
    fullScreen: false,
  };

  onPressCloseButton() {
    this.setState({
      fullScreen: false,
    });
  }

  onPressImage() {
    this.setState({
      fullScreen: true,
    });
  }

  render() {
    const { source, style, width, height } = this.props;

    if (this.state.fullScreen) {
      const closeButton = (
        <View style={style.header}>
          <TouchableOpacity style={style.fullScreen} onPress={this.onPressCloseButton}>
            <Icon name={CLOSE_ICON_NAME} size={CLOSE_ICON_SIZE} style={style.closeIcon} />
          </TouchableOpacity>
        </View>
      );

      return (
        <Modal
          animated
          transparent
        >
          <View style={style.fullScreenContainer}>
            <ZoomableImage
              style={style.image}
              componentWidth={width}
              componentHeight={height}
              source={source}
            />
            {closeButton}
          </View>
        </Modal>
      );
    }

    return (
      <View style={[style.container, { width, height }]}>
        <TouchableOpacity onPress={this.onPressImage} >
          <Image
            style={style.thumbnail}
            source={source}
            width={width}
            height={height}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

ImagePreview.propTypes = propTypes;

const StyledImagePreview = connectStyle('shoutem.ui.ImagePreview')(ImagePreview);

export {
  StyledImagePreview as ImagePreview,
};

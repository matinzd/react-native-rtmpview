//
//  RtmpView.js
//
//  Created by Eric Silverberg on 2018/04/07.
//  Copyright © 2018 Perry Street Software. All rights reserved.
//

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { requireNativeComponent, View, UIManager, findNodeHandle } from 'react-native';

var RCT_VIDEO_REF = 'RtmpView';

class RtmpView extends Component {
  constructor(props) {
    super(props);
  }

  _onPlaybackState = (event) => {
    if (!this.props.onPlaybackState) {
      return;
    }
    this.props.onPlaybackState(event.nativeEvent)
  }

  _onFirstVideoFrameRendered = (event) => {
    if (!this.props.onFirstVideoFrameRendered) {
      return;
    }
    this.props.onFirstVideoFrameRendered(event.nativeEvent)
  }

  initialize() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.initialize,
      null
    );
  }

  pause() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.pause,
      null
    );
  }

  play() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.play,
      null
    );
  }

  stop() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.stop,
      null
    );
  }

  mute() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.mute,
      null
    );
  }

  unmute() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.refs[RCT_VIDEO_REF]),
      UIManager.RNRtmpView.Commands.unmute,
      null
    );
  }

  componentWillUnmount() {
      console.log('componentWillUnmount', this.route.name);
      this.stop()
  }

  render() {
    return <RNRtmpView
      ref={RCT_VIDEO_REF}
      scalingMode='MovieScalingModeAspectFill'
      shouldMute={false}
      onPlaybackState={this._onPlaybackState.bind(this)}
      onFirstVideoFrameRendered={this._onFirstVideoFrameRendered.bind(this)}
      {...this.props}
    />;
  };
}

RtmpView.name = RCT_VIDEO_REF;
RtmpView.propTypes = {
  url: PropTypes.string,
  scalingMode: PropTypes.string,
  shouldMute: PropTypes.bool,
  onPlaybackState: PropTypes.func,
  onFirstVideoFrameRendered: PropTypes.func,
  ...View.propTypes
};

const RNRtmpView = requireNativeComponent('RNRtmpView', RtmpView, {
});

module.exports = RtmpView;
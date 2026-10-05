import { Component } from 'react';

/** If WebGL or the 3D chunk fails, the page quietly keeps its CSS layers. */
export default class GLBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(e) {
    console.warn('3D layer disabled:', e);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

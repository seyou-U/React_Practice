import { appendChild, createNode, removeChild } from './hostTypes';
import Reconciler from 'react-reconciler';

// 学習用のため最低限の実装でイメージを掴む
const hostConfig = {
  supportsMutation: true,

  createInstance(type, props) {
    return createNode(type, props);
  },

  createTextInstance(text) {
    return createNode('TEXT', { text });
  },

  appendInitialChild(parent, child) {
    appendChild(parent, child);
  },

  removeChild(parent, child) {
    removeChild(parent, child);
  },

  prepareUpdate() {
    // 更新があることだけを知らせる (学習用で簡易的な例)
    return true;
  },

  commitUpdate(instance, _updatePayload, _type, _oldProps, newProps) {
    instance.props = newProps;
  },

  commitTextUpdate(textInstance, _oldText, newText) {
    textInstance.props = { text: newText };
  },

  appendChildToContainer(container, child) {
    appendChild(container, child);
  },

  removeChildToContainer(container, child) {
    removeChild(container, child);
  },

  getRootHostContext() {
    return null;
  },
  getChildHostContext() {
    return null;
  },
  shouldSetTextContent() {
    return false;
  },
  getPublicInstance(instance) {
    return instance;
  },

  new: Date.now(),
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,

  // 今回は不要なため空で実装
  prepareForCommit() {},
  resetAfterCommit() {},
};

export const MyReconciler = Reconciler(hostConfig);

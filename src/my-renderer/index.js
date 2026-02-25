import { MyReconciler } from './reconciler';

export function createContainer() {
  return { type: 'ROOT', props: {}, Children: [] };
}

export function render(element, container) {
  const root = MyReconciler.createContainer(container, 0, null, false, null, '', () => {}, null);

  MyReconciler.updateContainer(element, root, null, () => {});
  return root;
}

export function dump(container) {
  console.log(JSON.stringify(container, null, 2));
}

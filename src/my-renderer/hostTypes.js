export function createNode(type, props) {
  return { type, props, children: [] };
}

export function appendChild(parent, child) {
  parent.children.push(child);
}

export function removeChild(parent, child) {
  parent.children = parent.children.filter(c => c !== child);
}

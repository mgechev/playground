class KDNode {
  constructor(point, dimension) {
    this.point = point;
    this.dimension = dimension;
    this.left = null;
    this.right = null;
  }
}

class KDTree {
  constructor(points) {
    this.dimensions = Object.keys(points[0]);
    this.root = this.#buildTree(points, 0);
    console.log(this.root);
  }

  #buildTree(points, depth) {
    if (points.length === 0) {
      return null;
    }

    const axis = depth % this.dimensions.length;
    const dimension = this.dimensions[axis];
    points.sort((a, b) => a[dimension] - b[dimension]);
    const median = Math.floor(points.length / 2);

    const node = new KDNode(points[median], dimension);
    node.left = this.#buildTree(points.slice(0, median), depth + 1);
    node.right = this.#buildTree(points.slice(median + 1), depth + 1);

    return node;
  }

  nearestNeighbor(point) {
    const best = { node: null, distance: Infinity };
    this.#search(this.root, point, 0, best);
    return best;
  }

  #search(node, target, depth, best) {
    if (node === null) {
      return;
    }

    const axis = depth % this.dimensions.length;
    const dimension = this.dimensions[axis];
    const next = target[dimension] < node.point[dimension] ? node.left : node.right;
    const other = target[dimension] < node.point[dimension] ? node.right : node.left;

    this.#search(next, target, depth + 1, best);

    const distance = this.#distance(node.point, target);
    if (distance < best.distance) {
      best.node = node;
      best.distance = distance;
    }

    if (Math.abs(target[dimension] - node.point[dimension]) < best.distance) {
      this.#search(other, target, depth + 1, best);
    }
  }

  #distance(a, b) {
    return Math.sqrt(Object.keys(a).reduce((acc, key) => acc + Math.pow(a[key] - b[key], 2), 0));
  }
}

// Usage
const points = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3.5 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
];

const tree = new KDTree(points);
const point = { x: 3, y: 3 };
const nearest = tree.nearestNeighbor(point);
console.log(nearest); // { x: 3, y: 3.5 }

function random() {
  return "".concat(Math.random().toString(36), "00000000000000000").replace(/[^a-z]+/g, '').slice(0, 5);
}

function circles() {
  var size = 20;
  var background = '';
  var radius = 2;
  var complement = false;
  var fill = '#343434';
  var stroke = '#343434';
  var strokeWidth = 0;
  var id = random();

  var $ = function $(selection) {
    var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

    if (background) {
      group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
    }

    group.append('circle').attr('cx', size / 2).attr('cy', size / 2).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);

    if (complement) {
      for (var _i = 0, _arr = [[0, 0], [0, size], [size, 0], [size, size]]; _i < _arr.length; _i++) {
        var corner = _arr[_i];
        group.append('circle').attr('cx', corner[0]).attr('cy', corner[1]).attr('r', radius).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth);
      }
    }
  };

  $.heavier = function (_) {
    radius *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    radius /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.background = function (_) {
    background = _;
    return $;
  };

  $.size = function (_) {
    size = _;
    return $;
  };

  $.complement = function (_) {
    complement = arguments.length === 0 ? true : _;
    return $;
  };

  $.radius = function (_) {
    radius = _;
    return $;
  };

  $.fill = function (_) {
    fill = _;
    return $;
  };

  $.stroke = function (_) {
    stroke = _;
    return $;
  };

  $.strokeWidth = function (_) {
    strokeWidth = _;
    return $;
  };

  $.id = function (_) {
    if (arguments.length === 0) {
      return id;
    }

    id = _;
    return $;
  };

  $.url = function () {
    return "url(#".concat(id, ")");
  };

  return $;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function lines() {
  var size = 20;
  var stroke = '#343434';
  var strokeWidth = 2;
  var background = '';
  var id = random();
  var orientation = ['diagonal'];
  var shapeRendering = 'auto';

  var path = function path(orientation) {
    var s = size;

    switch (orientation) {
      case '0/8':
      case 'vertical':
        return "M ".concat(s / 2, ", 0 l 0, ").concat(s);

      case '1/8':
        return "M ".concat(-s / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s, " M ").concat(s / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s, " M ").concat(s * 3 / 4, ",").concat(s, " l ").concat(s / 2, ",").concat(-s);

      case '2/8':
      case 'diagonal':
        return "M 0,".concat(s, " l ").concat(s, ",").concat(-s, " M ").concat(-s / 4, ",").concat(s / 4, " l ").concat(s / 2, ",").concat(-s / 2, " M ").concat(3 / 4 * s, ",").concat(5 / 4 * s, " l ").concat(s / 2, ",").concat(-s / 2);

      case '3/8':
        return "M 0,".concat(3 / 4 * s, " l ").concat(s, ",").concat(-s / 2, " M 0,").concat(s / 4, " l ").concat(s, ",").concat(-s / 2, " M 0,").concat(s * 5 / 4, " l ").concat(s, ",").concat(-s / 2);

      case '4/8':
      case 'horizontal':
        return "M 0,".concat(s / 2, " l ").concat(s, ",0");

      case '5/8':
        return "M 0,".concat(-s / 4, " l ").concat(s, ",").concat(s / 2, "M 0,").concat(s / 4, " l ").concat(s, ",").concat(s / 2, " M 0,").concat(s * 3 / 4, " l ").concat(s, ",").concat(s / 2);

      case '6/8':
        return "M 0,0 l ".concat(s, ",").concat(s, " M ").concat(-s / 4, ",").concat(3 / 4 * s, " l ").concat(s / 2, ",").concat(s / 2, " M ").concat(s * 3 / 4, ",").concat(-s / 4, " l ").concat(s / 2, ",").concat(s / 2);

      case '7/8':
        return "M ".concat(-s / 4, ",0 l ").concat(s / 2, ",").concat(s, " M ").concat(s / 4, ",0 l ").concat(s / 2, ",").concat(s, " M ").concat(s * 3 / 4, ",0 l ").concat(s / 2, ",").concat(s);

      default:
        return "M ".concat(s / 2, ", 0 l 0, ").concat(s);
    }
  };

  var $ = function $(selection) {
    var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size).attr('height', size);

    if (background) {
      group.append('rect').attr('width', size).attr('height', size).attr('fill', background);
    }

    var _iterator = _createForOfIteratorHelper(orientation),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var o = _step.value;
        group.append('path').attr('d', path(o)).attr('stroke-width', strokeWidth).attr('shape-rendering', shapeRendering).attr('stroke', stroke).attr('stroke-linecap', 'square');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  $.heavier = function (_) {
    strokeWidth *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    strokeWidth /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.background = function (_) {
    background = _;
    return $;
  };

  $.size = function (_) {
    size = _;
    return $;
  };

  $.orientation = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (arguments.length === 0) {
      return $;
    }

    orientation = args;
    return $;
  };

  $.shapeRendering = function (_) {
    shapeRendering = _;
    return $;
  };

  $.stroke = function (_) {
    stroke = _;
    return $;
  };

  $.strokeWidth = function (_) {
    strokeWidth = _;
    return $;
  };

  $.id = function (_) {
    if (arguments.length === 0) {
      return id;
    }

    id = _;
    return $;
  };

  $.url = function () {
    return "url(#".concat(id, ")");
  };

  return $;
}

function paths() {
  var width = 1;
  var height = 1;
  var size = 20;
  var stroke = '#343434';
  var strokeWidth = 2;
  var background = '';

  var d = function d(s) {
    return "M ".concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 4, ",").concat(-s / 2, "l").concat(s / 4, ",").concat(s / 2);
  };

  var id = random();
  var fill = 'transparent';
  var shapeRendering = 'auto';

  var path = function path(_) {
    var s = size;

    switch (_) {
      case 'squares':
        return "M ".concat(s / 4, " ").concat(s / 4, " l ").concat(s / 2, " 0 l 0 ").concat(s / 2, " l ").concat(-s / 2, " 0 Z");

      case 'nylon':
        return "M 0 ".concat(s / 4, " l ").concat(s / 4, " 0 l 0 ").concat(-s / 4, " M ").concat(s * 3 / 4, " ").concat(s, " l 0 ").concat(-s / 4, " l ").concat(s / 4, " 0 M ").concat(s / 4, " ").concat(s / 2, " l 0 ").concat(s / 4, " l ").concat(s / 4, " 0 M ").concat(s / 2, " ").concat(s / 4, " l ").concat(s / 4, " 0 l 0 ").concat(s / 4);

      case 'waves':
        return "M 0 ".concat(s / 2, " c ").concat(s / 8, " ").concat(-s / 4, " , ").concat(s * 3 / 8, " ").concat(-s / 4, " , ").concat(s / 2, " 0 c ").concat(s / 8, " ").concat(s / 4, " , ").concat(s * 3 / 8, " ").concat(s / 4, " , ").concat(s / 2, " 0 M ").concat(-s / 2, " ").concat(s / 2, " c ").concat(s / 8, " ").concat(s / 4, " , ").concat(s * 3 / 8, " ").concat(s / 4, " , ").concat(s / 2, " 0 M ").concat(s, " ").concat(s / 2, " c ").concat(s / 8, " ").concat(-s / 4, " , ").concat(s * 3 / 8, " ").concat(-s / 4, " , ").concat(s / 2, " 0");

      case 'woven':
        return "M ".concat(s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(s / 2, "M").concat(s * 3 / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(-s / 2, " M").concat(s / 4, ",").concat(s * 3 / 4, "l").concat(-s / 2, ",").concat(s / 2, "M").concat(s * 3 / 4, ",").concat(s * 5 / 4, "l").concat(s / 2, ",").concat(-s / 2, " M").concat(-s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(-s / 2);

      case 'crosses':
        return "M ".concat(s / 4, ",").concat(s / 4, "l").concat(s / 2, ",").concat(s / 2, "M").concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 2, ",").concat(-s / 2);

      case 'caps':
        return "M ".concat(s / 4, ",").concat(s * 3 / 4, "l").concat(s / 4, ",").concat(-s / 2, "l").concat(s / 4, ",").concat(s / 2);

      case 'hexagons':
        width = 3;
        height = Math.sqrt(3);
        return "M ".concat(s, ",0 l ").concat(s, ",0 l ").concat(s / 2, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s / 2, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s, ",0 l ").concat(-s / 2, ",").concat(-s * Math.sqrt(3) / 2, " Z M 0,").concat(s * Math.sqrt(3) / 2, " l ").concat(s / 2, ",0 M ").concat(3 * s, ",").concat(s * Math.sqrt(3) / 2, " l ").concat(-s / 2, ",0");

      default:
        return _(s);
    }
  };

  var $ = function $(selection) {
    var p = path(d);
    var group = selection.append('defs').append('pattern').attr('id', id).attr('patternUnits', 'userSpaceOnUse').attr('width', size * width).attr('height', size * height);

    if (background) {
      group.append('rect').attr('width', size * width).attr('height', size * height).attr('fill', background);
    }

    group.append('path').attr('d', p).attr('fill', fill).attr('stroke', stroke).attr('stroke-width', strokeWidth).attr('stroke-linecap', 'square').attr('shape-rendering', shapeRendering);
  };

  $.heavier = function (_) {
    strokeWidth *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.lighter = function (_) {
    strokeWidth /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _;
    return $;
  };

  $.background = function (_) {
    background = _;
    return $;
  };

  $.shapeRendering = function (_) {
    shapeRendering = _;
    return $;
  };

  $.size = function (_) {
    size = _;
    return $;
  };

  $.d = function (_) {
    d = _;
    return $;
  };

  $.fill = function (_) {
    fill = _;
    return $;
  };

  $.stroke = function (_) {
    stroke = _;
    return $;
  };

  $.strokeWidth = function (_) {
    strokeWidth = _;
    return $;
  };

  $.id = function (_) {
    if (arguments.length === 0) {
      return id;
    }

    id = _;
    return $;
  };

  $.url = function () {
    return "url(#".concat(id, ")");
  };

  return $;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

var main = {
  circles: circles,
  lines: lines,
  paths: paths
};

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection_selection() {
  return this;
}

Selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

/*!
 * PolygonPatterns. SVG hatch/fill patterns for MapLibre GL JS polygons.
 *
 * Generates SVG patterns via textures.js (https://github.com/riccardoscalco/textures),
 * renders them to canvas, and registers them as MapLibre GL images for use
 * with `fill-pattern`.
 *
 * Usage:
 *   const patterns = new PolygonPatterns(map, { prewarmOnLoad: true });
 *   await patterns.ensure('lines-default', '#c65b2e');
 *   patterns.applyToLayer('my-polygon-layer');
 *
 *   // Or use expression helpers directly:
 *   map.addLayer({
 *     id: 'my-polygons',
 *     type: 'fill',
 *     source: 'my-source',
 *     paint: {
 *       'fill-pattern': patterns.buildFillPatternExpr(),
 *       'fill-opacity': patterns.buildFillOpacityExpr(0.8),
 *     },
 *   });
 */


const PATTERNS = [
  { id: "lines-default", factory: (c) => main.lines().size(10).stroke(c) },
  { id: "lines-heavier", factory: (c) => main.lines().size(10).heavier().stroke(c) },
  { id: "lines-lighter", factory: (c) => main.lines().size(10).lighter().stroke(c) },
  { id: "lines-thicker", factory: (c) => main.lines().size(10).thicker().stroke(c) },
  { id: "lines-thinner", factory: (c) => main.lines().size(10).thinner().stroke(c) },
  {
    id: "lines-heavy-thin",
    factory: (c) => main.lines().size(10).heavier(10).thinner(1.5).stroke(c),
  },
  { id: "lines-tiny", factory: (c) => main.lines().size(2).strokeWidth(1).stroke(c) },
  { id: "lines-small", factory: (c) => main.lines().size(4).strokeWidth(2).stroke(c) },
  {
    id: "lines-vertical-crisp",
    factory: (c) =>
      main
        .lines()
        .size(10)
        .orientation("vertical")
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke(c),
  },
  {
    id: "lines-steep",
    factory: (c) => main.lines().size(10).orientation("3/8").stroke(c),
  },
  {
    id: "lines-crossed",
    factory: (c) => main.lines().size(10).orientation("3/8", "7/8").stroke(c),
  },
  {
    id: "lines-grid-crisp",
    factory: (c) =>
      main
        .lines()
        .orientation("vertical", "horizontal")
        .size(2)
        .strokeWidth(1)
        .shapeRendering("crispEdges")
        .stroke(c),
  },
  { id: "circles-default", factory: (c) => main.circles().size(10).fill(c).stroke(c) },
  {
    id: "circles-heavier",
    factory: (c) => main.circles().size(10).heavier().fill(c).stroke(c),
  },
  {
    id: "circles-lighter",
    factory: (c) => main.circles().size(10).lighter().fill(c).stroke(c),
  },
  {
    id: "circles-thicker",
    factory: (c) => main.circles().size(10).thicker().fill(c).stroke(c),
  },
  {
    id: "circles-thinner",
    factory: (c) => main.circles().size(10).thinner().fill(c).stroke(c),
  },
  { id: "circles-size5", factory: (c) => main.circles().size(3).fill(c).stroke(c) },
  {
    id: "circles-radius4",
    factory: (c) => main.circles().size(10).radius(4).fill(c).stroke(c),
  },
  {
    id: "circles-radius4-thin",
    factory: (c) =>
      main.circles().size(10).radius(4).fill("transparent").strokeWidth(2).stroke(c),
  },
  {
    id: "circles-small-fill",
    factory: (c) => main.circles().size(5).radius(2).fill(c).stroke(c),
  },
  {
    id: "paths-hexagons",
    factory: (c) => main.paths().d("hexagons").size(4).strokeWidth(2).stroke(c),
  },
  {
    id: "paths-crosses",
    factory: (c) => main.paths().d("crosses").size(10).lighter().thicker().stroke(c),
  },
  {
    id: "paths-caps",
    factory: (c) => main.paths().d("caps").size(10).lighter().thicker().stroke(c),
  },
  {
    id: "paths-woven",
    factory: (c) => main.paths().d("woven").size(10).lighter().thicker().stroke(c),
  },
  { id: "paths-waves", factory: (c) => main.paths().d("waves").size(10).thicker().stroke(c) },
  {
    id: "paths-nylon",
    factory: (c) =>
      main.paths().d("nylon").size(10).lighter().shapeRendering("crispEdges").stroke(c),
  },
  { id: "paths-squares", factory: (c) => main.paths().d("squares").size(10).stroke(c) },
];

const TILE_SIZES = {
  "lines-default": { w: 10, h: 10 },
  "lines-heavier": { w: 10, h: 10 },
  "lines-lighter": { w: 10, h: 10 },
  "lines-thicker": { w: 5, h: 5 },
  "lines-thinner": { w: 20, h: 20 },
  "lines-heavy-thin": { w: 30, h: 30 },
  "lines-tiny": { w: 2, h: 2 },
  "lines-small": { w: 4, h: 4 },
  "lines-vertical-crisp": { w: 10, h: 10 },
  "lines-steep": { w: 10, h: 10 },
  "lines-crossed": { w: 10, h: 10 },
  "lines-grid-crisp": { w: 2, h: 2 },
  "circles-default": { w: 10, h: 10 },
  "circles-heavier": { w: 10, h: 10 },
  "circles-lighter": { w: 10, h: 10 },
  "circles-thicker": { w: 5, h: 5 },
  "circles-thinner": { w: 20, h: 20 },
  "circles-size5": { w: 3, h: 3 },
  "circles-radius4": { w: 10, h: 10 },
  "circles-radius4-thin": { w: 10, h: 10 },
  "circles-small-fill": { w: 5, h: 5 },
  "paths-hexagons": { w: 12, h: 6.928 },
  "paths-crosses": { w: 10, h: 10 },
  "paths-caps": { w: 10, h: 10 },
  "paths-woven": { w: 10, h: 10 },
  "paths-waves": { w: 10, h: 10 },
  "paths-nylon": { w: 10, h: 10 },
  "paths-squares": { w: 10, h: 10 },
};

const PATTERN_SCALE = 4;

const DEFAULTS = {
  imagePrefix: "maplibre-pattern",
  dummyPatternId: "maplibre-pattern-dummy",
  prewarmOnLoad: true,
  prewarmColor: "#333333",
  patterns: PATTERNS,
  tileSizes: TILE_SIZES,
  propertyPrefix: "geoglify",
};

function normalizeColor(color) {
  return color.replace("#", "").toLowerCase();
}

function getPatternImageName(prefix, patternId, color) {
  return prefix + "-" + patternId + "-" + normalizeColor(color);
}

class PolygonPatterns {
  constructor(map, options = {}) {
    if (!map) throw new Error("PolygonPatterns: a MapLibre GL `map` instance is required");
    this.map = map;
    this.opts = Object.assign({}, DEFAULTS, options);
    this._cache = new Map();
    this._ready = false;

    this._setup = this._setup.bind(this);

    if (map.isStyleLoaded()) {
      this._setup();
    } else {
      map.once("load", this._setup);
    }
  }

  _setup() {
    this._addDummyPattern();
    if (this.opts.prewarmOnLoad) {
      this.prewarm(this.opts.prewarmColor);
    }
    this._ready = true;
  }

  _addDummyPattern() {
    const name = this.opts.dummyPatternId;
    if (this.map.hasImage(name)) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1, 1);
    this.map.addImage(name, ctx.getImageData(0, 0, 1, 1), { pixelRatio: 1 });
  }

  async _generate(patternId, color) {
    const patternDef = this._getPatternById(patternId);
    if (!patternDef) throw new Error("Unknown pattern: " + patternId);

    const t = patternDef.factory(color);
    const tile = this.opts.tileSizes[patternId] || { w: 10, h: 10 };
    const name = this.getImageName(patternId, color);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", tile.w);
    svg.setAttribute("height", tile.h);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const sel = select(svg);
    sel.call(t);
    sel
      .append("rect")
      .attr("width", tile.w)
      .attr("height", tile.h)
      .attr("fill", "url(#" + t.id() + ")");

    const svgBlob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(svgBlob);

    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = blobUrl;
    });
    URL.revokeObjectURL(blobUrl);

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(tile.w * PATTERN_SCALE);
    canvas.height = Math.round(tile.h * PATTERN_SCALE);
    const ctx = canvas.getContext("2d");
    ctx.scale(PATTERN_SCALE, PATTERN_SCALE);
    ctx.drawImage(img, 0, 0, tile.w, tile.h);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const options = { pixelRatio: PATTERN_SCALE };

    if (this.map.hasImage(name)) {
      this.map.updateImage(name, imageData, options);
    } else {
      this.map.addImage(name, imageData, options);
    }

    return name;
  }

  _cacheKey(patternId, color) {
    return patternId + "-" + normalizeColor(color);
  }

  getImageName(patternId, color) {
    return getPatternImageName(this.opts.imagePrefix, patternId, color);
  }

  _getPatternById(id) {
    return this.opts.patterns.find((p) => p.id === id);
  }

  randomPatternId() {
    const patterns = this.opts.patterns;
    return patterns[Math.floor(Math.random() * patterns.length)].id;
  }

  async ensure(patternId, color) {
    const key = this._cacheKey(patternId, color);
    const cached = this._cache.get(key);
    if (cached) return cached;

    const promise = this._generate(patternId, color).catch((err) => {
      this._cache.delete(key);
      throw err;
    });
    this._cache.set(key, promise);
    return promise;
  }

  async prewarm(color) {
    const c = color || this.opts.prewarmColor;
    try {
      await Promise.all(this.opts.patterns.map((p) => this.ensure(p.id, c)));
    } catch {
      // prewarm is opportunistic — failures are non-critical
    }
  }

  buildFillPatternExpr() {
    const prefix = this.opts.imagePrefix;
    const dummy = this.opts.dummyPatternId;
    const propPrefix = this.opts.propertyPrefix;

    return [
      "case",
      ["boolean", ["get", propPrefix + ":patternEnabled"], false],
      [
        "concat",
        prefix + "-",
        ["get", propPrefix + ":patternId"],
        "-",
        ["get", propPrefix + ":patternColor"],
      ],
      dummy,
    ];
  }

  buildFillOpacityExpr(fallbackOpacity) {
    const propPrefix = this.opts.propertyPrefix;

    return [
      "case",
      ["boolean", ["get", propPrefix + ":patternEnabled"], false],
      ["/", ["get", propPrefix + ":patternOpacity"], 100],
      ["boolean", ["feature-state", propPrefix + ":fillOpacity"], false],
      ["/", ["feature-state", propPrefix + ":fillOpacity"], 100],
      fallbackOpacity != null ? fallbackOpacity : 0.8,
    ];
  }

  applyToLayer(layerId, { opacity } = {}) {
    const layer = this.map.getLayer(layerId);
    if (!layer) throw new Error("Layer not found: " + layerId);

    this.map.setPaintProperty(layerId, "fill-pattern", this.buildFillPatternExpr());
    this.map.setPaintProperty(layerId, "fill-opacity", this.buildFillOpacityExpr(opacity));
  }

  setOptions(patch) {
    Object.assign(this.opts, patch);
    return this;
  }

  setPatterns(patterns) {
    this.opts.patterns = patterns;
    return this;
  }

  setTileSizes(sizes) {
    Object.assign(this.opts.tileSizes, sizes);
    return this;
  }

  destroy() {
    this._cache.clear();
    this._ready = false;
  }

  // ── Static: graph coloring ────────────────────────────────────────
  // Assigns distinct patterns to adjacent polygons so borders are
  // visually distinguishable. Ported from geoglify.com
  //
  //   features: [{ id, coordinates }]
  //     id          — unique identifier (string or number)
  //     coordinates — the geometry.coordinates array from a GeoJSON
  //                   Polygon or MultiPolygon feature
  //
  //   patternIds: string[]
  //
  //   Returns: [{ id, patternId }]
  //
  static colorize(features, patternIds) {
    var n = features.length;
    var k = patternIds.length;
    if (n === 0 || k === 0) return [];

    var PRECISION = 1e4;
    var edgeIndex = new Map();
    var processedPairs = new Set();
    var adj = Array.from({ length: n }, function () {
      return [];
    });

    function toRings(polygon) {
      return polygon.rings || [polygon.coordinates];
    }

    for (var i = 0; i < n; i++) {
      var rings = toRings(features[i]);
      for (var r = 0; r < rings.length; r++) {
        var coords = rings[r];
        for (var p = 0, q = coords.length - 1; p < coords.length; q = p++) {
          var x1 = Math.round(coords[p][0] * PRECISION);
          var y1 = Math.round(coords[p][1] * PRECISION);
          var x2 = Math.round(coords[q][0] * PRECISION);
          var y2 = Math.round(coords[q][1] * PRECISION);
          if (x1 === x2 && y1 === y2) continue;

          var ax, ay, bx, by;
          if (x1 < x2 || (x1 === x2 && y1 < y2)) {
            ax = x1;
            ay = y1;
            bx = x2;
            by = y2;
          } else {
            ax = x2;
            ay = y2;
            bx = x1;
            by = y1;
          }
          var key = ax + "," + ay + "|" + bx + "," + by;
          var indices = edgeIndex.get(key);
          if (indices) {
            if (indices[indices.length - 1] !== i) indices.push(i);
          } else {
            edgeIndex.set(key, [i]);
          }
        }
      }
    }

    for (var _i = 0, _arr = Array.from(edgeIndex.values()); _i < _arr.length; _i++) {
      var indices = _arr[_i];
      if (indices.length < 2) continue;
      for (var a = 0; a < indices.length; a++) {
        for (var b = a + 1; b < indices.length; b++) {
          var ii = indices[a];
          var jj = indices[b];
          var pairKey = ii < jj ? ii + "," + jj : jj + "," + ii;
          if (processedPairs.has(pairKey)) continue;
          processedPairs.add(pairKey);
          adj[ii].push(jj);
          adj[jj].push(ii);
        }
      }
    }

    var colors = new Int32Array(n).fill(-1);
    var avail = new Uint32Array(k);

    for (var i2 = 0; i2 < n; i2++) {
      var nb = adj[i2];
      var usedMask = 0;
      var usedArr = k <= 31 ? null : new Array(k).fill(false);
      for (var j = 0; j < nb.length; j++) {
        var c = colors[nb[j]];
        if (c >= 0) {
          if (k <= 31) usedMask |= 1 << c;
          else usedArr[c] = true;
        }
      }
      var availCount = 0;
      for (var c2 = 0; c2 < k; c2++) {
        if (k <= 31 ? !(usedMask & (1 << c2)) : !usedArr[c2]) {
          avail[availCount++] = c2;
        }
      }
      colors[i2] =
        availCount > 0 ? avail[(Math.random() * availCount) | 0] : (Math.random() * k) | 0;
    }

    var result = new Array(n);
    for (var i3 = 0; i3 < n; i3++) {
      result[i3] = { id: features[i3].id, patternId: patternIds[colors[i3]] };
    }
    return result;
  }
}

if (typeof maplibregl !== "undefined") {
  maplibregl.PolygonPatterns = PolygonPatterns;
}

export { PolygonPatterns as default };

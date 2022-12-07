(function (React, adminjs, designSystem) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };
    return _extends.apply(this, arguments);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Edit = function Edit(_ref) {
    var property = _ref.property,
        record = _ref.record,
        onChange = _ref.onChange;
    var params = record.params;
    var _ref2 = property,
        custom = _ref2.custom;
    var path = adminjs.flat.get(params, custom.filePathProperty);
    var key = adminjs.flat.get(params, custom.keyProperty);
    var file = adminjs.flat.get(params, custom.fileProperty);

    var _useState = React.useState(key),
        _useState2 = _slicedToArray(_useState, 2),
        originalKey = _useState2[0],
        setOriginalKey = _useState2[1];

    var _useState3 = React.useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        filesToUpload = _useState4[0],
        setFilesToUpload = _useState4[1];

    React.useEffect(function () {
      // it means means that someone hit save and new file has been uploaded
      // in this case fliesToUpload should be cleared.
      // This happens when user turns off redirect after new/edit
      if (typeof key === 'string' && key !== originalKey || typeof key !== 'string' && !originalKey || typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length) {
        setOriginalKey(key);
        setFilesToUpload([]);
      }
    }, [key, originalKey]);

    var onUpload = function onUpload(files) {
      setFilesToUpload(files);
      onChange(custom.fileProperty, files);
    };

    var handleRemove = function handleRemove() {
      onChange(custom.fileProperty, null);
    };

    var handleMultiRemove = function handleMultiRemove(singleKey) {
      var index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
      var filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];

      if (path && path.length > 0) {
        var newPath = path.map(function (currentPath, i) {
          return i !== index ? currentPath : null;
        });
        var newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [].concat(_toConsumableArray(filesToDelete), [index]));
        newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
        onChange(_objectSpread2(_objectSpread2({}, record), {}, {
          params: newParams
        }));
      } else {
        // eslint-disable-next-line no-console
        console.log('You cannot remove file when there are no uploaded files yet');
      }
    };

    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(designSystem.DropZone, {
      onChange: onUpload,
      multiple: custom.multiple,
      validate: {
        mimeTypes: custom.mimeTypes,
        maxSize: custom.maxSize
      },
      files: filesToUpload
    }), !custom.multiple && key && path && !filesToUpload.length && file !== null && /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
      filename: key,
      src: path,
      onRemove: handleRemove
    }), custom.multiple && key && key.length && path ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, key.map(function (singleKey, index) {
      // when we remove items we set only path index to nulls.
      // key is still there. This is because
      // we have to maintain all the indexes. So here we simply filter out elements which
      // were removed and display only what was left
      var currentPath = path[index];
      return currentPath ? /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
        key: singleKey,
        filename: singleKey,
        src: path[index],
        onRemove: function onRemove() {
          return handleMultiRemove(singleKey);
        }
      }) : '';
    })) : '');
  };

  var AudioMimeTypes = ['audio/aac', 'audio/midi', 'audio/x-midi', 'audio/mpeg', 'audio/ogg', 'application/ogg', 'audio/opus', 'audio/wav', 'audio/webm', 'audio/3gpp2'];
  var ImageMimeTypes = ['image/bmp', 'image/gif', 'image/jpeg', 'image/png', 'image/svg+xml', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp'];

  var SingleFile = function SingleFile(props) {
    var name = props.name,
        path = props.path,
        mimeType = props.mimeType,
        width = props.width;

    if (path && path.length) {
      if (mimeType && ImageMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          src: path,
          style: {
            maxHeight: width,
            maxWidth: width
          },
          alt: name
        });
      }

      if (mimeType && AudioMimeTypes.includes(mimeType)) {
        return /*#__PURE__*/React__default["default"].createElement("audio", {
          controls: true,
          src: path
        }, "Your browser does not support the", /*#__PURE__*/React__default["default"].createElement("code", null, "audio"), /*#__PURE__*/React__default["default"].createElement("track", {
          kind: "captions"
        }));
      }
    }

    return /*#__PURE__*/React__default["default"].createElement(designSystem.Box, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Button, {
      as: "a",
      href: path,
      ml: "default",
      size: "sm",
      rounded: true,
      target: "_blank"
    }, /*#__PURE__*/React__default["default"].createElement(designSystem.Icon, {
      icon: "DocumentDownload",
      color: "white",
      mr: "default"
    }), name));
  };

  var File = function File(_ref) {
    var width = _ref.width,
        record = _ref.record,
        property = _ref.property;
    var _ref2 = property,
        custom = _ref2.custom;
    var path = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.filePathProperty);

    if (!path) {
      return null;
    }

    var name = adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
    var mimeType = custom.mimeTypeProperty && adminjs.flat.get(record === null || record === void 0 ? void 0 : record.params, custom.mimeTypeProperty);

    if (!property.custom.multiple) {
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        path: path,
        name: name,
        width: width,
        mimeType: mimeType
      });
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, path.map(function (singlePath, index) {
      return /*#__PURE__*/React__default["default"].createElement(SingleFile, {
        key: singlePath,
        path: singlePath,
        name: name[index],
        width: width,
        mimeType: mimeType[index]
      });
    }));
  };

  var List = function List(props) {
    return /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: 100
    }, props));
  };

  var Show = function Show(props) {
    var property = props.property;
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), /*#__PURE__*/React__default["default"].createElement(File, _extends({
      width: "100%"
    }, props)));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component1 = Edit;
  AdminJS.UserComponents.Component2 = List;
  AdminJS.UserComponents.Component3 = Show;
  AdminJS.UserComponents.Component4 = Edit;
  AdminJS.UserComponents.Component5 = List;
  AdminJS.UserComponents.Component6 = Show;
  AdminJS.UserComponents.Component7 = Edit;
  AdminJS.UserComponents.Component8 = List;
  AdminJS.UserComponents.Component9 = Show;
  AdminJS.UserComponents.Component10 = Edit;
  AdminJS.UserComponents.Component11 = List;
  AdminJS.UserComponents.Component12 = Show;
  AdminJS.UserComponents.Component13 = Edit;
  AdminJS.UserComponents.Component14 = List;
  AdminJS.UserComponents.Component15 = Show;

})(React, AdminJS, AdminJSDesignSystem);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQudHN4IiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLnRzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9maWxlLnRzeCIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvc3JjL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvbGlzdC50c3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cudHN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQywgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgRWRpdFByb3BlcnR5UHJvcHMsIGZsYXQgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgRHJvcFpvbmUsIEZvcm1Hcm91cCwgTGFiZWwsIERyb3Bab25lSXRlbSB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXG5pbXBvcnQgUHJvcGVydHlDdXN0b20gZnJvbSAnLi4vdHlwZXMvcHJvcGVydHktY3VzdG9tLnR5cGUnXG5cbmNvbnN0IEVkaXQ6IEZDPEVkaXRQcm9wZXJ0eVByb3BzPiA9ICh7IHByb3BlcnR5LCByZWNvcmQsIG9uQ2hhbmdlIH0pID0+IHtcbiAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZFxuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGNvbnN0IHBhdGggPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5KVxuICBjb25zdCBrZXkgPSBmbGF0LmdldChwYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSlcbiAgY29uc3QgZmlsZSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQcm9wZXJ0eSlcblxuICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSlcbiAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGU8QXJyYXk8RmlsZT4+KFtdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gaXQgbWVhbnMgbWVhbnMgdGhhdCBzb21lb25lIGhpdCBzYXZlIGFuZCBuZXcgZmlsZSBoYXMgYmVlbiB1cGxvYWRlZFxuICAgIC8vIGluIHRoaXMgY2FzZSBmbGllc1RvVXBsb2FkIHNob3VsZCBiZSBjbGVhcmVkLlxuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgaWYgKFxuICAgICAgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnICYmIGtleSAhPT0gb3JpZ2luYWxLZXkpXG4gICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgIW9yaWdpbmFsS2V5KVxuICAgICAgfHwgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkoa2V5KSAmJiBrZXkubGVuZ3RoICE9PSBvcmlnaW5hbEtleS5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBzZXRPcmlnaW5hbEtleShrZXkpXG4gICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKVxuICAgIH1cbiAgfSwgW2tleSwgb3JpZ2luYWxLZXldKVxuXG4gIGNvbnN0IG9uVXBsb2FkID0gKGZpbGVzOiBBcnJheTxGaWxlPik6IHZvaWQgPT4ge1xuICAgIHNldEZpbGVzVG9VcGxvYWQoZmlsZXMpXG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgZmlsZXMpXG4gIH1cblxuICBjb25zdCBoYW5kbGVSZW1vdmUgPSAoKSA9PiB7XG4gICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbClcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZU11bHRpUmVtb3ZlID0gKHNpbmdsZUtleSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gKGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIGN1c3RvbS5rZXlQcm9wZXJ0eSkgfHwgW10pLmluZGV4T2Yoc2luZ2xlS2V5KVxuICAgIGNvbnN0IGZpbGVzVG9EZWxldGUgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5KSB8fCBbXVxuICAgIGlmIChcbiAgICAgIHBhdGggJiYgcGF0aC5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5tYXAoKGN1cnJlbnRQYXRoLCBpKSA9PiAoaSAhPT0gaW5kZXggPyBjdXJyZW50UGF0aCA6IG51bGwpKVxuICAgICAgbGV0IG5ld1BhcmFtcyA9IGZsYXQuc2V0KFxuICAgICAgICByZWNvcmQucGFyYW1zLFxuICAgICAgICBjdXN0b20uZmlsZXNUb0RlbGV0ZVByb3BlcnR5LFxuICAgICAgICBbLi4uZmlsZXNUb0RlbGV0ZSwgaW5kZXhdLFxuICAgICAgKVxuICAgICAgbmV3UGFyYW1zID0gZmxhdC5zZXQobmV3UGFyYW1zLCBjdXN0b20uZmlsZVBhdGhQcm9wZXJ0eSwgbmV3UGF0aClcblxuICAgICAgb25DaGFuZ2Uoe1xuICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgIHBhcmFtczogbmV3UGFyYW1zLFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUubG9nKCdZb3UgY2Fubm90IHJlbW92ZSBmaWxlIHdoZW4gdGhlcmUgYXJlIG5vIHVwbG9hZGVkIGZpbGVzIHlldCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAgPERyb3Bab25lXG4gICAgICAgIG9uQ2hhbmdlPXtvblVwbG9hZH1cbiAgICAgICAgbXVsdGlwbGU9e2N1c3RvbS5tdWx0aXBsZX1cbiAgICAgICAgdmFsaWRhdGU9e3tcbiAgICAgICAgICBtaW1lVHlwZXM6IGN1c3RvbS5taW1lVHlwZXMgYXMgQXJyYXk8c3RyaW5nPixcbiAgICAgICAgICBtYXhTaXplOiBjdXN0b20ubWF4U2l6ZSxcbiAgICAgICAgfX1cbiAgICAgICAgZmlsZXM9e2ZpbGVzVG9VcGxvYWR9XG4gICAgICAvPlxuICAgICAgeyFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFxuICAgICAgICA8RHJvcFpvbmVJdGVtIGZpbGVuYW1lPXtrZXl9IHNyYz17cGF0aH0gb25SZW1vdmU9e2hhbmRsZVJlbW92ZX0gLz5cbiAgICAgICl9XG4gICAgICB7Y3VzdG9tLm11bHRpcGxlICYmIGtleSAmJiBrZXkubGVuZ3RoICYmIHBhdGggPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAge2tleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF1cbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aCA/IChcbiAgICAgICAgICAgICAgPERyb3Bab25lSXRlbVxuICAgICAgICAgICAgICAgIGtleT17c2luZ2xlS2V5fVxuICAgICAgICAgICAgICAgIGZpbGVuYW1lPXtzaW5nbGVLZXl9XG4gICAgICAgICAgICAgICAgc3JjPXtwYXRoW2luZGV4XX1cbiAgICAgICAgICAgICAgICBvblJlbW92ZT17KCkgPT4gaGFuZGxlTXVsdGlSZW1vdmUoc2luZ2xlS2V5KX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAnJ1xuICAgICAgICAgIH0pfVxuICAgICAgICA8Lz5cbiAgICAgICkgOiAnJ31cbiAgICA8L0Zvcm1Hcm91cD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBFZGl0XG4iLCJleHBvcnQgY29uc3QgQXVkaW9NaW1lVHlwZXMgPSBbXG4gICdhdWRpby9hYWMnLFxuICAnYXVkaW8vbWlkaScsXG4gICdhdWRpby94LW1pZGknLFxuICAnYXVkaW8vbXBlZycsXG4gICdhdWRpby9vZ2cnLFxuICAnYXBwbGljYXRpb24vb2dnJyxcbiAgJ2F1ZGlvL29wdXMnLFxuICAnYXVkaW8vd2F2JyxcbiAgJ2F1ZGlvL3dlYm0nLFxuICAnYXVkaW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVmlkZW9NaW1lVHlwZXMgPSBbXG4gICd2aWRlby94LW1zdmlkZW8nLFxuICAndmlkZW8vbXBlZycsXG4gICd2aWRlby9vZ2cnLFxuICAndmlkZW8vbXAydCcsXG4gICd2aWRlby93ZWJtJyxcbiAgJ3ZpZGVvLzNncHAnLFxuICAndmlkZW8vM2dwcDInLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICdpbWFnZS9ibXAnLFxuICAnaW1hZ2UvZ2lmJyxcbiAgJ2ltYWdlL2pwZWcnLFxuICAnaW1hZ2UvcG5nJyxcbiAgJ2ltYWdlL3N2Zyt4bWwnLFxuICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgJ2ltYWdlL3RpZmYnLFxuICAnaW1hZ2Uvd2VicCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24veC1iemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtYnppcDInLFxuICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICdhcHBsaWNhdGlvbi9qYXZhLWFyY2hpdmUnLFxuICAnYXBwbGljYXRpb24veC10YXInLFxuICAnYXBwbGljYXRpb24vemlwJyxcbiAgJ2FwcGxpY2F0aW9uL3gtN3otY29tcHJlc3NlZCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBEb2N1bWVudE1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICdhcHBsaWNhdGlvbi94LWZyZWVhcmMnLFxuICAnYXBwbGljYXRpb24vdm5kLmFtYXpvbi5lYm9vaycsXG4gICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LndvcmRwcm9jZXNzaW5nbWwuZG9jdW1lbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5zcHJlYWRzaGVldCcsXG4gICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnRleHQnLFxuICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvbicsXG4gICdhcHBsaWNhdGlvbi92bmQucmFyJyxcbiAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICdhcHBsaWNhdGlvbi92bmQubXMtZXhjZWwnLFxuICAnYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnNwcmVhZHNoZWV0bWwuc2hlZXQnLFxuXSBhcyBjb25zdFxuXG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgJ3RleHQvY3NzJyxcbiAgJ3RleHQvY3N2JyxcbiAgJ3RleHQvaHRtbCcsXG4gICd0ZXh0L2NhbGVuZGFyJyxcbiAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgJ2FwcGxpY2F0aW9uL2xkK2pzb24nLFxuICAndGV4dC9qYXZhc2NyaXB0JyxcbiAgJ3RleHQvcGxhaW4nLFxuICAnYXBwbGljYXRpb24veGh0bWwreG1sJyxcbiAgJ2FwcGxpY2F0aW9uL3htbCcsXG4gICd0ZXh0L3htbCcsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBCaW5hcnlEb2NzTWltZVR5cGVzID0gW1xuICAnYXBwbGljYXRpb24vZXB1Yit6aXAnLFxuICAnYXBwbGljYXRpb24vcGRmJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IEZvbnRNaW1lVHlwZXMgPSBbXG4gICdmb250L290ZicsXG4gICdmb250L3R0ZicsXG4gICdmb250L3dvZmYnLFxuICAnZm9udC93b2ZmMicsXG5dIGFzIGNvbnN0XG5cbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICdhcHBsaWNhdGlvbi94LWNzaCcsXG4gICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICdhcHBsaWNhdGlvbi94LWh0dHBkLXBocCcsXG4gICdhcHBsaWNhdGlvbi94LXNoJyxcbiAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgJ3ZuZC52aXNpbycsXG4gICdhcHBsaWNhdGlvbi92bmQubW96aWxsYS54dWwreG1sJyxcbl0gYXMgY29uc3RcblxuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgLi4uQXVkaW9NaW1lVHlwZXMsXG4gIC4uLlZpZGVvTWltZVR5cGVzLFxuICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgLi4uQ29tcHJlc3NlZE1pbWVUeXBlcyxcbiAgLi4uRG9jdW1lbnRNaW1lVHlwZXMsXG4gIC4uLlRleHRNaW1lVHlwZXMsXG4gIC4uLkJpbmFyeURvY3NNaW1lVHlwZXMsXG4gIC4uLk90aGVyTWltZVR5cGVzLFxuICAuLi5Gb250TWltZVR5cGVzLFxuICAuLi5PdGhlck1pbWVUeXBlcyxcbl1cblxudHlwZSBQb3B1bGFyTWltZVR5cGVzID0gdHlwZW9mIE1pbWVUeXBlc1tudW1iZXJdXG5cbmV4cG9ydCB0eXBlIE1pbWVUeXBlID0gUG9wdWxhck1pbWVUeXBlcyB8IHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tICdyZWFjdCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEljb24sIEJ1dHRvbiwgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuaW1wb3J0IHsgU2hvd1Byb3BlcnR5UHJvcHMsIGZsYXQgfSBmcm9tICdhZG1pbmpzJ1xuaW1wb3J0IHsgSW1hZ2VNaW1lVHlwZXMsIEF1ZGlvTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlJ1xuaW1wb3J0IFByb3BlcnR5Q3VzdG9tIGZyb20gJy4uL3R5cGVzL3Byb3BlcnR5LWN1c3RvbS50eXBlJ1xuXG50eXBlIFByb3BzID0gU2hvd1Byb3BlcnR5UHJvcHMgJiB7XG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufTtcblxudHlwZSBTaW5nbGVGaWxlUHJvcHMgPSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgcGF0aD86IHN0cmluZyxcbiAgbWltZVR5cGU/OiBzdHJpbmcsXG4gIHdpZHRoPzogbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5jb25zdCBTaW5nbGVGaWxlOiBGQzxTaW5nbGVGaWxlUHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgbmFtZSwgcGF0aCwgbWltZVR5cGUsIHdpZHRoIH0gPSBwcm9wc1xuICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgIGlmIChtaW1lVHlwZSAmJiBJbWFnZU1pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gPGltZyBzcmM9e3BhdGh9IHN0eWxlPXt7IG1heEhlaWdodDogd2lkdGgsIG1heFdpZHRoOiB3aWR0aCB9fSBhbHQ9e25hbWV9IC8+XG4gICAgfVxuICAgIGlmIChtaW1lVHlwZSAmJiBBdWRpb01pbWVUeXBlcy5pbmNsdWRlcyhtaW1lVHlwZSBhcyBhbnkpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8YXVkaW9cbiAgICAgICAgICBjb250cm9sc1xuICAgICAgICAgIHNyYz17cGF0aH1cbiAgICAgICAgPlxuICAgICAgICAgIFlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVxuICAgICAgICAgIDxjb2RlPmF1ZGlvPC9jb2RlPlxuICAgICAgICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiAvPlxuICAgICAgICA8L2F1ZGlvPlxuICAgICAgKVxuICAgIH1cbiAgfVxuICByZXR1cm4gKFxuICAgIDxCb3g+XG4gICAgICA8QnV0dG9uIGFzPVwiYVwiIGhyZWY9e3BhdGh9IG1sPVwiZGVmYXVsdFwiIHNpemU9XCJzbVwiIHJvdW5kZWQgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgIDxJY29uIGljb249XCJEb2N1bWVudERvd25sb2FkXCIgY29sb3I9XCJ3aGl0ZVwiIG1yPVwiZGVmYXVsdFwiIC8+XG4gICAgICAgIHtuYW1lfVxuICAgICAgPC9CdXR0b24+XG4gICAgPC9Cb3g+XG4gIClcbn1cblxuY29uc3QgRmlsZTogRkM8UHJvcHM+ID0gKHsgd2lkdGgsIHJlY29yZCwgcHJvcGVydHkgfSkgPT4ge1xuICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHkgYXMgdW5rbm93biBhcyB7IGN1c3RvbTogUHJvcGVydHlDdXN0b20gfVxuXG4gIGNvbnN0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpXG5cbiAgaWYgKCFwYXRoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBmbGF0LmdldChcbiAgICByZWNvcmQ/LnBhcmFtcyxcbiAgICBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5LFxuICApXG4gIGNvbnN0IG1pbWVUeXBlID0gY3VzdG9tLm1pbWVUeXBlUHJvcGVydHkgJiYgZmxhdC5nZXQocmVjb3JkPy5wYXJhbXMsIGN1c3RvbS5taW1lVHlwZVByb3BlcnR5KVxuXG4gIGlmICghcHJvcGVydHkuY3VzdG9tLm11bHRpcGxlKSB7XG4gICAgcmV0dXJuIDxTaW5nbGVGaWxlIHBhdGg9e3BhdGh9IG5hbWU9e25hbWV9IHdpZHRoPXt3aWR0aH0gbWltZVR5cGU9e21pbWVUeXBlfSAvPlxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge3BhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFxuICAgICAgICA8U2luZ2xlRmlsZVxuICAgICAgICAgIGtleT17c2luZ2xlUGF0aH1cbiAgICAgICAgICBwYXRoPXtzaW5nbGVQYXRofVxuICAgICAgICAgIG5hbWU9e25hbWVbaW5kZXhdfVxuICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICBtaW1lVHlwZT17bWltZVR5cGVbaW5kZXhdfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRmlsZVxuIiwiaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5cbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcblxuY29uc3QgTGlzdDogRkM8U2hvd1Byb3BlcnR5UHJvcHM+ID0gKHByb3BzKSA9PiAoPEZpbGUgd2lkdGg9ezEwMH0gey4uLnByb3BzfSAvPilcblxuZXhwb3J0IGRlZmF1bHQgTGlzdFxuIiwiaW1wb3J0IFJlYWN0LCB7IEZDIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXG5pbXBvcnQgeyBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcblxuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuXG5jb25zdCBTaG93OiBGQzxTaG93UHJvcGVydHlQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBwcm9wZXJ0eSB9ID0gcHJvcHNcblxuICByZXR1cm4gKFxuICAgIDxGb3JtR3JvdXA+XG4gICAgICA8TGFiZWw+e3Byb3BlcnR5LmxhYmVsfTwvTGFiZWw+XG4gICAgICA8RmlsZSB3aWR0aD1cIjEwMCVcIiB7Li4ucHJvcHN9IC8+XG4gICAgPC9Gb3JtR3JvdXA+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hvd1xuIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQ29tcG9uZW50MSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDEgPSBDb21wb25lbnQxXG5pbXBvcnQgQ29tcG9uZW50MiBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2xpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDIgPSBDb21wb25lbnQyXG5pbXBvcnQgQ29tcG9uZW50MyBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDMgPSBDb21wb25lbnQzXG5pbXBvcnQgQ29tcG9uZW50NCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDQgPSBDb21wb25lbnQ0XG5pbXBvcnQgQ29tcG9uZW50NSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2xpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDUgPSBDb21wb25lbnQ1XG5pbXBvcnQgQ29tcG9uZW50NiBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDYgPSBDb21wb25lbnQ2XG5pbXBvcnQgQ29tcG9uZW50NyBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2VkaXQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDcgPSBDb21wb25lbnQ3XG5pbXBvcnQgQ29tcG9uZW50OCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2xpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDggPSBDb21wb25lbnQ4XG5pbXBvcnQgQ29tcG9uZW50OSBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL3NyYy9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL3Nob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDkgPSBDb21wb25lbnQ5XG5pbXBvcnQgQ29tcG9uZW50MTAgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxMCA9IENvbXBvbmVudDEwXG5pbXBvcnQgQ29tcG9uZW50MTEgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxMSA9IENvbXBvbmVudDExXG5pbXBvcnQgQ29tcG9uZW50MTIgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxMiA9IENvbXBvbmVudDEyXG5pbXBvcnQgQ29tcG9uZW50MTMgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9lZGl0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxMyA9IENvbXBvbmVudDEzXG5pbXBvcnQgQ29tcG9uZW50MTQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9saXN0J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxNCA9IENvbXBvbmVudDE0XG5pbXBvcnQgQ29tcG9uZW50MTUgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9zcmMvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxNSA9IENvbXBvbmVudDE1Il0sIm5hbWVzIjpbIkVkaXQiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiY3VzdG9tIiwicGF0aCIsImZsYXQiLCJnZXQiLCJmaWxlUGF0aFByb3BlcnR5Iiwia2V5Iiwia2V5UHJvcGVydHkiLCJmaWxlIiwiZmlsZVByb3BlcnR5IiwidXNlU3RhdGUiLCJvcmlnaW5hbEtleSIsInNldE9yaWdpbmFsS2V5IiwiZmlsZXNUb1VwbG9hZCIsInNldEZpbGVzVG9VcGxvYWQiLCJ1c2VFZmZlY3QiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJvblVwbG9hZCIsImZpbGVzIiwiaGFuZGxlUmVtb3ZlIiwiaGFuZGxlTXVsdGlSZW1vdmUiLCJzaW5nbGVLZXkiLCJpbmRleCIsImluZGV4T2YiLCJmaWxlc1RvRGVsZXRlIiwiZmlsZXNUb0RlbGV0ZVByb3BlcnR5IiwibmV3UGF0aCIsIm1hcCIsImN1cnJlbnRQYXRoIiwiaSIsIm5ld1BhcmFtcyIsInNldCIsImNvbnNvbGUiLCJsb2ciLCJSZWFjdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJEcm9wWm9uZSIsIm11bHRpcGxlIiwibWltZVR5cGVzIiwibWF4U2l6ZSIsIkRyb3Bab25lSXRlbSIsIkF1ZGlvTWltZVR5cGVzIiwiSW1hZ2VNaW1lVHlwZXMiLCJTaW5nbGVGaWxlIiwicHJvcHMiLCJuYW1lIiwibWltZVR5cGUiLCJ3aWR0aCIsImluY2x1ZGVzIiwibWF4SGVpZ2h0IiwibWF4V2lkdGgiLCJCb3giLCJCdXR0b24iLCJJY29uIiwiRmlsZSIsImZpbGVOYW1lUHJvcGVydHkiLCJtaW1lVHlwZVByb3BlcnR5Iiwic2luZ2xlUGF0aCIsIkxpc3QiLCJTaG93IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiQ29tcG9uZW50MSIsIkNvbXBvbmVudDIiLCJDb21wb25lbnQzIiwiQ29tcG9uZW50NCIsIkNvbXBvbmVudDUiLCJDb21wb25lbnQ2IiwiQ29tcG9uZW50NyIsIkNvbXBvbmVudDgiLCJDb21wb25lbnQ5IiwiQ29tcG9uZW50MTAiLCJDb21wb25lbnQxMSIsIkNvbXBvbmVudDEyIiwiQ29tcG9uZW50MTMiLCJDb21wb25lbnQxNCIsIkNvbXBvbmVudDE1Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQUtBLElBQU1BLElBQTJCLEdBQUcsU0FBOUJBLElBQThCLENBQW9DLElBQUEsRUFBQTtJQUFBLElBQWpDQyxRQUFpQyxRQUFqQ0EsUUFBaUM7UUFBdkJDLE1BQXVCLFFBQXZCQSxNQUF1QjtRQUFmQyxRQUFlLFFBQWZBLFFBQWUsQ0FBQTtFQUN0RSxFQUFBLElBQVFDLE1BQVIsR0FBbUJGLE1BQW5CLENBQVFFLE1BQVIsQ0FBQTtFQUNBLEVBQUEsSUFBQSxLQUFBLEdBQW1CSCxRQUFuQjtRQUFRSSxNQUFSLFNBQVFBLE1BQVIsQ0FBQTtJQUVBLElBQU1DLElBQUksR0FBR0MsWUFBSSxDQUFDQyxHQUFMLENBQVNKLE1BQVQsRUFBaUJDLE1BQU0sQ0FBQ0ksZ0JBQXhCLENBQWIsQ0FBQTtJQUNBLElBQU1DLEdBQUcsR0FBR0gsWUFBSSxDQUFDQyxHQUFMLENBQVNKLE1BQVQsRUFBaUJDLE1BQU0sQ0FBQ00sV0FBeEIsQ0FBWixDQUFBO0lBQ0EsSUFBTUMsSUFBSSxHQUFHTCxZQUFJLENBQUNDLEdBQUwsQ0FBU0osTUFB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

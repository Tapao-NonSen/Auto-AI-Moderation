/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/CategoryThresholdRow.tsx"
/*!*******************************************************!*\
  !*** ./src/admin/components/CategoryThresholdRow.tsx ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CategoryThresholdRow)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_2__);



var CategoryThresholdRow = /*#__PURE__*/function (_Component) {
  function CategoryThresholdRow() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryThresholdRow, _Component);
  var _proto = CategoryThresholdRow.prototype;
  _proto.view = function view() {
    var _this$attrs = this.attrs,
      category = _this$attrs.category,
      threshold = _this$attrs.threshold,
      action = _this$attrs.action;
    var currentThreshold = parseFloat(threshold() || '0.80');
    return m("div", {
      className: "CategoryThresholdRow",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '0.5rem'
      }
    }, m("span", {
      style: {
        width: '200px',
        fontWeight: 500
      }
    }, category), m("input", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.05",
      value: currentThreshold,
      oninput: function oninput(e) {
        return threshold(e.target.value);
      },
      style: {
        width: '200px'
      }
    }), m("span", {
      style: {
        width: '40px'
      }
    }, currentThreshold.toFixed(2)), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_2___default()), {
      value: action() || 'flag',
      onchange: action,
      options: {
        flag: 'Flag',
        hide: 'Hide',
        "delete": 'Delete',
        warn: 'Warn',
        none: 'None'
      }
    }));
  };
  return CategoryThresholdRow;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ },

/***/ "./src/admin/components/ModerationLogItem.tsx"
/*!****************************************************!*\
  !*** ./src/admin/components/ModerationLogItem.tsx ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModerationLogItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);






var ModerationLogItem = /*#__PURE__*/function (_Component) {
  function ModerationLogItem() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ModerationLogItem, _Component);
  var _proto = ModerationLogItem.prototype;
  _proto.view = function view() {
    var _log$attributes,
      _log$attributes2,
      _log$attributes3,
      _log$attributes4,
      _log$attributes5,
      _log$attributes6,
      _topCat$,
      _log$attributes$actio,
      _log$attributes7,
      _this = this;
    var _this$attrs = this.attrs,
      log = _this$attrs.log,
      onReview = _this$attrs.onReview;
    var scores = ((_log$attributes = log.attributes) == null ? void 0 : _log$attributes.category_scores) || {};
    var topCat = Object.entries(scores).sort(function (a, b) {
      return b[1] - a[1];
    })[0];
    var reviewed = ((_log$attributes2 = log.attributes) == null ? void 0 : _log$attributes2.reviewed_at) != null;
    var decision = (_log$attributes3 = log.attributes) == null ? void 0 : _log$attributes3.review_decision;
    return m("tr", {
      className: "ModerationLogItem " + (reviewed ? 'reviewed' : 'pending')
    }, m("td", null, (_log$attributes4 = log.attributes) == null ? void 0 : _log$attributes4.content_type), m("td", null, (_log$attributes5 = log.attributes) == null ? void 0 : _log$attributes5.content_id), m("td", null, (_log$attributes6 = log.attributes) == null ? void 0 : _log$attributes6.field), m("td", null, (_topCat$ = topCat == null ? void 0 : topCat[0]) != null ? _topCat$ : '—'), m("td", null, topCat ? (parseFloat(topCat[1]) * 100).toFixed(0) + '%' : '—'), m("td", null, (_log$attributes$actio = (_log$attributes7 = log.attributes) == null ? void 0 : _log$attributes7.action_taken) != null ? _log$attributes$actio : '—'), m("td", null, reviewed ? m("span", {
      className: "ReviewDecision ReviewDecision--" + decision
    }, decision === 'approved' ? flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.log.decision_approved') : flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.log.decision_rejected')) : m('[', null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Button--success",
      onclick: function onclick() {
        return _this.approve(log.id, onReview);
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.log.approve')), ' ', m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Button--danger",
      onclick: function onclick() {
        return _this.reject(log.id, onReview);
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.log.reject')))));
  };
  _proto.approve = /*#__PURE__*/function () {
    var _approve = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(id, onReview) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 1;
            return flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().request({
              method: 'POST',
              url: flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().forum.attribute('apiUrl') + ("/moderation-logs/" + id + "/approve")
            });
          case 1:
            _context.prev = 1;
            onReview();
            return _context.finish(1);
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0,, 1, 2]]);
    }));
    function approve(_x, _x2) {
      return _approve.apply(this, arguments);
    }
    return approve;
  }();
  _proto.reject = /*#__PURE__*/function () {
    var _reject = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee2(id, onReview) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 1;
            return flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().request({
              method: 'POST',
              url: flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().forum.attribute('apiUrl') + ("/moderation-logs/" + id + "/reject")
            });
          case 1:
            _context2.prev = 1;
            onReview();
            return _context2.finish(1);
          case 2:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0,, 1, 2]]);
    }));
    function reject(_x3, _x4) {
      return _reject.apply(this, arguments);
    }
    return reject;
  }();
  return ModerationLogItem;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ },

/***/ "./src/admin/components/ModerationLogTable.tsx"
/*!*****************************************************!*\
  !*** ./src/admin/components/ModerationLogTable.tsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModerationLogTable)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ModerationLogItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ModerationLogItem */ "./src/admin/components/ModerationLogItem.tsx");






var ModerationLogTable = /*#__PURE__*/function (_Component) {
  function ModerationLogTable() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.logs = [];
    _this.loading = true;
    _this.error = null;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ModerationLogTable, _Component);
  var _proto = ModerationLogTable.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.logs = [];
    this.loading = true;
    this.error = null;
    this.loadLogs();
  };
  _proto.loadLogs = /*#__PURE__*/function () {
    var _loadLogs = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var response, _e$response$body$erro, _e$response, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.loading = true;
            this.error = null;
            _context.prev = 1;
            _context.next = 2;
            return flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().request({
              method: 'GET',
              url: flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().forum.attribute('apiUrl') + '/moderation-logs?flagged=1'
            });
          case 2:
            response = _context.sent;
            this.logs = response.data || [];
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.error = (_e$response$body$erro = _t == null || (_e$response = _t.response) == null || (_e$response = _e$response.body) == null || (_e$response = _e$response.errors) == null || (_e$response = _e$response[0]) == null ? void 0 : _e$response.detail) != null ? _e$response$body$erro : 'Failed to load moderation log.';
            this.logs = [];
          case 4:
            _context.prev = 4;
            this.loading = false;
            m.redraw();
            return _context.finish(4);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3, 4, 5]]);
    }));
    function loadLogs() {
      return _loadLogs.apply(this, arguments);
    }
    return loadLogs;
  }();
  _proto.view = function view() {
    var _this2 = this;
    if (this.loading) return m("p", null, "Loading moderation log\u2026");
    if (this.error) {
      return m("div", {
        className: "Alert Alert--error"
      }, m("p", null, this.error), m("button", {
        className: "Button Button--text",
        onclick: function onclick() {
          return _this2.loadLogs();
        }
      }, "Retry"));
    }
    if (this.logs.length === 0) {
      return m("p", null, "No flagged items pending review.");
    }
    return m("div", {
      className: "ModerationLogTable"
    }, m("table", {
      className: "Table"
    }, m("thead", null, m("tr", null, m("th", null, "Type"), m("th", null, "ID"), m("th", null, "Field"), m("th", null, "Category"), m("th", null, "Score"), m("th", null, "AI Action"), m("th", null, "Review"))), m("tbody", null, this.logs.map(function (log) {
      return m(_ModerationLogItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
        key: log.id,
        log: log,
        onReview: function onReview() {
          return _this2.loadLogs();
        }
      });
    }))));
  };
  return ModerationLogTable;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ },

/***/ "./src/admin/components/ModerationSettingsPage.tsx"
/*!*********************************************************!*\
  !*** ./src/admin/components/ModerationSettingsPage.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModerationSettingsPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _CategoryThresholdRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CategoryThresholdRow */ "./src/admin/components/CategoryThresholdRow.tsx");
/* harmony import */ var _ModerationLogTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ModerationLogTable */ "./src/admin/components/ModerationLogTable.tsx");










var CATEGORIES = ['sexual', 'sexual/minors', 'violence', 'violence/graphic', 'hate', 'hate/threatening', 'harassment', 'harassment/threatening', 'self-harm', 'self-harm/intent', 'illicit', 'illicit/violent'];
var ModerationSettingsPage = /*#__PURE__*/function (_ExtensionPage) {
  function ModerationSettingsPage() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _ExtensionPage.call.apply(_ExtensionPage, [this].concat(args)) || this;
    _this.testStatus = null;
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ModerationSettingsPage, _ExtensionPage);
  var _proto = ModerationSettingsPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _ExtensionPage.prototype.oninit.call(this, vnode);
    this.testStatus = null;
  };
  _proto.content = function content() {
    var _this2 = this;
    return m("div", {
      className: "ModerationSettingsPage"
    }, m("h2", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.title')), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6___default()), {
      state: this.setting('moderationai.enabled')() === '1',
      onchange: function onchange(val) {
        return _this2.setting('moderationai.enabled')(val ? '1' : '0');
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.enabled_label'))), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.api_key_label')), m("input", {
      type: "password",
      className: "FormControl",
      placeholder: "sk-...",
      bidi: this.setting('moderationai.openai_api_key')
    })), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.model_label')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default()), {
      value: this.setting('moderationai.model')() || 'omni-moderation-latest',
      onchange: this.setting('moderationai.model'),
      options: {
        'omni-moderation-latest': 'omni-moderation-latest (text + image)',
        'text-moderation-latest': 'text-moderation-latest (text only, free)'
      }
    })), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.mode_label')), m((flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_7___default()), {
      value: this.setting('moderationai.mode')() || 'sync',
      onchange: this.setting('moderationai.mode'),
      options: {
        sync: flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.mode_sync'),
        async: flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.mode_async')
      }
    })), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6___default()), {
      state: this.setting('moderationai.scan_images')() !== '0',
      onchange: function onchange(val) {
        return _this2.setting('moderationai.scan_images')(val ? '1' : '0');
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.scan_images_label'))), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_6___default()), {
      state: this.setting('moderationai.scan_private_messages')() !== '0',
      onchange: function onchange(val) {
        return _this2.setting('moderationai.scan_private_messages')(val ? '1' : '0');
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.scan_private_messages_label'))), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.trust_skip_threshold_label')), m("input", {
      type: "number",
      className: "FormControl",
      min: "0",
      max: "100",
      bidi: this.setting('moderationai.trust_skip_threshold')
    }), m("p", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.trust_skip_threshold_help'))), m("div", {
      className: "Form-group"
    }, m("label", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.webhook_url_label')), m("input", {
      type: "url",
      className: "FormControl",
      placeholder: "https://your-server.com/webhook",
      bidi: this.setting('moderationai.webhook_url')
    }), m("p", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.webhook_url_help'))), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.thresholds_heading')), CATEGORIES.map(function (category) {
      return m(_CategoryThresholdRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
        key: category,
        category: category,
        threshold: _this2.setting("moderationai.threshold." + category),
        action: _this2.setting("moderationai.action." + category)
      });
    }), m("div", {
      className: "Form-group"
    }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_5___default()), {
      className: "Button Button--primary",
      onclick: function onclick() {
        return _this2.testConnection();
      }
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.test_connection')), this.testStatus && m("span", {
      style: {
        marginLeft: '1rem'
      }
    }, this.testStatus)), this.submitButton(), m("h3", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.log.title')), m(_ModerationLogTable__WEBPACK_IMPORTED_MODULE_9__["default"], null));
  };
  _proto.testConnection = /*#__PURE__*/function () {
    var _testConnection = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee() {
      var response, _t;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            this.testStatus = 'Testing…';
            m.redraw();
            _context.prev = 1;
            _context.next = 2;
            return fetch('/api/moderationai-test', {
              method: 'POST'
            });
          case 2:
            response = _context.sent;
            this.testStatus = response.ok ? flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.connection_ok') : flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.connection_fail');
            _context.next = 4;
            break;
          case 3:
            _context.prev = 3;
            _t = _context["catch"](1);
            this.testStatus = flarum_admin_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('tapao-moderationai.admin.settings.connection_fail');
          case 4:
            m.redraw();
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[1, 3]]);
    }));
    function testConnection() {
      return _testConnection.apply(this, arguments);
    }
    return testConnection;
  }();
  return ModerationSettingsPage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_4___default()));


/***/ },

/***/ "flarum/admin/app"
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ },

/***/ "flarum/admin/components/ExtensionPage"
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ },

/***/ "flarum/common/Component"
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ },

/***/ "flarum/common/components/Button"
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ },

/***/ "flarum/common/components/Select"
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['common/components/Select'];

/***/ },

/***/ "flarum/common/components/Switch"
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Switch']" ***!
  \*****************************************************************/
(module) {

"use strict";
module.exports = flarum.core.compat['common/components/Switch'];

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/OverloadYield.js"
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/OverloadYield.js ***!
  \**************************************************************/
(module) {

function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regenerator.js"
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regenerator.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsync.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js ***!
  \*************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorDefine.js ***!
  \******************************************************************/
(module) {

function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorKeys.js ***!
  \****************************************************************/
(module) {

function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsync = __webpack_require__(/*! ./regeneratorAsync.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js");
var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
var regeneratorKeys = __webpack_require__(/*! ./regeneratorKeys.js */ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js");
var regeneratorValues = __webpack_require__(/*! ./regeneratorValues.js */ "./node_modules/@babel/runtime/helpers/regeneratorValues.js");
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorValues.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorValues.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/typeof.js"
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
(module) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/regenerator/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_admin_components_ModerationSettingsPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin/components/ModerationSettingsPage */ "./src/admin/components/ModerationSettingsPage.tsx");


flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('tapao-moderationai', function () {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('tapao-moderationai').registerPage(_src_admin_components_ModerationSettingsPage__WEBPACK_IMPORTED_MODULE_1__["default"]);
});
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bulk = require('./bulk');

var _bulk2 = _interopRequireDefault(_bulk);

var _scroll = require('./scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(client) {
    _classCallCheck(this, User);

    this.client = client;
    this.scroll = new _scroll2.default(this.client, 'user');

    // Keep this API around but mark it deprecated
    this.delete = (0, _util.deprecate)(this.archive.bind(this), 'intercom-client - user.delete: Use user.archive instead');
  }

  _createClass(User, [{
    key: 'create',
    value: function create(data, f) {
      return this.client.post('/users', data, f);
    }
  }, {
    key: 'update',
    value: function update(data, f) {
      return this.create(data, f);
    }
  }, {
    key: 'list',
    value: function list(f) {
      return this.client.get('/users', {}, f);
    }
  }, {
    key: 'listBy',
    value: function listBy(params, f) {
      return this.client.get('/users', params, f);
    }
  }, {
    key: 'find',
    value: function find(params, f) {
      if (params.id) {
        return this.client.get('/users/' + params.id, {}, f);
      } else if (params.user_id) {
        return this.client.get('/users', { user_id: params.user_id }, f);
      } else if (params.email) {
        return this.client.get('/users', { email: params.email }, f);
      }
    }
  }, {
    key: 'archive',
    value: function archive(params, f) {
      if (params.id) {
        return this.client.delete('/users/' + params.id, {}, f);
      } else if (params.user_id) {
        return this.client.delete('/users', { user_id: params.user_id }, f);
      } else if (params.email) {
        return this.client.delete('/users', { email: params.email }, f);
      }
    }
  }, {
    key: 'bulk',
    value: function bulk(params, f) {
      return new _bulk2.default(this.client, 'user').bulk(params, f);
    }
  }, {
    key: 'requestPermanentDeletion',
    value: function requestPermanentDeletion(intercom_user_id, f) {
      return this.client.post('/user_delete_requests', { intercom_user_id: intercom_user_id }, f);
    }
  }]);

  return User;
}();

exports.default = User;
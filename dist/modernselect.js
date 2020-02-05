"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ModernSelect =
/*#__PURE__*/
function () {
  /**
   *Creates an instance of modernSelect.
   * @param {string | HTMLSelectElement} select
   * @param {string} formName
   * @memberof modernSelect
   */
  function ModernSelect(select, options) {
    var _this = this;

    _classCallCheck(this, ModernSelect);

    this.debug = true;
    this.value = "";
    this.event = {
      change: 'modern-select-change',
      open: 'modern-select-open',
      close: 'modern-select-close'
    };
    this.settings = {
      formName: "",
      icon: "",
      animation: "slideInDown",
      customClass: ""
    };
    this.select = typeof select == 'string' ? document.querySelector(select) : select;
    Object.assign(this.settings, options);

    this._createSelect(this.settings.formName);

    window.addEventListener('resize', function () {
      _this._setDropdownHeight(_this.optionContainer);
    });
    document.addEventListener('click', function (evt) {
      if (!evt.target.closest('.modern-select__wrapper') || evt.target.closest('.modern-select__wrapper') != _this.select) {
        if (!_this.optionContainer.classList.contains('modern-select--dropdown__close')) {
          _this.close();
        }
      }
    });
  }

  _createClass(ModernSelect, [{
    key: "value",
    value: function value(_value) {
      var response, option;
      response = false;
      this.optionContainer.querySelectorAll('[data-value]').forEach(function (el) {
        if (el.getAttribute('data-value') == _value.toString()) {
          response = true;
          option = el;
        }
      });
      this.value = _value;
      this.input.value = this.value;

      if (response) {
        this._setOutput(option);
      } else {
        if (this.debug) {
          console.warn("[MODERN-SELECT][VALUE ERROR]", "The value ".concat(_value, " doesn't exist inside your select. Please, please, make sur your value match with your data-value attribute"));
          console.warn("[MODERN-SELECT][HELP]", "Error on element : ", this.select);
        }
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.optionContainer.classList.add('modern-select--dropdown__close');

      if (this.settings.animation) {
        this.optionContainer.classList.remove(this.settings.animation);
        this.optionContainer.classList.remove('animated');
      }

      this._dispatch('close');
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      var evt = this.event[event];
      this.select.addEventListener(evt, function (evt) {
        cb(evt);
      });
    }
  }, {
    key: "_dispatch",
    value: function _dispatch(evt) {
      var event = new Event(this.event[evt]);
      this.select.dispatchEvent(event);
    }
  }, {
    key: "_updateValue",
    value: function _updateValue(evt) {
      var option = evt.target;

      if (!evt.target.hasAttribute('data-value')) {
        option = evt.target.closest('[data-value]');
      }

      if (this.value != option.getAttribute('data-value')) {
        this.value = option.getAttribute('data-value');
        this.input.value = this.value;

        this._setOutput(option);

        this._dispatch('change');
      }

      return this.value;
    }
  }, {
    key: "_createSelect",
    value: function _createSelect(selectName) {
      var parent = this.select.parentElement;
      var select = document.createElement('select');
      var options = this.select.querySelectorAll('[data-value]');
      var optionContainer = document.createElement('div');
      var output = document.createElement('div');
      optionContainer.classList.add('modern-select--dropdown');
      optionContainer.classList.add('modern-select--dropdown__close');
      output.classList.add('modern-select--output');
      this.settings.customClass ? output.classList.add(this.settings.customClass) : null;
      options.forEach(function (el) {
        var option = document.createElement('option');
        option.value = el.getAttribute('data-value');
        el.classList.add('modern-select--option');
        select.appendChild(option);
        optionContainer.appendChild(el);

        if (el.hasAttribute('data-placeholder')) {
          el.style.display = 'none';
        }
      });
      output.innerHTML = options[0].innerHTML;
      this.select.appendChild(output);
      this.select.appendChild(optionContainer);
      select.setAttribute('name', selectName);
      select.style.display = 'none';
      parent.appendChild(select);
      this.output = output;
      this.optionContainer = optionContainer;
      this.input = select;

      this._clickListener(output, optionContainer);

      this.select.classList.add('modern-select__wrapper');

      this._createIcon(output);

      this._setValue();
    }
  }, {
    key: "_createIcon",
    value: function _createIcon(output) {
      if (this.settings.icon) {
        var iconContainer = document.createElement('div');
        iconContainer.classList.add('modern-select--icon');
        iconContainer.innerHTML = this.settings.icon;
        output.appendChild(iconContainer);
      }
    }
  }, {
    key: "_clickListener",
    value: function _clickListener(output, optionContainer) {
      var _this2 = this;

      output.addEventListener('click', function (evt) {
        evt.preventDefault();

        _this2._setDropdownHeight(optionContainer);

        optionContainer.classList.toggle('modern-select--dropdown__close');

        if (_this2.settings.animation) {
          optionContainer.classList.toggle(_this2.settings.animation);
          optionContainer.classList.toggle('animated');
        }

        optionContainer.classList.contains('modern-select--dropdown__close') ? _this2._dispatch('close') : _this2._dispatch('open');
      });
    }
  }, {
    key: "_setDropdownHeight",
    value: function _setDropdownHeight(optionContainer) {
      var delta = optionContainer.getBoundingClientRect();
      var windowHeight = window.innerHeight;
      var finalHeight = windowHeight - delta.y;
      optionContainer.style.maxHeight = finalHeight + "px";
    }
  }, {
    key: "_setValue",
    value: function _setValue() {
      var _this3 = this;

      var options = this.optionContainer.querySelectorAll('[data-value]');
      options.forEach(function (option) {
        option.removeEventListener('click', _this3._updateValue);
        option.removeEventListener('click', _this3.close);
        option.addEventListener('click', _this3._updateValue.bind(_this3));
        option.addEventListener('click', _this3.close.bind(_this3));
      });
    }
  }, {
    key: "_setOutput",
    value: function _setOutput(option) {
      this.output.innerHTML = option.innerHTML;

      this._createIcon(this.output);
    }
  }]);

  return ModernSelect;
}();

exports["default"] = ModernSelect;
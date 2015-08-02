'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, props);
    }

    _createClass(Header, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.encdps !== '---';
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'header',
                null,
                'Duration: ',
                this.props.duration,
                React.createElement('br', null),
                'EncDPS: ',
                this.props.encdps
            );
        }
    }]);

    return Header;
})(React.Component);

var CombatantRow = (function (_React$Component2) {
    _inherits(CombatantRow, _React$Component2);

    function CombatantRow() {
        _classCallCheck(this, CombatantRow);

        _get(Object.getPrototypeOf(CombatantRow.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CombatantRow, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                { className: 'combatant-row ' + (this.props.isSelf ? ' self' : '') },
                React.createElement(
                    'span',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'span',
                    null,
                    this.props.dps
                )
            );
        }
    }]);

    return CombatantRow;
})(React.Component);

var Combatants = (function (_React$Component3) {
    _inherits(Combatants, _React$Component3);

    function Combatants() {
        _classCallCheck(this, Combatants);

        _get(Object.getPrototypeOf(Combatants.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Combatants, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var combatantsArray = [];
            var combatants = this.props.combatants;

            for (var combatant in combatants) {
                if (combatants.hasOwnProperty(combatant)) {
                    var isSelf = combatants[combatant].name === 'YOU';

                    combatantsArray.push(React.createElement(CombatantRow, {
                        key: combatant,
                        name: combatants[combatant].name,
                        dps: combatants[combatant].dps,
                        isSelf: isSelf
                    }));
                }
            }

            return React.createElement(
                'ul',
                null,
                combatantsArray
            );
        }
    }]);

    return Combatants;
})(React.Component);

var Overlay = (function (_React$Component4) {
    _inherits(Overlay, _React$Component4);

    function Overlay(props) {
        _classCallCheck(this, Overlay);

        _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, props);
        this.state = { isActive: props.isActive };
    }

    _createClass(Overlay, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.parseData.Encounter.encdps !== '---';
        }
    }, {
        key: 'render',
        value: function render() {
            var combatant = this.props.parseData.Combatant;
            var encounter = this.props.parseData.Encounter;

            return React.createElement(
                'div',
                null,
                React.createElement(Header, {
                    duration: encounter.duration,
                    encdps: encounter.encdps
                }),
                React.createElement(Combatants, {
                    combatants: combatant,
                    encounterDamage: encounter.damage
                })
            );
        }
    }]);

    return Overlay;
})(React.Component);

document.addEventListener('onOverlayDataUpdate', function (e) {
    React.render(React.createElement(Overlay, { parseData: e.detail }), document.getElementById('container'));
});
//# sourceMappingURL=all.js.map
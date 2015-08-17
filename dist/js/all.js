'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function classify(job) {
    if (typeof job === 'string') {
        return job.replace(/\s+/g, '-').toLowerCase();
    }
}

function formatName(name) {
    var pieces = name.split(' ');

    return name === 'YOU' ? name : pieces[0].substr(0, 1).toUpperCase() + '. ' + pieces[1].substr(0, 1).toUpperCase() + '.';
}

function formatMaxHit(hitText) {
    var pieces = hitText.split('-');

    return pieces[0] + ' ' + pieces[1];
}

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
                { className: 'header ' + (this.props.isActive ? 'active' : 'inactive') },
                React.createElement(
                    'div',
                    { className: 'header__left' },
                    React.createElement(
                        'span',
                        { className: 'encounter__time' },
                        'Time: ',
                        this.props.duration
                    ),
                    React.createElement(
                        'span',
                        { className: 'encounter__raid-dps' },
                        'Raid: ',
                        this.props.encdps
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'header__right' },
                    React.createElement(
                        'span',
                        { className: 'encounter__name' },
                        React.createElement('i', { className: 'encounter__status' })
                    )
                )
            );
        }
    }]);

    return Header;
})(React.Component);

var Combatant = (function (_React$Component2) {
    _inherits(Combatant, _React$Component2);

    function Combatant() {
        _classCallCheck(this, Combatant);

        _get(Object.getPrototypeOf(Combatant.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Combatant, [{
        key: 'render',
        value: function render() {
            var misses = parseInt(this.props.misses, 10) > 0 ? React.createElement(
                'span',
                { className: 'combatant__misses tag' },
                'M:',
                this.props.misses
            ) : '';
            var job;

            if (this.props.name === 'Limit Break') {
                job = 'limit-break';
            } else if (this.props.name.indexOf('(') >= 0) {
                job = 'choco';
            } else if (this.props.job === '') {
                job = 'unk';
            } else {
                job = this.props.job;
            }

            return React.createElement(
                'li',
                { className: 'combatant ' + classify(job) + ' ' + (this.props.isSelf ? 'self' : '') },
                React.createElement('i', { className: 'combatant__icon' }),
                React.createElement(
                    'span',
                    { className: 'combatant__name' },
                    formatName(this.props.name)
                ),
                React.createElement(
                    'span',
                    { className: 'combatant__damage' },
                    React.createElement(
                        'span',
                        { className: 'damage-maxhit tag' },
                        formatMaxHit(this.props.maxhit)
                    ),
                    misses,
                    React.createElement(
                        'span',
                        { className: 'damage-percent tag' },
                        this.props.damage
                    )
                ),
                React.createElement(
                    'span',
                    { className: 'combatant__dps' },
                    this.props.dps
                ),
                React.createElement('span', { className: 'combatant__bar', style: { width: this.props.damageOfTotal + '%' } })
            );
        }
    }]);

    return Combatant;
})(React.Component);

var CombatantList = (function (_React$Component3) {
    _inherits(CombatantList, _React$Component3);

    function CombatantList() {
        _classCallCheck(this, CombatantList);

        _get(Object.getPrototypeOf(CombatantList.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(CombatantList, [{
        key: 'render',
        value: function render() {
            var combatantsArray = [];
            var combatants = this.props.combatants;
            var dmgLeader = 0;

            for (var c in combatants) {
                if (combatants.hasOwnProperty(c)) {
                    dmgLeader = Math.max(combatants[c].damage, dmgLeader);
                }
            }

            for (var combatant in combatants) {
                if (combatants.hasOwnProperty(combatant)) {
                    var isSelf = combatants[combatant].name === 'YOU';

                    combatantsArray.push(React.createElement(Combatant, {
                        key: combatant,
                        name: combatants[combatant].name,
                        job: combatants[combatant].Job,
                        damage: combatants[combatant]['damage%'],
                        dps: combatants[combatant].dps,
                        maxhit: combatants[combatant].maxhit,
                        crit: combatants[combatant]['crithit%'],
                        misses: combatants[combatant].misses,
                        damageOfTotal: combatants[combatant].damage / dmgLeader * 100,
                        isSelf: isSelf
                    }));
                }
            }

            return React.createElement(
                'ul',
                { className: '' + (this.props.isActive ? 'active' : 'inactive') },
                combatantsArray
            );
        }
    }]);

    return CombatantList;
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
        key: 'componentWillMount',
        value: function componentWillMount() {
            var doc = document.documentElement;
            doc.classList.add('resizable');
        }
    }, {
        key: 'render',
        value: function render() {
            var combatant = this.props.parseData.Combatant;
            var encounter = this.props.parseData.Encounter;

            return React.createElement(
                'div',
                { className: 'overlay' },
                React.createElement(Header, {
                    duration: encounter.duration,
                    encdps: encounter.encdps,
                    isActive: this.props.parseData.isActive
                }),
                React.createElement(CombatantList, {
                    combatants: combatant,
                    encounterDamage: encounter.damage,
                    isActive: this.props.parseData.isActive
                })
            );
        }
    }]);

    return Overlay;
})(React.Component);

document.addEventListener('onOverlayDataUpdate', function (e) {

    //console.log(e.detail);

    React.render(React.createElement(Overlay, { parseData: e.detail }), document.getElementById('container'));
});
/*<span className="damage-crit tag">{this.props.crit}</span>*/
//# sourceMappingURL=all.js.map
'use strict';

var React = window.React;

var classify = function classify(job) {
    if (typeof job === 'string') {
        return job.replace(/\s+/g, '-').toLowerCase();
    }
};

var formatNumber = function formatNumber(num) {
    var number = parseFloat(num);

    return typeof number != 'number' ? '----' : Number(Math.round(parseFloat(number))).toLocaleString('en');
};

var formatName = function formatName(name) {
    var pieces = name.split(' ');

    return name === 'YOU' ? name : pieces[0].substr(0, 1).toUpperCase() + '. ' + pieces[1].substr(0, 1).toUpperCase() + '.';
};

var formatMaxHit = function formatMaxHit(hitText) {
    var pieces = hitText.split('-');

    return pieces[0] + ' ' + pieces[1];
};

var Header = React.createClass({
    displayName: 'Header',

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return nextProps.encdps !== '---';
    },

    render: function render() {
        return React.createElement(
            'header',
            { className: 'header ' + (this.props.isActive ? 'active' : 'inactive') },
            React.createElement(
                'div',
                { className: 'header__left' },
                React.createElement(
                    'span',
                    { className: 'encounter__time' },
                    React.createElement('i', { className: 'encounter__status' }),
                    ' ',
                    this.props.duration
                )
            ),
            React.createElement(
                'div',
                { className: 'header__right' },
                React.createElement('span', { className: 'encounter__name' }),
                React.createElement(
                    'span',
                    { className: 'encounter__raid-dps' },
                    React.createElement(
                        'em',
                        null,
                        formatNumber(this.props.encdps)
                    )
                )
            )
        );
    }
});

var Combatant = React.createClass({
    displayName: 'Combatant',

    render: function render() {
        var misses = parseInt(this.props.misses, 10) > 0 ? React.createElement(
            'span',
            { className: 'combatant__misses tag' },
            'M:',
            this.props.misses
        ) : '';
        var job = undefined;

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
            React.createElement('span', { className: 'combatant__bar', style: { width: this.props.damageOfTotal + '%' } }),
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
                    { className: 'damage tag' },
                    formatNumber(this.props.damage)
                ),
                React.createElement(
                    'span',
                    { className: 'damage-percent tag' },
                    this.props.damagePercent
                )
            ),
            React.createElement(
                'span',
                { className: 'combatant__dps' },
                formatNumber(this.props.dps)
            )
        );
    }
});

var LimitBreak = React.createClass({
    displayName: 'LimitBreak',

    render: function render() {
        return React.createElement(
            'div',
            { className: 'combatant limit-break' },
            React.createElement('i', { className: 'combatant__icon' }),
            React.createElement(
                'span',
                { className: 'combatant__name' },
                this.props.name
            ),
            React.createElement(
                'span',
                { className: 'combatant__damage' },
                React.createElement(
                    'span',
                    { className: 'damage tag' },
                    formatNumber(this.props.damage)
                ),
                React.createElement(
                    'span',
                    { className: 'damage-percent tag' },
                    this.props.damagePercent
                )
            ),
            React.createElement('span', { className: 'combatant__bar', style: { width: this.props.damageOfTotal + '%' } })
        );
    }
});

var CombatantList = React.createClass({
    displayName: 'CombatantList',

    render: function render() {
        var combatantsArray = [];
        var combatants = this.props.combatants;
        var dmgLeader = 0;
        var limitBreak = undefined;

        for (var c in combatants) {
            if (combatants.hasOwnProperty(c)) {
                dmgLeader = Math.max(combatants[c].damage, dmgLeader);
            }
        }

        for (var combatant in combatants) {
            if (combatants.hasOwnProperty(combatant)) {
                var isSelf = combatants[combatant].name === 'YOU';

                if (combatants[combatant].name !== 'Limit Break') {
                    combatantsArray.push(React.createElement(Combatant, {
                        key: combatant,
                        name: combatants[combatant].name,
                        job: combatants[combatant].Job,
                        damagePercent: combatants[combatant]['damage%'],
                        dps: combatants[combatant].dps,
                        maxhit: combatants[combatant].maxhit,
                        damage: combatants[combatant].damage,
                        misses: combatants[combatant].misses,
                        damageOfTotal: combatants[combatant].damage / dmgLeader * 100,
                        isSelf: isSelf
                    }));
                } else {
                    limitBreak = React.createElement(LimitBreak, {
                        key: combatant,
                        name: combatants[combatant].name,
                        job: combatants[combatant].Job,
                        damagePercent: combatants[combatant]['damage%'],
                        damage: combatants[combatant].damage,
                        damageOfTotal: combatants[combatant].damage / dmgLeader * 100
                    });
                }
            }
        }

        return React.createElement(
            'ul',
            { className: '' + (this.props.isActive ? 'active' : 'inactive') },
            combatantsArray,
            limitBreak
        );
    }
});

var Overlay = React.createClass({
    displayName: 'Overlay',

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return nextProps.parseData.Encounter.encdps !== '---';
    },

    componentWillMount: function componentWillMount() {
        document.documentElement.classList.add('resizable');
    },

    render: function render() {
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
});

document.addEventListener('onOverlayDataUpdate', function (e) {
    React.render(React.createElement(Overlay, { parseData: e.detail }), document.getElementById('container'));
});
//# sourceMappingURL=all.js.map
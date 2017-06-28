var React = window.React;

var classify = (job) => {
    if(typeof job === 'string') {
        return job.replace(/\s+/g, '-').toLowerCase();
    }
};

var formatNumber = (num) => {
    let number = parseFloat(num);

    return (typeof number != 'number') ? '----' : Number(Math.round(parseFloat(number))).toLocaleString('en');
};

var formatName = (name) => {
    let pieces = name.split(' ');

    return (name === 'YOU') ? name : pieces[0].substr(0, 1).toUpperCase() + '. ' + pieces[1].substr(0, 1).toUpperCase() + '.';
};

var formatMaxHit = (hitText) => {
    let pieces = hitText.split('-');

    return pieces[0] + ' ' + pieces[1];
};

var Header = React.createClass({
    shouldComponentUpdate: function(nextProps) {
        return nextProps.encdps !== '---';
    },

    render: function() {
        return (
            <header className={`header ${this.props.isActive ? 'active': 'inactive'}`}>
                <div className="header__left">
                    <span className="encounter__time"><i className="encounter__status"></i> {this.props.duration}</span>
                </div>

                <div className="header__right">
                    <span className="encounter__name">

                    </span>
                    <span className="encounter__raid-dps"><em>{formatNumber(this.props.encdps)}</em></span>
                </div>
            </header>
        );
    }
});

var Combatant = React.createClass({
    render: function() {
        let misses = (parseInt(this.props.misses, 10) > 0) ? <span className="combatant__misses tag">M:{this.props.misses}</span> : '';
        let job;

        if(this.props.name === 'Limit Break') {
            job = 'limit-break';
        }
        else if(this.props.name.indexOf('(') >= 0) {
            job = 'choco';
        }
        else if(this.props.job === '') {
            job = 'unk';
        }
        else {
            job = this.props.job;
        }

        return(
            <li className={`combatant ${classify(job)} ${this.props.isSelf ? 'self' : ''}`}>
                <span className="combatant__bar" style={{width: this.props.damageOfTotal + '%'}}></span>
                <i className="combatant__icon"></i>
                <span className="combatant__name">{formatName(this.props.name)}</span>

                <span className="combatant__damage">
                    <span className="damage-maxhit tag">{formatMaxHit(this.props.maxhit)}</span>
                    {misses}
                    <span className="damage tag">{formatNumber(this.props.damage)}</span>
                    <span className="damage-percent tag">{this.props.damagePercent}</span>
                </span>

                <span className="combatant__dps">{formatNumber(this.props.dps)}</span>
            </li>
        );
    }
});

var LimitBreak = React.createClass({
    render: function() {
        return (
            <div className="combatant limit-break">
                <i className="combatant__icon"></i>
                <span className="combatant__name">{this.props.name}</span>
                <span className="combatant__damage">
                    <span className="damage tag">{formatNumber(this.props.damage)}</span>
                    <span className="damage-percent tag">{this.props.damagePercent}</span>
                </span>
                <span className="combatant__bar" style={{width: this.props.damageOfTotal + '%'}}></span>
            </div>
        );
    }
});

var CombatantList = React.createClass({
    render: function() {
        let combatantsArray = [];
        let combatants = this.props.combatants;
        let dmgLeader = 0;
        let limitBreak;

        for(let c in combatants) {
            if (combatants.hasOwnProperty(c)) {
                dmgLeader = Math.max(combatants[c].damage, dmgLeader);
            }
        }

        for(var combatant in combatants) {
            if(combatants.hasOwnProperty(combatant)) {
                var isSelf = (combatants[combatant].name === 'YOU');

                if(combatants[combatant].name !== 'Limit Break') {
                    combatantsArray.push(
                        <Combatant
                            key={combatant}
                            name={combatants[combatant].name}
                            job={combatants[combatant].Job}
                            damagePercent={combatants[combatant]['damage%']}
                            dps={combatants[combatant].dps}
                            maxhit={combatants[combatant].maxhit}
                            damage={combatants[combatant].damage}
                            misses={combatants[combatant].misses}
                            damageOfTotal={(combatants[combatant].damage / dmgLeader) * 100}
                            isSelf={isSelf}
                            />
                    );
                }
                else {
                    limitBreak = <LimitBreak
                                    key={combatant}
                                    name={combatants[combatant].name}
                                    job={combatants[combatant].Job}
                                    damagePercent={combatants[combatant]['damage%']}
                                    damage={combatants[combatant].damage}
                                    damageOfTotal={(combatants[combatant].damage / dmgLeader) * 100}
                                    />
                }
            }
        }

        return (
            <ul className={`${this.props.isActive ? 'active': 'inactive'}`}>
                {combatantsArray}
                {limitBreak}
            </ul>
        );
    }
});
 
var Overlay = React.createClass({
    shouldComponentUpdate: (nextProps) => {
        return nextProps.parseData.Encounter.encdps !== '---';
    },

    componentWillMount: () => {
        document.documentElement.classList.add('resizable');
    },

    render: function() {
        var combatant = this.props.parseData.Combatant;
        var encounter = this.props.parseData.Encounter;

        return (
            <div className="overlay">
                <Header
                    duration={encounter.duration}
                    encdps={encounter.encdps}
                    isActive={this.props.parseData.isActive}
                    />
                <CombatantList
                    combatants={combatant}
                    encounterDamage={encounter.damage}
                    isActive={this.props.parseData.isActive}
                    />
            </div>
        );
    }
});

document.addEventListener('onOverlayDataUpdate', function(e) {
    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});

function classify(job) {
    if(typeof job === 'string') {
        return job.replace(/\s+/g, '-').toLowerCase();
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps){
        return nextProps.encdps !== '---';
    }

    render() {
        return (
            <header className={`header ${this.props.isActive ? 'active': 'inactive'}`}>
                <div className="header__left">
                    <span className="encounter__time">Time: {this.props.duration}</span>
                    <span className="encounter__raid-dps">Raid: {this.props.encdps}</span>
                </div>

                <div className="header__right">
                    <span className="encounter__name">
                        <i className="encounter__status"></i>
                    </span>

                </div>
            </header>
        );
    }
}

class Combatant extends React.Component {
    render() {
        var misses = (parseInt(this.props.misses, 10) > 0) ? <span className="combatant__misses">M:{this.props.misses}</span> : '';

        return(
            <li className={`combatant ${classify(this.props.job)} ${this.props.isSelf ? 'self' : ''}`}>
                <i className="combatant__icon"></i>
                <span className="combatant__name">{this.props.name}</span>
                <span className="combatant__dps">{this.props.dps}</span>
                <span className="combatant__damage">{this.props.damage}</span>
                {misses}
                <span className="combatant__bar" style={{width: this.props.damageOfTotal + '%'}}></span>
            </li>
        );
    }
}

class CombatantList extends React.Component {
    render() {
        var combatantsArray = [];
        var combatants = this.props.combatants;
        var dmgLeader = 0;

        for(var c in combatants) {
            if (combatants.hasOwnProperty(c)) {
                dmgLeader = Math.max(combatants[c].damage, dmgLeader);
            }
        }

        for(var combatant in combatants) {
            if(combatants.hasOwnProperty(combatant)) {
                var isSelf = (combatants[combatant].name === 'YOU');

                combatantsArray.push(
                    <Combatant
                        key={combatant}
                        name={combatants[combatant].name}
                        job={combatants[combatant].Job}
                        damage={combatants[combatant]['damage%']}
                        dps={combatants[combatant].dps}
                        misses={combatants[combatant].misses}
                        damageOfTotal={(combatants[combatant].damage / dmgLeader) * 100}
                        isSelf={isSelf}
                        />
                );
            }
        }

        return (
            <ul>
                {combatantsArray}
            </ul>
        );
    }
}

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.isActive};
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.parseData.Encounter.encdps !== '---';
    }

    render() {
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
                    />
            </div>
        );
    }
}

document.addEventListener('onOverlayDataUpdate', function(e) {

    console.log(e.detail);

    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});
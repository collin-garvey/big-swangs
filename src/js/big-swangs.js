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
            <header className="header">
                Duration: {this.props.duration}<br/>
                EncDPS: {this.props.encdps}
            </header>
        );
    }
}

class Combatant extends React.Component {
    render() {
        return(
            <li className={`combatant ${classify(this.props.job)} ${this.props.isSelf ? 'self' : ''}`}>
                <i className="combatant__icon"></i>
                <span className="combatant__name">{this.props.name}</span>
                <span className="combatant__dps">{this.props.dps}</span>
                <span className="combatant__damage">{this.props.damage}</span>
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

    //console.log(e.detail);

    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});
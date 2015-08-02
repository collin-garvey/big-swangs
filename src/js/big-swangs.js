class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps){
        return nextProps.encdps !== '---';
    }

    render() {
        return (
            <header>
                Duration: {this.props.duration}<br/>
                EncDPS: {this.props.encdps}
            </header>
        );
    }
}

class CombatantRow extends React.Component {
    render() {
        return(
            <li className={`combatant-row ${this.props.isSelf ? ' self' : ''}`}>
                <span>{this.props.name}</span>
                <span>{this.props.dps}</span>
            </li>
        );
    }
}

class Combatants extends React.Component {
    shouldComponentUpdate(nextProps) {
        return true;
    }

    render() {
        var combatantsArray = [];
        var combatants = this.props.combatants;

        for(var combatant in combatants) {
            if(combatants.hasOwnProperty(combatant)) {
                var isSelf = (combatants[combatant].name === 'YOU');

                combatantsArray.push(
                    <CombatantRow
                        key={combatant}
                        name={combatants[combatant].name}
                        dps={combatants[combatant].dps}
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
            <div>
                <Header
                    duration={encounter.duration}
                    encdps={encounter.encdps}
                    />
                <Combatants
                    combatants={combatant}
                    encounterDamage={encounter.damage}
                    />
            </div>
        );
    }
}

document.addEventListener('onOverlayDataUpdate', function(e) {
    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});
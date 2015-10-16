import Header from './src/components';
import CombatantList from './src/components';

export default Overlay = React.createClass({
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

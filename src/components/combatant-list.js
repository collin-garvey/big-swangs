import Combatant from './combatant';
import LimitBreak from './limit-break';

export default CombatantList = React.createClass({
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
                var thisCombatant = combatants[combatant];
                var isSelf = (thisCombatant.name === 'YOU');

                if(thisCombatant.name !== 'Limit Break') {
                    combatantsArray.push(
                        <Combatant
                            key={combatant}
                            name={thisCombatant.name}
                            job={thisCombatant.Job}
                            damagePercent={thisCombatant['damage%']}
                            dps={thisCombatant.dps}
                            maxhit={thisCombatant.maxhit}
                            damage={thisCombatant.damage}
                            misses={thisCombatant.misses}
                            damageOfTotal={(thisCombatant.damage / dmgLeader) * 100}
                            isSelf={isSelf}
                            />
                    );
                }
                else {
                    limitBreak = <LimitBreak
                                    key={combatant}
                                    name={thisCombatant.name}
                                    job={thisCombatant.Job}
                                    damagePercent={thisCombatant['damage%']}
                                    damage={thisCombatant.damage}
                                    damageOfTotal={(thisCombatant.damage / dmgLeader) * 100}
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

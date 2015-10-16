import formatNumber from '../lib';

export default LimitBreak = React.createClass({
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

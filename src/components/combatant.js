import classify from '../lib';
import formatNumber from '../lib';
import formatName from '../lib';
import formatMaxHit from '../lib';

export default Combatant = React.createClass({
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

export default Header = React.createClass({
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

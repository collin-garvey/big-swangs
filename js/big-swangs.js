var Overlay = React.createClass({
    render: function() {
        return (
            <Header
                duration={this.props.Encounter.duration}
                encdps={this.props}
            />
        );
    }
});

var Header = React.createClass({
    render: function() {
        return (
            <header>
                Duration: {this.props.duration}<br/>
                EncDPS: {this.props.encdps}
            </header>
        );
    }
});

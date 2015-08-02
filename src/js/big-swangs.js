class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.isActive};
    }

    render() {
        return (
            <Header duration={this.props.Encounter.duration}
                    encdps={this.props} />
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <header>
                Duration: {this.props.duration}<br/>
                EncDPS: {this.props.encdps}
            </header>
        )
    }
}

document.addEventListener('onOverlayDataUpdate', function(e) {

    console.log(e);

    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});

//var Overlay = React.createClass({
//    render: function() {
//        return (
//            <Header
//                duration={this.props.Encounter.duration}
//                encdps={this.props}
//            />
//        );
//    }
//});
//
//
//
//var Header = React.createClass({
//    render: function() {
//        return (
//            <header>
//                Duration: {this.props.duration}<br/>
//                EncDPS: {this.props.encdps}
//            </header>
//        );
//    }
//});

var React = window.React;

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
        )
    }
}

class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isActive: props.isActive};
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.parseData.Encounter.encdps !== '---';
    }

    render() {
        var encounter = this.props.parseData.Encounter;
        return (
            <Header
                duration={encounter.duration}
                encdps={encounter.encdps}
                />
        )
    }
}

document.addEventListener('onOverlayDataUpdate', function(e) {

    //console.log(e);

    React.render(
        <Overlay parseData={e.detail} />,

        document.getElementById('container')
    );
});
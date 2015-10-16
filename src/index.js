import Overlay from './components/overlay';

document.addEventListener('onOverlayDataUpdate', function(e) {
    React.render(
        <Overlay parseData={e.detail} />, 

        document.getElementById('container')
    );
});

export function classify(job) {
    if(typeof job === 'string') {
        return job.replace(/\s+/g, '-').toLowerCase();
    }
}

export function formatNumber(num) {
    let number = parseFloat(num);

    return (typeof number != 'number') ? '----' : Number(Math.round(parseFloat(number))).toLocaleString('en');
}

export function formatName(name) {
    let pieces = name.split(' ');

    return (name === 'YOU') ? name : pieces[0].substr(0, 1).toUpperCase() + '. ' + pieces[1].substr(0, 1).toUpperCase() + '.';
}

export function formatMaxHit(hitText) {
    let pieces = hitText.split('-');

    return pieces[0] + ' ' + pieces[1];
}

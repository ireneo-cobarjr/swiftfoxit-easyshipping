import Countries from 'countries-list';
import jump from 'jump.js';

let selectCountry = document.querySelector('.country-list');
let fromCountry = document.getElementById('from-country');
let toCountry = document.getElementById('to-country');
let fromCity = document.getElementById('from-city');
let toCity = document.getElementById('to-city');


setCountryList();

////shipment object
let shipment = {
    from: {
            country: "",
            city: "",
            state: "",
            zipcode: "",
            address: "",
            name: "",
            email: "",
            phone: ""
        },
    to: {
            country: "",
            city: "",
            state: "",
            zipcode: "",
            address: "",
            name: "",
            email: "",
            phone: ""
        },
    item: [],
    details: "",
    status: 0
};

let boxes = [];

function setCountryList() {
    var c = Countries.countries;
    for ( const C in c ) {
        let option = document.createElement('option');
        option.value = C;
        option.innerHTML = `${c[C].name}`;
        selectCountry.appendChild(option);
    }
}

const blinker = document.querySelector('.blinker');
const blinkTriggers = document.getElementsByClassName("blink-trigger");
const shipSlogan = document.getElementById('ship-slogan');

Array.prototype.forEach.call(blinkTriggers, t => {
    t.addEventListener( 'click', () => {
        let bt = t.getAttribute('blinker-target');
        let target = document.getElementById(bt);
        let source = document.getElementById(t.getAttribute('blinker-from'));
        
        switch(bt) {
            case 'blinker-item-2':
            shipSlogan.classList.remove('hide');
            toItem2();
            break;
            
            case 'blinker-item-3':
            shipSlogan.classList.add('hide');
            changeView();
            break;

            case 'blinker-item-4':
            summaryBoxes();
            summaryCountries();
            changeView();
            jump('#summary-2', {offset: -100});
            break;
            
            default:
            break;
        }

        function toItem2() {
            if (shipment.status == 2) {
                shipment.from.country = fromCountry.value;
                shipment.to.country = toCountry.value;
                shipment.from.city = fromCity.value;
                shipment.to.city = toCity.value;
                changeView();
            } else {
                if (toCity.value.length > 2 && fromCity.value.length > 2) {
                    shipment.from.country = fromCountry.value;
                    shipment.to.country = toCountry.value;
                    shipment.from.city = fromCity.value;
                    shipment.to.city = toCity.value;
                    changeView();
                }
            }
            console.log(shipment);
        }
        
        function changeView() {
            source.classList.add('hide');
            source.classList.remove('show');
            
            setTimeout(
            () => {
                source.classList.add('throw-off');
                target.classList.remove('throw-off');
                target.classList.add('show');
                target.classList.remove('hide');
            }
            ,500);
        }
    });
    
 });

document.getElementById('add-box').addEventListener('click', e => {
    e.preventDefault();
    addBox();
});
addBox();
function addBox() {
    let row = document.createElement('div');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let col3 = document.createElement('div');
    let col4 = document.createElement('div');
    let col5 = document.createElement('div');
    let fg1 = document.createElement('div');
    let fg2 = document.createElement('div');
    let fg3 = document.createElement('div');
    let fg4 = document.createElement('div');
    let fg5 = document.createElement('div');
    let weight = document.createElement('input');
    let length = document.createElement('input');
    let width  = document.createElement('input');
    let height = document.createElement('input');
    let s1  = document.createElement('select');
    let optT1 = document.createElement('option');
    let optT2 = document.createElement('option');
    let optT3 = document.createElement('option');
    
    optT1.selected = true;
    optT1.disabled = true;
    optT1.value = "";
    optT1.innerHTML = "Shipment type";
    optT2.value = "Box";
    optT2.innerHTML = "Box";
    optT3.value = "Document";
    optT3.innerHTML = "Document";
    
    s1.classList.add('form-control', 'form-control-sm', 'input-1', 'gray', 'd-inline-block');
    
    weight.setAttribute('type', 'text');
    weight.setAttribute('placeholder', 'weight');
    weight.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');

    length.setAttribute('type', 'text');
    length.setAttribute('placeholder', 'length');
    length.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
    
    width.setAttribute('type', 'text');
    width.setAttribute('placeholder', 'width');
    width.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');

    height.setAttribute('type', 'text');
    height.setAttribute('placeholder', 'height');
    height.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
    
    weight.addEventListener('input', e => {
        e.target.value = formatBox('weight', numbers(e.target.value));
    });
    length.addEventListener('input', e => {
        e.target.value = formatBox('dimension', numbers(e.target.value));
    });
    width.addEventListener('input', e => {
        e.target.value = formatBox('dimension', numbers(e.target.value));
    });
    height.addEventListener('input', e => {
        e.target.value = formatBox('dimension', numbers(e.target.value));
    });
    row.classList.add('row', 'mt-3');
    col1.classList.add('col-md-3');
    col2.classList.add('col-md-2');
    col3.classList.add('col-md-2');
    col4.classList.add('col-md-2');
    col5.classList.add('col-md-2');

    fg1.classList.add('form-group');
    fg2.classList.add('form-group');
    fg3.classList.add('form-group');
    fg4.classList.add('form-group');
    fg5.classList.add('form-group');
    
    appendChilds(s1, [optT1, optT2, optT3]);
    fg1.appendChild(s1);
    col1.appendChild(fg1);
    row.appendChild(col1);
    
    fg2.appendChild(weight);
    col2.appendChild(fg2);
    row.appendChild(col2);

    fg3.appendChild(length);
    col3.appendChild(fg3);
    row.appendChild(col3);
    
    fg4.appendChild(width);
    col4.appendChild(fg4);
    row.appendChild(col4);
    
    fg5.appendChild(height);
    col5.appendChild(fg5);
    row.appendChild(col5);
   
    document.getElementById('box-area').appendChild(row);
 
    var box = {
        s: s1,
        ww: weight,
        wd: width,
        ld: length,
        hd: height
    };
    
    boxes.push(box);
}

function summaryBoxes() {
    let summary1 = document.getElementById('summary-1');
    let x = summary1.children;
    if(x.length > 1) {
        do { summary1.removeChild(x[1]); }
        while (x.length > 1);
    }
    let total = 0;
    let usedUnit = "";
    boxes.forEach(box => {
        if (box.ww.value != "") {
            let flex  = document.createElement('div');
            let flex1 = document.createElement('div');
            let flex2 = document.createElement('div');
            let flex3 = document.createElement('div');
            let flex4 = document.createElement('div');
            let flex5 = document.createElement('div');
            
            flex.classList.add('d-flex', 'justify-content-around', 'mb-4');
            flex1.classList.add('summary1-item');
            flex2.classList.add('summary1-item');
            flex3.classList.add('summary1-item');
            flex4.classList.add('summary1-item');
            flex5.classList.add('summary1-item');
            
            flex1.innerHTML = box.s.value;
            flex2.innerHTML = box.ww.value;
            flex3.innerHTML = box.wd.value;
            flex4.innerHTML = box.ld.value;
            flex5.innerHTML = box.hd.value;
            
            total = total + Number(numbers(box.ww.value));
            usedUnit = letters(box.ww.value);
            
            appendChilds(flex, [flex1, flex2, flex3, flex4, flex5]);
            summary1.appendChild(flex);
        }
        document.getElementById('total-weight').innerHTML = `${total} ${usedUnit}`;
    });
}
function appendChilds(p, C) {
    C.forEach(c => {
        p.appendChild(c);
    });
}

/////front-end validation and saving data

fromCity.addEventListener('input', e => {
    let stat = shipment.status;
    let x = e.target.value;
    let s = letters(x);
    e.target.value = s;
    
    if (s.length > 2) {
        if (stat < 2) { shipment.status += 1; }
    } else {
        if (stat != 0) { shipment.status -= 1;}
    }
});

toCity.addEventListener('input', e => {
    let stat = shipment.status;
    let x = e.target.value;
    let s = letters(x);
    e.target.value = s;
    
    if (s.length > 2) {
        if (stat < 2) { shipment.status += 1; }
    } else {
        if (stat != 0) { shipment.status -= 1;}
    }
});

function numbers(s) {
    var x = s.replace(/[^0-9]/g, '');
    return x;
}

function letters(s) {
    var x = s.replace(/[^a-z\s]/i,'');
    return x;
}

function validEmail(s) {
    const validMail = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (validMail.test(s.trim())) {
        return true;
    } else {
        return false;
    }
}

document.getElementById('box-units').addEventListener('change', e => {
    formatBoxes(e.target.value);
});

function formatBox(type, v) {
    let unit = document.getElementById('box-units').value;
    if (type ==  'weight') {
        switch (unit) {
            case 'metric':
            return `${v} kg`;
            break;

            case 'english':
            return `${v} lb`;
            break;

            default:
            break;
        }
    } else if (type == 'dimension') {
        switch (unit) {
            case 'metric':
            return `${v} cm`;
            break;

            case 'english':
            return `${v} in`;
            break;

            default:
            break;
        }
    }

}

function formatBoxes(v) {
    let unit = {w: "kg", d: "cm"};
    if (v == 'english') {
        unit.w = "lb";
        unit.d = "in"; 
    }
    boxes.forEach(box => {
        box.ww.value = `${numbers(box.ww.value)} ${unit.w}`;
        box.wd.value = `${numbers(box.wd.value)} ${unit.d}`;
        box.ld.value = `${numbers(box.ld.value)} ${unit.d}`;
        box.hd.value = `${numbers(box.hd.value)} ${unit.d}`;
    });
}

function summaryCountries() {
    let cf = Countries.countries[shipment.from.country].name;
    let ct = Countries.countries[shipment.to.country].name;
    document.getElementById('summary-from-country').innerHTML = `From ${cf}`;
    document.getElementById('summary-to-country').innerHTML = `To ${ct}`;
    document.getElementById('summary-from-city').innerHTML = shipment.from.city;
    document.getElementById('summary-to-city').innerHTML = shipment.to.city;
}

document.getElementById('summary-2-next').addEventListener('click', e => {
    let z = document.getElementById('head1');
    let y = document.getElementById('summary-2');
    let x = e.target;
    if (x.dataset.state == 'next') {
        Array.prototype.forEach.call(document.getElementsByClassName('on-work'), w => w.disabled = true);
        x.innerHTML = 'edit';
        x.classList.add('btn-outline-dark', 'btn-rounded');
        x.classList.remove('btn-blue', 'white');
        y.classList.add('summary-done', 'yellow');
        y.classList.remove('summary-working');
        z.classList.add('on-hide');
        x.dataset.state = 'edit';
        document.getElementById('summary-3').classList.add('show');
        jump('#summary-3', {offset: -100});
    } else {
        Array.prototype.forEach.call(document.getElementsByClassName('on-work'), w => w.disabled = false);
        x.innerHTML = 'next';
        x.classList.remove('btn-outline-dark', 'btn-rounded');
        x.classList.add('btn-blue');
        y.classList.remove('summary-done', 'yellow');
        y.classList.add('summary-working', 'white');
        z.classList.remove('on-hide');
        x.dataset.state = 'next';
    }
});

document.getElementById('summary-3-next').addEventListener('click', e => {
    let z = document.getElementById('head2');
    let y = document.getElementById('summary-3');
    let x = e.target;
    if (x.dataset.state == 'next') {
        x.innerHTML = 'edit';
        x.classList.add('btn-outline-dark', 'btn-rounded');
        x.classList.remove('btn-blue', 'white');
        y.classList.add('summary-done', 'yellow');
        y.classList.remove('summary-working');
        z.classList.add('on-hide');
        x.dataset.state = 'edit';
        document.getElementById('summary-4').classList.add('show', 'summary-final');
        document.getElementById('summary-4').classList.remove('summary-working');
        document.getElementById('ship-content').classList.add('done');
        jump('#summary-4', {offset: -100});
    } else {
        x.innerHTML = 'next';
        x.classList.remove('btn-outline-dark', 'btn-rounded');
        x.classList.add('btn-blue');
        y.classList.remove('summary-done', 'yellow');
        y.classList.add('summary-working', 'white');
        z.classList.remove('on-hide');
        x.dataset.state = 'next';
        document.getElementById('ship-content').classList.remove('done');
        document.getElementById('summary-4').classList.remove('summary-final');
        document.getElementById('summary-4').classList.add('summary-working');
    }
});
console.log(jump);

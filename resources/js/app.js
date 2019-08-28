/**
 * First, we will load all of this project's Javascript utilities and other
 * dependencies. Then, we will be ready to develop a robust and powerful
 * application frontend using useful Laravel and JavaScript libraries.
 */

require('./bootstrap');
import Countries from 'countries-list';
import datepicker from 'js-datepicker';

const globalCounters = {
    phone: {
            to: 0,
            from: 0,
            toSet: [],
            fromSet: []
        } 
};

window.onload = function () {
    var old_date = '';
    const picker = datepicker('#date-picker', { 
        alwaysShow: true,
        minDate: new Date(),
        dateSelected: new Date(),
        showAllDates: true,
        onSelect: (picker, d) => {
            var date = new Date(d);
            if (d) {
                old_date = d;
                setDD(date);
            } else {
                picker.setDate(new Date(old_date), true);
            }
        }
    });
    
    setDD(new Date(document.getElementById('date-picker').value));
    function setDD(d) {
        var date = document.querySelector('.delivery-date');
        var day = document.querySelector('.delivery-day');
        var year = document.querySelector('.delivery-year');
        var month = document.querySelector('.delivery-month');
        
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        date.innerHTML = d.getDate();
        day.innerHTML = days[d.getDay()];
        year.innerHTML = d.getFullYear();
        month.innerHTML = months[d.getMonth()];
    }
    
    const Shipment = {
        from: {
                country: '',
                cc: '',
                flag: '',
                address: '',
                city: '',
                state: '',
                zip:'',
                name:'',
                company: '',
                email: '',
                phone: {
                    number: '',
                    code: '',
                    ext: '',
                    type: '',
                    others: []
                }
            },
        to: {
                country: '',
                address: '',
                city: '',
                state: '',
                zip:'',
                name:'',
                company: '',
                email: '',
                phone: {
                    number: '',
                    code: '',
                    ext: '',
                    type: '',
                    others: []
                }
        }
    };
	//country list
	let selectCountry = document.getElementsByClassName('country-list');
	Array.prototype.forEach.call(selectCountry, s => {
		var c = Countries.countries;
        for ( const C in c ) {
            let option = document.createElement('option');
            option.value = C;
            option.innerHTML = `${c[C].emoji}   ${c[C].name}`;
            s.appendChild(option);
        }
	});
    
    const crtShipBtn = document.getElementById('create-shipment-next');
    document.getElementById('back-step-2').addEventListener('click', e => {
        e.preventDefault();
        const step2 = document.getElementById('create-shipment-2');
        const step3 = document.getElementById('create-shipment-3');
        step3.classList.add('hide');
        step3.classList.remove('show');
        setTimeout(() => {
            step3.classList.add('throw-off');
            step2.classList.remove('throw-off');
            step2.classList.remove('hide');
            step2.classList.add('show');
            document.querySelector('.card-type').classList.add('card-mid-divided');
            const misc = document.querySelector('.misc');
            const final = document.querySelector('#final');
            misc.classList.remove('throw-off', 'hide');
            final.classList.add('throw-off', 'hide');
            misc.classList.add('show');
            final.classList.remove('show');


        }, 500);
        
        crtShipBtn.setAttribute('id-process', 'step2');
        crtShipBtn.innerHTML = "Next";
        document.getElementById('end-on-final').classList.remove('hide');
    });
    
    crtShipBtn.addEventListener('click', e => {
            e.preventDefault();
            
            var step = crtShipBtn.getAttribute('id-process');
            switch(step) {
                case 'step1':
                fromStep1();
                break;
                
                case 'step2':
                fromStep2();
                crtShipBtn.innerHTML = "Get Quote";
                break;
                
                case 'step3':
                getQuotes();
                break;
                
                default:
                break;
            }
            
            function getQuotes() {
                const misc = document.querySelector('.misc');
                const final = document.querySelector('#final');
                
                misc.classList.add('hide');
                misc.classList.remove('show');
                final.classList.remove('throw-off');

                setTimeout(() => {
                    misc.classList.add('throw-off');
                    final.classList.remove('hide');
                    final.classList.add('show');
                }, 500);

                crtShipBtn.setAttribute('id-process', 'final');
                document.getElementById('end-on-final').classList.add('hide');
            }
            
            function fromStep1() {
                const step1 = document.getElementById('create-shipment-1');
                const step2 = document.getElementById('create-shipment-2');
                const step2From = document.getElementById('step-2-from-label');
                const step2To = document.getElementById('step-2-to-label');
                let cCodeF = document.getElementById('from-country').value;
                let cCodeT = document.getElementById('to-country').value
                
                step2From.innerHTML = `From ${Countries.countries[cCodeF].emoji} ${Countries.countries[cCodeF].name}`;
                step2To.innerHTML = `To ${Countries.countries[cCodeT].emoji} ${Countries.countries[cCodeT].name}`;
                document.getElementById('from-phone-code').value = Countries.countries[cCodeF].phone;
                document.getElementById('to-phone-code').value = Countries.countries[cCodeT].phone;
                
                //save data --from
                Shipment.from.country = Countries.countries[cCodeF].name;
                Shipment.from.cc = cCodeF;
                Shipment.from.flag = Countries.countries[cCodeF].emoji;
                Shipment.from.phone.code = Countries.countries[cCodeF].phone;
                Shipment.from.address = document.getElementById('from-address').value;
                Shipment.from.state = document.getElementById('from-state').value;
                Shipment.from.city = document.getElementById('from-city').value;
                Shipment.from.zip = document.getElementById('from-zipcode').value;
                
                //save data --to
                Shipment.to.country = Countries.countries[cCodeT].name;
                Shipment.to.cc = cCodeF;
                Shipment.to.flag = Countries.countries[cCodeT].emoji;
                Shipment.to.phone.code = Countries.countries[cCodeT].phone;
                Shipment.to.address = document.getElementById('to-address').value;
                Shipment.to.state = document.getElementById('to-state').value;
                Shipment.to.city = document.getElementById('to-city').value;
                Shipment.to.zip = document.getElementById('to-zipcode').value;
                
                
                step1.classList.add('hide');
                step1.classList.remove('show');
                
                setTimeout(() => {
                    step1.classList.add('throw-off');
                    step2.classList.remove('throw-off');
                    step2.classList.remove('hide');
                    step2.classList.add('show');
                }, 500);
                
                crtShipBtn.setAttribute('id-process', 'step2');
            }

            function fromStep2() {
                const step2 = document.getElementById('create-shipment-2');
                const step3 = document.getElementById('create-shipment-3');
                const step2From = document.getElementById('step-2-from-label');
                const step2To = document.getElementById('step-2-to-label');
                const card = document.querySelector('.card-mid-divided');
                let cCodeF = document.getElementById('from-country').value;
                let cCodeT = document.getElementById('to-country').value
                
              
                
                step2.classList.add('hide');
                step2.classList.remove('show');
                card.classList.remove('card-mid-divided');


                //save data --from
                Shipment.from.phone.number = document.getElementById('from-phone-number').value;
                Shipment.from.phone.type = document.getElementById('from-phone-type').value;
                Shipment.from.phone.ext = document.getElementById('from-phone-ext').value;
                Shipment.from.zip = document.getElementById('from-zipcode').value;
                Shipment.from.name = document.getElementById('from-name').value;
                Shipment.from.company = document.getElementById('from-company').value;
                Shipment.from.email = document.getElementById('from-email').value;

                //save data --to
                Shipment.to.phone.number = document.getElementById('to-phone-number').value;
                Shipment.to.phone.type = document.getElementById('to-phone-type').value;
                Shipment.to.phone.ext = document.getElementById('to-phone-ext').value;
                Shipment.to.zip = document.getElementById('to-zipcode').value;
                Shipment.to.name = document.getElementById('to-name').value;
                Shipment.to.company = document.getElementById('to-company').value;
                Shipment.to.email = document.getElementById('to-email').value;
                
                //check if extra numbers have been added
                
                if (globalCounters.phone.from > 0) {
                    var a = globalCounters.phone.fromSet;
                    
                    if (a.length) {
                        a.forEach(set => {
                            if (set.number.value.length) {
                                var x = {};
                                x.number = set.number.value;
                                x.code = set.code.value;
                                x.ext = set.ext.value;
                                x.type = set.type.value;
                                
                                Shipment.from.phone.others.push(x);
                            }  
                        });
                    }
                }
                
                if (globalCounters.phone.to > 0) {
                    var a = globalCounters.phone.toSet;
                    
                    if (a.length) {
                        a.forEach(set => {
                            if (set.number.value.length) {
                                var x = {};
                                x.number = set.number.value;
                                x.code = set.code.value;
                                x.ext = set.ext.value;
                                x.type = set.type.value;
                                
                                Shipment.to.phone.others.push(x);
                            }  
                        });
                    }
                }
                
                document.getElementById('summary-from-country').innerHTML = `${Shipment.from.flag} ${Shipment.from.country}`;
                document.getElementById('summary-from-address').innerHTML = Shipment.from.address;
                document.getElementById('summary-from-csz').innerHTML = `${Shipment.from.city}, ${Shipment.from.state} ${Shipment.from.zip}`;
                document.getElementById('summary-to-country').innerHTML = `${Shipment.to.flag} ${Shipment.to.country}`;
                document.getElementById('summary-to-address').innerHTML = Shipment.to.address;
                document.getElementById('summary-to-csz').innerHTML = `${Shipment.to.city}, ${Shipment.to.state} ${Shipment.to.zip}`;

                setTimeout(() => {
                    step2.classList.add('throw-off');
                    step3.classList.remove('throw-off');
                    step3.classList.remove('hide');
                    step3.classList.add('show');
                }, 500);
                
                crtShipBtn.setAttribute('id-process', 'step3');
            }
    });
    
    const addPhoneFromBtn = document.getElementById('add-phone-from');
    const addPhoneToBtn = document.getElementById('add-phone-to');
    
    addPhoneFromBtn.addEventListener('click', e => {
        e.preventDefault();
        let cCode = document.getElementById('from-country').value;
        var aCode = Countries.countries[cCode].phone;
        addPhone('from', aCode, document.getElementById('from-phone-area'));
    });
    
    addPhoneToBtn.addEventListener('click', e => {
        e.preventDefault();
        let cCode = document.getElementById('to-country').value;
        var aCode = Countries.countries[cCode].phone;
        addPhone('to', aCode, document.getElementById('to-phone-area'));
    });
    


    function addPhone(x, A, P) {
        var counter = globalCounters.phone[x];
        globalCounters.phone[x] = counter + 1;
        var set = {
            type: '',
            code: '',
            number: '',
            ext: ''
        };
        const mCont = document.createElement('div');
        const type = document.createElement('div');
        const code = document.createElement('div');
        const phone = document.createElement('div');
        const ext = document.createElement('div');
        let fg1 = document.createElement('div');
        let l1 = document.createElement('label');
        let s1 = document.createElement('select');
        var o1 = document.createElement('option');
        var o2 = document.createElement('option');
        var o3 = document.createElement('option');
        let fg2 = document.createElement('div');
        let l2 = document.createElement('label');
        let i2 = document.createElement('input');
        let fg3 = document.createElement('div');
        let l3 = document.createElement('label');
        let i3 = document.createElement('input');
        let fg4 = document.createElement('div');
        let l4 = document.createElement('label');
        let i4 = document.createElement('input');
        mCont.classList.add('row'); 
        type.classList.add('col-md-3'); 
        code.classList.add('col-md-2'); 
        phone.classList.add('col-md-5'); 
        ext.classList.add('col-md-2'); 

        set.type = s1;
        set.code = i2;
        set.number = i3;
        set.ext = i4;
        //phone type
        fg1.classList.add('form-group');
        l1.classList.add('text-left', 'w-100');
        l1.setAttribute('for', `${x}-new-phone-type-${counter}`);
        l1.innerHTML = '<small>Phone Type</small>';
        s1.classList.add('form-control', 'form-control-sm');
        s1.setAttribute('name', `${x}-new-phone-type-${counter}`);
        s1.setAttribute('id', `${x}-new-phone-type-${counter}`);
        
        o1.setAttribute('value', 'office');
        o2.setAttribute('value', 'mobile');
        o3.setAttribute('value', 'other');
        o1.innerHTML = 'Office';
        o2.innerHTML = 'Mobile';
        o3.innerHTML = 'Others';
        s1.appendChild(o1);
        s1.appendChild(o2);
        s1.appendChild(o3);
        fg1.appendChild(l1);
        fg1.appendChild(s1);
        type.appendChild(fg1);
        mCont.appendChild(type);

        //phone code
        fg2.classList.add('form-group');
        l2.classList.add('text-left', 'w-100');
        l2.setAttribute('for', `${x}-new-phone-code-${counter}`);
        l2.innerHTML = '<small>Code</small>';
        i2.classList.add('form-control', 'form-control-sm');
        i2.setAttribute('name', `${x}-new-phone-code-${counter}`);
        i2.setAttribute('id', `${x}-new-phone-code-${counter}`);
        i2.setAttribute('type', `text`);
        i2.value = A;
        fg2.appendChild(l2);
        fg2.appendChild(i2);
        code.appendChild(fg2);
        mCont.appendChild(code);

        //phone
        fg3.classList.add('form-group');
        l3.classList.add('text-left', 'w-100');
        l3.setAttribute('for', `${x}-new-phone-code-${counter}`);
        l3.innerHTML = '<small>Phone</small>';
        i3.classList.add('form-control', 'form-control-sm');
        i3.setAttribute('name', `${x}-new-phone-code-${counter}`);
        i3.setAttribute('id', `${x}-new-phone-code-${counter}`);
        i3.setAttribute('type', `text`);
        fg3.appendChild(l3);
        fg3.appendChild(i3);
        phone.appendChild(fg3);
        mCont.appendChild(phone);

        //phone ext
        fg4.classList.add('form-group');
        l4.classList.add('text-left', 'w-100');
        l4.setAttribute('for', `${x}-new-phone-code-${counter}`);
        l4.innerHTML = '<small>Extension</small>';
        i4.classList.add('form-control', 'form-control-sm');
        i4.setAttribute('name', `${x}-new-phone-code-${counter}`);
        i4.setAttribute('id', `${x}-new-phone-code-${counter}`);
        i4.setAttribute('type', `text`);
        fg4.appendChild(l4);
        fg4.appendChild(i4);
        ext.appendChild(fg4);
        mCont.appendChild(ext);
        
        P.appendChild(mCont);
        
        set.type = s1;
        set.code = i2;
        set.number = i3;
        set.ext = i4;
        
        globalCounters.phone[`${x}Set`].push(set);
    }
    
    const psuedoBtn1 = document.getElementsByClassName('pseudo-btn-1');
    Array.prototype.forEach.call(psuedoBtn1, btn => {
        btn.addEventListener('click', () => {
            Array.prototype.forEach.call(psuedoBtn1, b => b.classList.remove('clicked'));
            btn.classList.add('clicked');

            Array.prototype.forEach.call( document.getElementsByClassName('misc-on-select'), a => {
                    if (a.classList.contains('hide')) {
                        a.classList.remove('hide');
                    }
            });
            var r = document.getElementById('on-doc-only');
            if (btn.getAttribute('id') == 'docs-btn') {
                r.classList.remove('hide', 'throw-off');
                r.classList.add('show');
            } else {
                r.classList.add('hide', 'throw-off');
                r.classList.remove('show');
            }
        });
        
    });
    
    document.getElementById('add-package').addEventListener('click', e => {
        e.preventDefault();
        createBox();
    });
    
    createBox();
    
    function createBox() {
        let box = document.createElement('div');
        let row = document.createElement('div');
        let colQ = document.createElement('div');
        let colW = document.createElement('div');
        let colD = document.createElement('div');
        let colB = document.createElement('div');
        let gray = document.createElement('div');
        
        box.classList.add('box');
        row.classList.add('row');
        colQ.classList.add('col-md-1');
        colW.classList.add('col-md-1');
        colD.classList.add('col-md-5');
        colB.classList.add('col-md-5');
        
        let qD = document.createElement('div');
        let qI = document.createElement('input');
        qD.classList.add('box-input');
        qI.classList.add('form-control', 'quantity');
        qI.setAttribute('type', 'text');
        
        qD.appendChild(qI);
        colQ.appendChild(qD);

        let wD = document.createElement('div');
        let wI = document.createElement('input');
        wD.classList.add('box-input');
        wI.classList.add('form-control', 'weight');
        wI.setAttribute('type', 'text');
        
        wD.appendChild(wI);
        colW.appendChild(wD);

        let dD = document.createElement('div');
        let dI1 = document.createElement('input');
        let dI2 = document.createElement('input');
        let dI3 = document.createElement('input');
        let dT1 = document.createElement('i');
        let dT2 = document.createElement('i');
        dD.classList.add('box-input');
        dI1.classList.add('form-control', 'dimension');
        dI1.setAttribute('type', 'text');
        dI2.classList.add('form-control', 'dimension');
        dI2.setAttribute('type', 'text');
        dI3.classList.add('form-control', 'dimension');
        dI3.setAttribute('type', 'text');
        dT1.classList.add('fas', 'fa-times');
        dT2.classList.add('fas', 'fa-times');
        
        dD.appendChild(dI1);
        dD.appendChild(dT1);
        dD.appendChild(dI2);
        dD.appendChild(dT2);
        dD.appendChild(dI3);
        
        colD.appendChild(dD);
        
        let bD = document.createElement('div');
        let bB = document.createElement('button');
        let bI = document.createElement('i');
        bD.classList.add('w-100', 'h-100', 'd-flex', 'justify-content-end', 'align-items-center');
        bI.classList.add('fas', 'fa-trash');
        bB.classList.add('btn', 'btn-dark', 'btn-sm', 'delete-package');
        
        bB.appendChild(bI);
        bB.innerHTML = `${bB.innerHTML} Delete`;
        bB.addEventListener('click', e => {
                e.preventDefault();
                document.getElementById('box-area').removeChild(box);
        });
        bD.appendChild(bB);

        colB.appendChild(bD);
        row.appendChild(colQ);
        row.appendChild(colW);
        row.appendChild(colD);
        row.appendChild(colB);
        
        gray.classList.add('gray-panel');
        gray.appendChild(row);
        box.appendChild(gray);
        document.getElementById('box-area').appendChild(box);
    }
}

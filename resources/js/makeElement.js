export default function makeElement(p) {
    let option = {el : "div", classes: "", attrs: "", value: "", event: ""};
    Object.assign(option, p);
    let e = document.createElement(option.el);
    
    //add class names
    //option.classes should be a string
    if (option.classes != "") {
        let classes = option.classes.split(" ");
        classes.forEach( c => {
            e.classList.add(c);
        });
    }
    
    //add attributes
    //option.attrs should be an array
    if (option.attrs != "") {
        let attributes = option.attrs;
        attributes.forEach( a => {
            let attr = a.split("=");
            e.setAttribute(attr[0], attr[1]);
        });
    }

    //add innerHTML
    //option.value should be a string
    if (option.value != "") {
        e.innerHTML = option.value;
    }

    //add event listeners
    //option.event should be an array
    if (option.event != "") {
        option.event.forEach( ev => {
            e.addEventListener(
                ev.type,
                ev.method
            );
        });
    }
    return e;
}

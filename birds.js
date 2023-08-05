async function getapi() {
    const response = await fetch('http://127.0.0.1:5500/nzbird.json');
    var data = await response.text();
    let jsonData = JSON.parse(data);
    loadAllBirds(jsonData);
}

function loadAllBirds(birdData){
	let e = document.querySelector('#photos');
	e.innerHTML = '';
    // let count = 0;
    for(x of birdData){
        if(input.value.length > 0){
            if(input.value.toLowerCase() == x.primary_name.substring(0, input.value.length).toLowerCase()){
                addBird(x.primary_name, x.english_name, x.scientific_name, x.order, x.family, x.other_names, x.status, x.photo.credit, x.photo.source, x.size.length.value, x.size.length.units, x.size.weight.value, x.size.weight.units)
            }
        }
        else{
            addBird(x.primary_name, x.english_name, x.scientific_name, x.order, x.family, x.other_names, x.status, x.photo.credit, x.photo.source, x.size.length.value, x.size.length.units, x.size.weight.value, x.size.weight.units)
        }
    }
}

const input = document.querySelector('#bsearch');

input.addEventListener('search', () => {
    console.log(`The term searched for was ${input.value}`);
    getapi();
});

function addBird(pri_name, eng_name, sci_name, order, family, other_names, status, photo_cred, photo, length_val, length_unit, weight_val, weight_unit) {
    const birdBox = document.createElement('div');
    birdBox.setAttribute('class', "bird");
    birdBox.append(newElement('p', 'bird-name', "Name: " + pri_name));
    birdBox.append(newElement('p', 'bird-name', "English Name: " + eng_name));
    birdBox.append(newElement('p', 'bird-name', "Scientific Name: " + sci_name));
    birdBox.append(newElement('p', 'bird-order', "Order: " + order));
    birdBox.append(newElement('p', 'bird-family', "Family: " + family));
    birdBox.append(newElement('p', 'bird-length', "Length: " + length_val + length_unit));
    birdBox.append(newElement('p', 'bird-weight', "Weight: " + weight_val + weight_unit));
    if(other_names.length > 1){
        let total = ""
        for(y of other_names){
            total = y + " / " + total;
        }
        total = total.substring(0, total.length-2);
        total = "Other Names: " + total;
        birdBox.append(newElement('p', 'bird-other-names', total));
    }
    else{
        birdBox.append(newElement('p', 'bird-other-names', "Other Names: " + other_names));
    }
    var img = document.createElement("img");
    img.src = photo;
    img.setAttribute('class', 'bird-photo');
    birdBox.append(img);
    pElement = newElement('p', 'bird-status', status);
    if(status == "Not Threatened"){
        pElement.style.background = "#02a028";
    }
    if(status == "Naturally Uncommon"){
        pElement.style.background = "#649a31";
    }
    if(status == "Relict"){
        pElement.style.background = "#99cb68";
    }
    if(status == "Recovering"){
        pElement.style.background = "#fecc33";
    }
    if(status == "Declining"){
        pElement.style.background = "#fe9a01";
    }
    if(status == "Nationally Increasing"){
        pElement.style.background = "#c26967";
    }
    if(status == "Nationally Vulnerable"){
        pElement.style.background = "#9b0000";
    }
    if(status == "Nationally Endangered"){
        pElement.style.background = "#660032";
    }
    if(status == "Nationally Critical"){
        pElement.style.background = "#320033";
    }
    if(status == "Extinct"){
        pElement.style.background = "black";
    }
    if(status == "Data Deficient"){
        pElement.style.background = "black";
    }
    birdBox.append(pElement);
    birdBox.append(newElement('p', 'bird-photo-cred', "Photo by " + photo_cred));

    
    document.querySelector('#photos').prepend(birdBox);
}

function newElement(type, className, content) {
    const e = document.createElement(type);
    e.setAttribute('class', className);
    e.textContent = content;
    return e;
}

getapi();
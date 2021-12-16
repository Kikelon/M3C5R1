class Professional 
{

    constructor(name, age, genre, weight, height, hairColor, eyeColor, race, isRetired, nationality, oscarsNumbers, profession)
    {
        this.name = name;
        this.age = age;
        this.genre = genre;
        this.weight = weight;
        this.height = height;
        this.hairColor = hairColor;
        this.eyeColor = eyeColor;
        this.race = race;
        this.isRetired = isRetired;
        this.nationality = nationality;
        this.oscarsNumbers = oscarsNumbers;
        this.profession = profession;
    }
}




function getUser(){

    console.log('En getUser()');

    let url ="http://localhost:3000/profesionales";

    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        method : "GET"

    };

    if (document.getElementById("id").value != ''){url += '?id=' + document.getElementById("id").value}

    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(function (res){
        if (res.resultado !== [] && res.resultado.length in window) {
            document.getElementById("table-professionals").className = "table table-sm d-none";
            document.getElementById("name").value = res.resultado.name;
            document.getElementById("age").value = res.resultado.age;
            document.getElementById("genre").value = res.resultado.genre;
            document.getElementById("weight").value = res.resultado.weight;
            document.getElementById("height").value = res.resultado.height;
            document.getElementById("hairColor").value = res.resultado.hairColor;
            document.getElementById("eyeColor").value = res.resultado.eyeColor;
            document.getElementById("race").value = res.resultado.race;
            document.getElementById("isRetired").checked = res.resultado.isRetired;
            document.getElementById("nationality").value = res.resultado.nationality;
            document.getElementById("oscarsNumbers").value = res.resultado.oscarsNumbers;
            document.getElementById("profession").value = res.resultado.profession;}
        else{
            document.getElementById("table-professionals").className = "table table-sm";
            document.getElementById("table-body").innerHTML = '';
            document.getElementById("name").value = '';
            document.getElementById("age").value = '';
            document.getElementById("genre").value = '';
            document.getElementById("weight").value = '';
            document.getElementById("height").value = '';
            document.getElementById("hairColor").value = '';
            document.getElementById("eyeColor").value = '';
            document.getElementById("race").value = '';
            document.getElementById("isRetired").checked = false;
            document.getElementById("nationality").value = '';
            document.getElementById("oscarsNumbers").value = '';
            document.getElementById("profession").value = '';
            for (let i = 0; i < res.resultado.length; i++){
                let marked = '';
                (res.resultado[i].isRetired) ? marked = 'checked' : false;
                const htmlString = '<tr>'+
                                    '<th scope=\"row\">'+(i+1)+'</th>'+
                                    '<td>'+res.resultado[i].name+'</td>'+
                                    '<td>'+res.resultado[i].age+'</td>'+
                                    '<td>'+res.resultado[i].genre+'</td>'+
                                    '<td>'+res.resultado[i].weight+'</td>'+
                                    '<td>'+res.resultado[i].height+'</td>'+
                                    '<td>'+res.resultado[i].hairColor+'</td>'+
                                    '<td>'+res.resultado[i].eyeColor+'</td>'+
                                    '<td>'+res.resultado[i].race+'</td>'+
                                    '<td><input type=\"checkbox\"'+marked+' disabled></td>'+
                                    '<td>'+res.resultado[i].nationality+'</td>'+
                                    '<td>'+res.resultado[i].oscarsNumbers+'</td>'+
                                    '<td>'+res.resultado[i].profession+'</td>'+
                                    '</tr>';
                document.getElementById("table-body").innerHTML += htmlString;
            }

        }
    })
    .catch (err => {console.log(err);});

};

function postUser(){
    let profesional = new Professional(
        document.getElementById("name").value,
        document.getElementById("age").value,
        document.getElementById("genre").value,
        document.getElementById("weight").value,
        document.getElementById("height").value,
        document.getElementById("hairColor").value,
        document.getElementById("eyeColor").value,
        document.getElementById("race").value,
        document.getElementById("isRetired").checked,
        document.getElementById("nationality").value,
        document.getElementById("oscarsNumbers").value,
        document.getElementById("profession").value
    );

    let url ="http://localhost:3000/profesionales";

    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify(profesional),
        method : "POST"
    };

    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });
};

function putUser(){
    console.log('En putUser()');
    let profesional = {
        "id" : document.getElementById("id").value,
        "name" : document.getElementById("name").value,
        "age" : document.getElementById("age").value,
        "genre" : document.getElementById("genre").value,
        "weight" : document.getElementById("weight").value,
        "height" : document.getElementById("height").value,
        "hairColor" : document.getElementById("hairColor").value,
        "eyeColor" : document.getElementById("eyeColor").value,
        "race" : document.getElementById("race").value,
        "isRetired" : document.getElementById("isRetired").checked,
        "nationality" : document.getElementById("nationality").value,
        "oscarsNumbers" : document.getElementById("oscarsNumbers").value,
        "profession" : document.getElementById("profession").value
    };

    let url ="http://localhost:3000/profesionales";
    console.log(profesional);

    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify(profesional),
        method : "PUT"
    };

    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });

};

function delUser(){
    console.log('En delUser()');
    let url ="http://localhost:3000/profesionales";

    const param = {
        headers : {"Content-Type": "application/json; charset =UTF-8"},
        body: JSON.stringify({"id" : document.getElementById("id").value}),
        method : "DELETE"
    };

    fetch(url, param)
    .then(function (data) {
        return data.json();
    })
    .then(res => {
        console.log(res);
    })
    .catch (err => {console.log(err);
    });
};

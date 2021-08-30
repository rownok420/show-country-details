const errorMessage = document.getElementById('error');
const errorMessage2 = document.getElementById('error2')
const spinner = document.getElementById('spinner')

// show all countries

const loadCountries = () => {
    fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then(data => displayCountries(data))
}
loadCountries()

const displayCountries = countries => {
    // console.log(countries)
    spinner.style.display = 'none'
    const section = document.getElementById('countries')
    countries.forEach(country => {
        // console.log(country.name)
        const div = document.createElement('div');
        div.classList.add('col')
        div.classList.add('text-center')
        div.innerHTML = `
            <div class="card h-100 p-3 rounded">
                <img  src="${country.flag}" class="card-img-top img-fluid" >
                <div class="card-body">
                    <h1 class="card-title">${country.name}</h1>
                    <h4 class="card-text">Capital : ${country.capital}</h4>
                </div>
                <div class="card-footer">
                <button data-bs-toggle="modal" data-bs-target="#countryDetails" type="button" onclick="loadCountryByName('${country.name}')"  class="btn btn-outline-info fw-bold">Learn More</button>
        `
        section.appendChild(div)
    });
}

const loadCountryByName = name => {
    fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(res => res.json())
        .then(data => displayCountriesDetails(data[0]))
}

const displayCountriesDetails = country => {
    document.getElementById('country-title').innerText = `Native Name : ${country.nativeName}`;
    document.getElementById('languages').innerText = `Languages : ${country.languages[0].name}`;
    document.getElementById('currencies').innerText = `Currencies : ${country.currencies[0].name}`;
    document.getElementById('region').innerText = `Region : ${country.region}`;
    document.getElementById('population').innerText = `Population : ${country.nativeName}`;   
}


// searce country
const secrceCountry = () => {
    const searceField = document.getElementById('searce-field');
    const searceText = searceField.value;
    searceField.value = '';
    if(searceText == ''){
        errorMessage.style.display = 'block'
    }
    else{
        spinner.style.display = 'block'
        errorMessage.style.display = 'none'
        errorMessage2.style.display = 'none'
        const url = `https://restcountries.eu/rest/v2/name/${searceText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearceResult(data))
            .catch(err => handleError(err))
    }
}


const handleError = err => {
    errorMessage2.style.display = 'block'
    errorMessage2.style.visibility = 'visible'

    spinner.style.display = 'none'

}


const displaySearceResult = countries => {
    const section = document.getElementById('single-countries');
    section.innerText = '';
    spinner.style.display = 'none'
    countries.forEach(country =>{
        // console.log(country.name)
        const div = document.createElement('div');
        div.classList.add('col')
        div.classList.add('text-center')
        div.innerHTML = `
            <div class="card h-100 p-3 rounded">
                <img src="${country.flag}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h1 class="card-title">${country.name}</h1>
                    <h4 class="card-text">Capital : ${country.capital}</h4>
                </div>
                <div class="card-footer">
                <button data-bs-toggle="modal" data-bs-target="#countryDetails" onclick="loadCountryByName('${country.name}')" class="btn btn-outline-info fw-bold">Learn More</button>
        `
        section.appendChild(div)
    })
}
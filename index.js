const addressBtn = document.getElementById('search-address-button')
const addressBoroInput = document.getElementById('search-address-borough-input')
const addressHouseInput = document.getElementById('search-address-house-input')
const addressStreetInput = document.getElementById('search-address-street-input')
const addressZipInput = document.getElementById('search-address-zip-input')
const addressAptInput = document.getElementById('search-address-apartament-input')

const violidBtn = document.getElementById('search-violationid-button')
const violidInput = document.getElementById('search-violationid-input')
const results = document.getElementById('results')
const zipBtn = document.getElementById('search-zipcode-button')
const zipInput = document.getElementById('zipInput')
// const myCases = document.getElementById('my-case')


// const addCaseToMonitor = (element) =>{
//     const btnAdd = document.getElementById('add')
//     btnAdd.addEventListener('click',()=> {
//         console.log('works create element')
//         let monitorViolation = document.createElement('p')
//         monitorViolation.textContent = `Violation number: ${element['violationid']}`
//         myCases.append(monitorViolation)
//     })
// }

const createRecord = (element)=>{
    let p = document.createElement('p')
    let apartment
    if(element['apartment']){
        apartament = element['apartment']
    } else {
        apartament = "N/A"
    }
    p.innerHTML = `<table>
                        <tbody>
                            <tr><td>Violation ID: </td><td>${element['violationid']}</td></tr>
                            <tr><td>Boro: </td><td>${element["boro"]}</td></tr>
                            <tr><td>House number: </td><td>${element['housenumber']}</td></tr>
                            <tr><td>Street name: </td><td>${element['streetname']}</td></tr>
                            <tr><td>Apartament: </td><td>${apartament}</td></tr>
                            <tr><td>Zip: </td><td>${element['zip']}</td></tr>
                            <tr><td>Violation Class: </td><td>${element['class']}</td></tr>
                            <tr><td>Description: </td><td>${element["novdescription"]}</td></tr>
                            </tbody>
                        </table>`
        let btnAdd = document.createElement('button')
        btnAdd.textContent = 'add to the case list'
        btnAdd.setAttribute('id', "add")
        p.append(btnAdd)
        results.append(p)
        btnAdd.addEventListener('click',()=> {
            console.log('works create element')
            let monitorViolation = document.createElement('li')
            monitorViolation.textContent = `${element['violationid']}`
            document.getElementById("case-list").append(monitorViolation)
        })
  
    
}


const serchViolid = (res) =>{
    violidBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        results.innerHTML =''
        res.forEach(element => {
            for (let key in element){
                if(element[key] === violidInput.value ){
                    createRecord(element)
                    violidInput.value = ''
                }    
            }
        }) 
    })
}

const searchByAddress = (res) =>{
    addressBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        results.innerHTML =''
        res.forEach(element =>{
            if (addressAptInput.value){
                if (element["boro"] === addressBoroInput.value && element["housenumber"] === addressHouseInput.value && element["streetname"] === addressStreetInput.value && element["zip"] === addressZipInput.value && element["apartment"] === addressAptInput.value ){
                createRecord(element)
            } else {
                if (element["boro"] === addressBoroInput.value && element["housenumber"] === addressHouseInput.value && element["streetname"] === addressStreetInput.value && element["zip"] === addressZipInput.value){
                createRecord(element)
                }
            }
            } 
        })
        addressBoroInput.value = ''
        addressHouseInput.value = ''
        addressStreetInput.value = ''
        addressZipInput.value = '' 
        addressAptInput.value = ''

    })
}

const searchByZip = (res) =>{
    zipBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        results.innerHTML =''
        res.forEach(element =>{
            if (element['zip'] === zipInput.value ){
                createRecord(element)
            }
        })
        zipInput.value =''

    })

}


const fetchReqData =async()=>{
    let req = await fetch('https://data.cityofnewyork.us/resource/wvxf-dwi5.json')
    let res = await req.json()
    serchViolid(res)
    searchByZip(res)
    searchByAddress(res)
}
fetchReqData()

const openSearch = (evt, searchBy) => {
    results.innerHTML =''
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    let tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(searchBy).style.display = "block";
    evt.currentTarget.className += " active";
}














const loadPhones = async (searchFieldValue, datalimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
}

const displayPhones = (phones, datalimit) => {
    const phoneCOntainer = document.getElementById('phone-container');
    phoneCOntainer.textContent = '';

    if (datalimit && phones.length > 8) {
        phones = phones.slice(0, 8);
        showMore(true);
    }
    else {
        showMore(false);
    }

    const noPhoneFound = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }

    phones.forEach(phone => {

        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');

        phoneDiv.innerHTML = `
            <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <button id="btn-details" onclick="showDetails('${phone.slug}')" class="fw-semibold fs-5 btn btn-primary px-4 mt-3 rounded-3" data-bs-toggle="modal" data-bs-target="#phoneModal"> More Details</button>
            </div>
            </div>
        `;
        phoneCOntainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const searchProcess = (datalimit) => {
    const searchFieldValue = document.getElementById('search-field').value;
    toggleSpinner(true);
    loadPhones(searchFieldValue, datalimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    searchProcess(8);
})
// Search by Enter Key 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchProcess(8);
    }
})
// Toggle Spinner Section 
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}
// Show More Button Section
const showMore = isShowing => {
    const showMoreSection = document.getElementById('show-more');
    if (isShowing) {
        showMoreSection.classList.remove('d-none');
    }
    else {
        showMoreSection.classList.add('d-none');
    }
}
document.getElementById('btn-show-more').addEventListener('click', function () {
    searchProcess();
})

const showDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPhoneModal(data.data)
}

const displayPhoneModal = phone => {
    console.log(phone)
    const modalDetails = document.getElementById('modal-details');

    modalDetails.innerHTML = `
        <div class="modal-header">
            <h4 class="modal-title" id="phoneModalLabel"><span class="text-success">Brand: </span>${phone.brand}</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h5 class="text-primary">Name: ${phone.name}</h5>
            <p>Chip Set: ${phone.mainFeatures.chipSet}</p>
            <p>Display Size: ${phone.mainFeatures.displaySize}</p>
            <p>Memory: ${phone.mainFeatures.memory}</p>
            <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found.'}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>
    `;
}

loadPhones('iphone');
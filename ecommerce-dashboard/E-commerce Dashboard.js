//Spinner
{
    const form = document.getElementById("myForm");
    const spinner = document.getElementById("spinner");
    const submitBtn = document.getElementById("submitBtn");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        spinner.classList.remove("d-none");
        submitBtn.disabled = true;
        setTimeout(() => {
            spinner.classList.add("d-none");
            submitBtn.disabled = false;
        }, 2000);
    });
}
//Tooltip
{
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}
//Popover
{
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}
//Toast
{
    const toastTrigger = document.getElementById('submitBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
            setTimeout(() => {
                toastBootstrap.show()
            }, 2000);
        })
    }
}
//Edit, View, Del for tabs
{
    function getSelectedRow() {
        const sel = window.getSelection();
        if (!sel.rangeCount) return null;
        let node = sel.anchorNode;
        if (node.nodeType === Node.TEXT_NODE) node = node.parentElement;
        return node.closest('tr');
    }
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = getSelectedRow();
            if (!row) return alert('Select some text inside a row to edit.');
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            const oldText = sel.toString();
            const newText = prompt('Replace with:', oldText);
            if (newText == null) return;
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
            sel.removeAllRanges();
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const row = getSelectedRow();
            if (!row) return alert('Please select any text in the row you want to delete.');
            row.remove();
        });
    });
    function setupModal(modalId, tabPaneId, modalBodyId) {
        const modal = document.getElementById(modalId);
        modal.addEventListener('show.bs.modal', function () {
            const table = document.querySelector(`#${tabPaneId} table`);
            const cloned = table.cloneNode(true);
            cloned.classList.add('table', 'table-bordered', 'table-striped');
            const modalBody = document.getElementById(modalBodyId);
            modalBody.innerHTML = '';
            modalBody.appendChild(cloned);
        });
    }
    setupModal('exampleModal2', 'home-tab-pane', 'modalBody1');
    setupModal('exampleModal3', 'profile-tab-pane', 'modalBody2');
    setupModal('exampleModal4', 'contact-tab-pane', 'modalBody3');
}
//Add New Products
{
    const form = document.getElementById('myForm');
    const table = document.getElementById('productTable').querySelector('tbody');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const pName = document.getElementById('exampleFormControlInput1').value;
        const pCat = document.getElementById('categories').value;
        const pPrice = document.getElementById('basic-url').value;
        if (!pName || !pCat || !pPrice) return alert('Please fill in all required fields.');
        const rNum = table.rows.length + 1;
        const newR = document.createElement('tr');
        newR.innerHTML = `<th scope="row">${rNum}</th>
                            <td>${pName}</td>
                            <td>${pCat}</td>
                            <td>$${parseFloat(pPrice)}</td>`;
        table.appendChild(newR);
        form.reset();
    })
}
//Pagination and Carousel
{
    const carousel = document.getElementById('carouselExample');
    const newCarousel = new bootstrap.Carousel(carousel);
    const pBtn = document.querySelectorAll('.pagination .page-link[data-slide-to]');
    pBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const curInd = parseInt(btn.getAttribute('data-slide-to'));
            newCarousel.to(curInd);
        })
    })
    document.getElementById('cprev').addEventListener('click', (e) => {
        e.preventDefault();
        newCarousel.prev();
    })
    document.getElementById('cnext').addEventListener('click', (e) => {
        e.preventDefault();
        newCarousel.next();
    })
}
//Edit, View, Del for Cards
{
    function setupModal(modalId, cardBodyId, modalBodyId) {
        const modal = document.getElementById(modalId);
        modal.addEventListener('show.bs.modal', function () {
            const card = document.querySelector(`#${cardBodyId} .card-body`);
            const cloned = card.cloneNode(true);
            const modalBody = document.getElementById(modalBodyId);
            modalBody.innerHTML = '';
            modalBody.appendChild(cloned);
        });
    }
    setupModal('exampleModal5', 'cardBody5', 'modalBody5');
    setupModal('exampleModal6', 'cardBody6', 'modalBody6');
    setupModal('exampleModal7', 'cardBody7', 'modalBody7');
    setupModal('exampleModal8', 'cardBody8', 'modalBody8');
    let actualRange = null;
    let actualCard = null;
    document.getElementById('dashboard').addEventListener('mouseup', (e) => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            let node = range.commonAncestorContainer;
            if (node.nodeType === Node.TEXT_NODE) {
                node = node.parentElement;
            }
            const card = node.closest('.card');
            if (card && card.querySelector('.card-body')) {
                actualRange = range.cloneRange();
                actualCard = card;
            } else {
                actualRange = null;
                actualCard = null;
            }
        }
    });
    document.querySelectorAll('#edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!actualRange || !actualRange.toString().trim()) {
                return alert('Please select some text inside a card first.');
            }
            const oldText = actualRange.toString();
            const newText = prompt('Replace with:', oldText);
            if (newText === null) return;
            actualRange.deleteContents();
            actualRange.insertNode(document.createTextNode(newText));
            window.getSelection().removeAllRanges();
            actualRange = null;
        });
    });
    document.querySelectorAll('#del-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!actualCard) return alert('Please select text inside a single card to delete.');
            actualCard.remove();
            actualCard = null;
            actualRange = null;
            window.getSelection().removeAllRanges();
        })
    })
}
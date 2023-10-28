document.getElementById('imageInput').addEventListener('change', handleFileSelect);
document.getElementById('resetFile').addEventListener('click', resetFile);

function handleFileSelect() {
    const input = document.getElementById('imageInput');
    const fileInfoContainer = document.getElementById('selectedFileInfo');
    const resetFileButton = document.getElementById('resetFile');

    if (input.files.length > 0) {
        const fileName = input.files[0].name;
        fileInfoContainer.textContent = `Выбран файл: ${fileName}`;
        resetFileButton.style.display = 'inline-block';
    } else {
        fileInfoContainer.textContent = '';
        resetFileButton.style.display = 'none';
    }
}

function resetFile() {
    const input = document.getElementById('imageInput');
    const fileInfoContainer = document.getElementById('selectedFileInfo');
    const resetFileButton = document.getElementById('resetFile');

    input.value = '';
    fileInfoContainer.textContent = '';
    resetFileButton.style.display = 'none';
}

function createCard(imageURL, imageName, price, fileInfoContainer) {
    const newCard = document.createElement('div');
    newCard.className = 'pageTwo__card';

    const img = new Image();
    img.src = imageURL;

    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 320;
        canvas.height = 320;

        ctx.drawImage(img, 0, 0, 320, 320);

        const resizedImageURL = canvas.toDataURL('image/jpeg');

        const imgElement = document.createElement('img');
        imgElement.className = 'pageTwo__img_card';
        imgElement.src = resizedImageURL;
        imgElement.style.borderRadius = '10px';

        const nameElement = document.createElement('div');
        nameElement.className = 'pageTwo__name5';
        nameElement.textContent = imageName;

        const priceElement = document.createElement('div');
        priceElement.className = 'pageTwo__price';
        priceElement.textContent = price;

        const namePriceContainer = document.createElement('div');
        namePriceContainer.className = 'pageTwo__name_price3';
        namePriceContainer.appendChild(nameElement);
        namePriceContainer.appendChild(priceElement);

        const generalElement = document.createElement('div');
        generalElement.className = 'pageTwo__general';

        generalElement.innerHTML = `
            <div class="pageTwo__timer">
                <img class="pageTwo__time" src="image/pageTwo__timer_img.svg">
                <div class="pageTwo__time_txt">11h : 03m : 01s</div>
                <img class="pageTwo__like" src="image/pageTwo__Heart.svg">
                <div class="pageTwo__like_txt">120</div>
                <div class="pageTwo__show"><img class="pageTwo__show_img" src="image/pageTwo__Show.svg"></div>
                <div class="pageTwo__show_txt">500</div>
            </div>
            <div class="pageTwo__line"></div>
            <div class="pageTwo__lower">
                ${namePriceContainer.outerHTML}
                <div class="pageTwo__buy_div3"><button class="pageTwo__buy">Buy Now</button></div>
            </div>
        `;

        newCard.appendChild(imgElement);
        newCard.appendChild(generalElement);

        const cardContainer = document.getElementById('cardContainer');
        cardContainer.appendChild(newCard);
    };
}

function addCard() {
    const imageInput = document.getElementById('imageInput');
    const imageNameInput = document.getElementById('imageName');
    const priceInput = document.getElementById('price');
    const fileInfoContainer = document.getElementById('selectedFileInfo');

    if (imageInput.files.length === 0 || !imageNameInput.value || !priceInput.value) {
        alert('Пожалуйста, выберите изображение, введите название и цену.');
        return;
    }

    const selectedFile = imageInput.files[0];

    const reader = new FileReader();

    // Создаем замыкание для передачи значений внутрь onload
    reader.onload = (function (imageName, price) {
        return function (e) {
            const imageURL = e.target.result;

            createCard(imageURL, imageName, price, fileInfoContainer);

            // Очистка информации о файле после добавления карточки
            fileInfoContainer.textContent = '';
            document.getElementById('resetFile').style.display = 'none';
        };
    })(imageNameInput.value, priceInput.value);

    reader.readAsDataURL(selectedFile);

    imageInput.value = '';
    imageNameInput.value = '';
    priceInput.value = '';
}

document.getElementById('cardContainer').addEventListener('click', function (event) {
    const target = event.target;

    // Проверяем, является ли целевой элемент кнопкой "Buy Now"
    if (target.classList.contains('pageTwo__buy')) {
        const card = target.closest('.pageTwo__card');

        // Оповещаем родителя (или делаем что-то другое)
        if (card) {
            alert('Кнопка "Buy Now" в карточке была нажата!');
        }
    }
}, true); // Устанавливаем третий аргумент в true для использования фазы погружения





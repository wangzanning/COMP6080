const ERROR_STR = 'Error loading data';

const getData = () => {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://www.cse.unsw.edu.au/~cs6080/20T3/data/package.json');
        xhr.onloadstart = displayLoading;
        xhr.onloadend = removeLoading;
        xhr.onload = () => handleLoad(xhr);
        xhr.onerror = handleError;
        xhr.send();
    } catch (e) {
        displayError(ERROR_STR);
    }
}

const cacheData = (data) => {
    localStorage.setItem('data', JSON.stringify(data));
}

const displayData = (data) => {
    const output = document.createElement('div');
    output.style['display'] = 'flex';
    output.style['flex-direction'] = 'column';
    body.appendChild(output);

    for (const property in data) {
        const row = document.createElement('div');
        row.style['display'] = 'flex';

        const propertyColumn = document.createElement('p');
        propertyColumn.innerText = property;
        propertyColumn.style.width = '100px';

        const valueColumn = document.createElement('p');
        valueColumn.innerText = data[property];

        row.appendChild(propertyColumn);
        row.appendChild(valueColumn);
        output.appendChild(row);
    }
};

const handleLoad = (xhr) => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.response);
        cacheData(data);
        displayData(data);
    } else {
        displayError(ERROR_STR);
    }
};

const handleError = () => {
    if (localStorage.getItem('data') !== null) {
        displayData(JSON.parse(localStorage.getItem('data')));
        displayOfflineMessage();
    } else {
        displayError(ERROR_STR);
    }
};

const displayOfflineMessage = () => {
    const offlineMessage = document.createElement('p');
    offlineMessage.innerText = 'This data is not live.';
    offlineMessage.style.color = 'grey';
    body.appendChild(offlineMessage);
};

const displayError = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.innerText = `Something went wrong: ${error}`;
    errorMessage.style.color = 'red';
    body.appendChild(errorMessage);
};

const displayLoading = () => {
    const loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading, please wait';
    loadingMessage.id = 'loadingMessage';
    body.appendChild(loadingMessage);
};

const removeLoading = () => {
    body.removeChild(document.getElementById('loadingMessage'));
};

getData();

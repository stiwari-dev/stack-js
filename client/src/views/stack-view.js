import { elements } from '../utils';

export const renderStack = (stackData) => {
    let stackItems = '';
    if (stackData.length) {
        for (let i = stackData.length - 1; i >= 0; i--) {
            stackItems = stackItems + `<span>${stackData[i]}</span>`;
        }
    } else {
        stackItems = 'Stack is empty!';
    }
    elements.stackContainer.innerHTML = stackItems;
};

export const renderStackSize = newSize => {
    elements.currentSizeEl.textContent = `Maximum Stack Size: ${newSize}`;
};

export const showError = errorMessage => {
    elements.errorMessage.textContent = errorMessage;
};

export const hideError = () => {
    elements.errorMessage.textContent = '';
};

export const showLoader = () => {
    elements.loaderContainer.style.visibility = 'visible';
};

export const hideLoader = () => {
    elements.loaderContainer.style.visibility = 'hidden';
};
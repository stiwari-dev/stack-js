import Stack from './models/Stack';
import { renderStack, renderStackSize, showError, hideError, showLoader, hideLoader } from './views/stack-view';
import { elements } from './utils';

/**
 * Global State
 */
const state = {
    stack: null
};

/**
 * Initialize App
 */
window.onload = () => {
    state.stack = new Stack();
    showLoader();
    state.stack.getData()
        .then(data => {
            renderStack(state.stack.data);
            renderStackSize(state.stack.size);
            hideLoader();
        })
        .catch(err => {
            showError(err);
            hideLoader();
        });
};

/**
 * Handle Push Operation
 */
const pushHandler = () => {
    showLoader();
    try {
        if (elements.pushInput.value.trim() === '') {
            throw new Error('Field cannot be empty!');
        }
        if (isNaN(Number(elements.pushInput.value))) {
            throw new Error('Only an integer is allowed!');
        } else {
            state.stack.push(Number(elements.pushInput.value))
                .then(data => {
                    renderStack(state.stack.data);
                    hideError();
                    hideLoader();
                })
                .catch(err => {
                    showError(err);
                    hideLoader();
                });
        }
    } catch (err) {
        showError(err);
        hideLoader();
    }
}
elements.pushButton.addEventListener('click', pushHandler);

/**
 * Handle Pop Operation
 */
const popHandler = () => {
    showLoader();
    state.stack.pop()
        .then(data => {
            renderStack(state.stack.data);
            hideError();
            hideLoader();
        })
        .catch(err => {
            showError(err);
            hideLoader();
        })
};
elements.popButton.addEventListener('click', popHandler);

/**
 * Handle Size Change Operation
 */
const changeSizeHandler = () => {
    const newSize = Number(elements.changeSizeInput.value);
    try {
        if (elements.changeSizeInput.value.trim() === '') {
            throw new Error('Field cannot be empty!');
        }
        if (isNaN(newSize)) {
            throw new Error('Only an integer is allowed!');
        } else {
            state.stack.changeSize(newSize)
                .then(data => {
                    renderStackSize(newSize);
                    renderStack(state.stack.data);
                    hideError();
                    hideLoader();
                })
                .catch(err => {
                    showError(err);
                    hideLoader();
                });
        }
    } catch (err) {
        showError(err);
    }
};
elements.changeSizeButton.addEventListener('click', changeSizeHandler);
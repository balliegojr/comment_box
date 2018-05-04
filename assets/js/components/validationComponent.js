import React, { Component } from 'react';

export default class ValidationComponent extends Component {
    constructor(props) {
        super(props);

        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.errors = {};
    }
    _setErrorMessage(element, message) {
        element.labels.forEach(label => {
            if (label.classList.contains("error-message")) {
                label.innerText = message;
            }
        });

        return false;
    }

    _getFieldName(element) {
        for (let index = 0; index < element.labels.length; index++) {
            const label = element.labels[index];
            if (label.classList.contains('control-label')) {
                return label.innerText;
            }

        }

        if (element.placeholder) {
            return element.placeholder;
        }

        return element.name;
    }

    _isValid(element) {
        const name = this._getFieldName(element);

        element.setCustomValidity('');
        if (this.errors[element.name] && element.value === this.errors[element.name].value) {
            element.setCustomValidity(this.errors[element.name].message);
        }

        if (element.hasAttribute('match')) {
            const target = element.getAttribute('match');
            if (element.form.elements[target].value !== element.value) {
                const target_name = this._getFieldName(element.form.elements[target]);
                element.setCustomValidity(`${name} does not match ${target_name}`)
            }
        }

        if (!!element.validity.valid) {
            element.classList.remove('error');
            this._setErrorMessage(element, null);
            return true;
        }

        element.classList.add('error');
        if (!!element.validity.badInput) {
            return this._setErrorMessage(element, `${name} has the wrong format`);
        }

        if (!!element.validity.valueMissing) {
            return this._setErrorMessage(element, `${name} is required`);
        }

        if (!!element.validity.tooShort) {
            return this._setErrorMessage(element, `${name} min length is ${element.minLength}`);
        }

        if (!!element.validity.tooLong) {
            return this._setErrorMessage(element, `${name} max length is ${element.maxLength}`);
        }

        if (!!element.validity.rangeOverFlow) {
            return this._setErrorMessage(element, `${name} max value is ${element.max}`);
        }

        if (!!element.validity.rangeUnderFlow) {
            return this._setErrorMessage(element, `${name} min value is ${element.min}`);
        }

        if (!!element.validity.patternMismatch) {
            return this._setErrorMessage(element, `${name} does not match required pattern`);
        }

        if (!!element.validity.stepMismatch) {
            return this._setErrorMessage(element, `${name} does not match required step`);
        }

        if (!!element.validity.typeMismatch) {
            return this._setErrorMessage(element, `${name} does not match required type`);
        }

        if (!!element.validity.customError) {
            return this._setErrorMessage(element, element.validationMessage);
        }

        return false;
    }

    validateForm(form) {
        if (form.checkValidity()) {
            return true;
        }

        const elements = form.elements;
        return elements.every(elm => this._isValid(elm));
    }

    validateField(ev) {
        return this._isValid(ev.target);
    }

    setError(form, fieldName, message) {
        const element = form.elements[fieldName];
        this.errors[fieldName] = { value: element.value, message: message };
        this._isValid(element);

    }
}
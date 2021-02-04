function validateSubjectForm() {

    const subjectNameInput = document.getElementById('subjectName');
    const subjectAliasInput = document.getElementById('subjectAlias');
    const semesterInput = document.getElementById('semester');

    const errorSubject = document.getElementById('errorSubject');
    const errorSubjectAlias = document.getElementById('errorSubjectAlias');
    const errorSemester = document.getElementById('errorSemester');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const nameLengthMessage = document.getElementById('errorMessage-nameLength').innerText;
    const codeMessage = document.getElementById('errorMessage-code').innerText;
    const numberMessage = document.getElementById('errorMessage-number').innerText;
    const rangeMessage = document.getElementById('errorMessage-range').innerText;
    const summaryMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([subjectNameInput, subjectAliasInput, semesterInput], [errorSubject, errorSubjectAlias, errorSemester], errorsSummary);

    let valid = true;

    if (!checkRequired(subjectNameInput.value)) {
        valid = false;
        subjectNameInput.classList.add("error-input");
        errorSubject.innerText = reqMessage
    } else if (!checkTextLengthRange(subjectNameInput.value, 2, 60)) {
        valid = false;
        subjectNameInput.classList.add("error-input");
        errorSubject.innerText = nameLengthMessage
    }

    if (!checkRequired(subjectAliasInput.value)) {
        valid = false;
        subjectAliasInput.classList.add("error-input");
        errorSubjectAlias.innerText = reqMessage
    } else if (!checkTextLengthRange(subjectAliasInput.value, 2, 3)) {
        valid = false;
        subjectAliasInput.classList.add("error-input");
        errorSubjectAlias.innerText = codeMessage;
    }

    if (!checkRequired(semesterInput.value)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = reqMessage
    } else if (!checkNumber(semesterInput.value)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = numberMessage;
    } else if (!checkNumberRange(semesterInput.value, 1, 8)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = rangeMessage;
    }

    if (!valid) {
        errorsSummary.innerText = summaryMessage;
    }

    return valid;
}
function validateSubjectForm() {

    const subjectNameInput = document.getElementById('subjectName');
    const subjectAliasInput = document.getElementById('subjectAlias');
    const semesterInput = document.getElementById('semester');

    const errorSubject = document.getElementById('errorSubject');
    const errorSubjectAlias = document.getElementById('errorSubjectAlias');
    const errorSemester = document.getElementById('errorSemester');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([subjectNameInput, subjectAliasInput, semesterInput], [errorSubject, errorSubjectAlias, errorSemester], errorsSummary);

    let valid = true;

    if (!checkRequired(subjectNameInput.value)) {
        valid = false;
        subjectNameInput.classList.add("error-input");
        errorSubject.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(subjectNameInput.value, 2, 60)) {
        valid = false;
        subjectNameInput.classList.add("error-input");
        errorSubject.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if (!checkRequired(subjectAliasInput.value)) {
        valid = false;
        subjectAliasInput.classList.add("error-input");
        errorSubjectAlias.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(subjectAliasInput.value, 2, 3)) {
        valid = false;
        subjectAliasInput.classList.add("error-input");
        errorSubjectAlias.innerText = "Pole powinno zawierać od 2 do 3 znaków";
    }

    if (!checkRequired(semesterInput.value)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = "Pole jest wymagane";
    } else if (!checkNumber(semesterInput.value)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(semesterInput.value, 1, 8)) {
        valid = false;
        semesterInput.classList.add("error-input");
        errorSemester.innerText = "Pole powinno być liczbą w zakresie od 1 do 8";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}
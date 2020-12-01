function validateGradeForm() {

    const studentInput = document.getElementById('student');
    const subjectInput = document.getElementById('subject');
    const gradeInput = document.getElementById('grade');
    const dateInput = document.getElementById('date');

    const errorStudent = document.getElementById('errorStudent');
    const errorSubject = document.getElementById('errorSubject');
    const errorGrade = document.getElementById('errorGrade');
    const errorDate = document.getElementById('errorDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([studentInput, subjectInput, gradeInput, dateInput], [errorStudent, errorSubject, errorGrade, errorDate], errorsSummary);

    let valid = true;

    if (!checkRequired(studentInput.value)) {
        valid = false;
        studentInput.classList.add("error-input");
        errorStudent.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(subjectInput.value)) {
        valid = false;
        subjectInput.classList.add("error-input");
        errorSubject.innerText = "Pole jest wymagane";
    }

    if (!checkRequired(gradeInput.value)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = "Pole jest wymagane";
    } else if (!checkNumber(gradeInput.value)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = "Pole powinno być liczbą";
    } else if (!checkNumberRange(gradeInput.value, 2, 5)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = "Pole powinno być liczbą w zakresie od 2 do 5";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "Data nie może być z przyszłości";
}
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

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

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const numberMessage = document.getElementById('errorMessage-number').innerText;
    const rangeMessage = document.getElementById('errorMessage-range').innerText;
    const dateFormatMessage = document.getElementById('errorMessage-date').innerText;
    const dateFutureMessage = document.getElementById('errorMessage-future').innerText;
    const summaryMessage = document.getElementById('errorMessage-summary').innerText;

    resetErrors([studentInput, subjectInput, gradeInput, dateInput], [errorStudent, errorSubject, errorGrade, errorDate], errorsSummary);

    let valid = true;

    if (!checkRequired(studentInput.value)) {
        valid = false;
        studentInput.classList.add("error-input");
        errorStudent.innerText = reqMessage;
    }

    if (!checkRequired(subjectInput.value)) {
        valid = false;
        subjectInput.classList.add("error-input");
        errorSubject.innerText = reqMessage;
    }

    if (!checkRequired(gradeInput.value)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = reqMessage;
    } else if (!checkNumber(gradeInput.value)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = numberMessage;
    } else if (!checkNumberRange(gradeInput.value, 2, 5)) {
        valid = false;
        gradeInput.classList.add("error-input");
        errorGrade.innerText = rangeMessage;
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
        errorDate.innerText = reqMessage;
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = dateFormatMessage;
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = dateFutureMessage;
}
    if (!valid) {
        errorsSummary.innerText = summaryMessage;
    }

    return valid;
}

const form = document.getElementById("studentForm");
const message = document.getElementById("message");
const list = document.getElementById("studentList");

function getStudents() {
  return JSON.parse(
    localStorage.getItem("students") || "[]"
  );
}

function displayStudents() {
  const students = getStudents();
  list.replaceChildren();

  students.forEach((student) => {
    const item = document.createElement("li");
    item.textContent =
      `${student.id} — ${student.name} ` +
      `(${student.programme}, Year ${student.year})`;
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const student = {
    id: document.getElementById("studentID").value.trim(),
    name: document.getElementById("studentName").value.trim(),
    programme: document.getElementById("programme").value.trim(),
    year: Number(document.getElementById("year").value)
  };

  if (!student.id || !student.name || !student.programme ||
      !Number.isInteger(student.year) ||
      student.year < 1 || student.year > 8) {
    message.textContent =
      "Complete all fields and check the year.";
    return;
  }

  const students = getStudents();

  if (students.some((item) => item.id === student.id)) {
    message.textContent =
      "That Student ID is already saved.";
    return;
  }

  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  form.reset();
  message.textContent =
    "Registration saved on this device.";

  displayStudents();
});

displayStudents();
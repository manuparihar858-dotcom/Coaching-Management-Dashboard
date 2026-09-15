/* =========================================
   COACHING MANAGEMENT DASHBOARD
   ========================================= */


/* =========================================
   PRODUCT SETTINGS
   ========================================= */

const CURRENCY = "$";


/* =========================================
   DEMO DATA
   ========================================= */

const initialStudents = [

    {
        id: "1",
        roll: "STU-101",
        name: "Alex Morgan",
        course: "Mathematics - Class 12",
        phone: "+1 555 100 1001",
        totalFee: 1200,
        paidFee: 1200,
        joinDate: "2026-06-15",
        totalClasses: 40,
        attendedClasses: 38
    },

    {
        id: "2",
        roll: "STU-102",
        name: "Sophia Carter",
        course: "Physics - Class 12",
        phone: "+1 555 100 1002",
        totalFee: 1500,
        paidFee: 900,
        joinDate: "2026-07-01",
        totalClasses: 35,
        attendedClasses: 29
    },

    {
        id: "3",
        roll: "STU-103",
        name: "Daniel Wilson",
        course: "Chemistry - Class 11",
        phone: "+1 555 100 1003",
        totalFee: 1000,
        paidFee: 400,
        joinDate: "2026-07-18",
        totalClasses: 30,
        attendedClasses: 24
    },

    {
        id: "4",
        roll: "STU-104",
        name: "Emma Johnson",
        course: "Mathematics - Class 11",
        phone: "+1 555 100 1004",
        totalFee: 1200,
        paidFee: 1200,
        joinDate: "2026-08-02",
        totalClasses: 25,
        attendedClasses: 24
    },

    {
        id: "5",
        roll: "STU-105",
        name: "Noah Williams",
        course: "Science Foundation",
        phone: "+1 555 100 1005",
        totalFee: 900,
        paidFee: 300,
        joinDate: "2026-08-10",
        totalClasses: 20,
        attendedClasses: 16
    }

];


const initialEnquiries = [

    {
        id: "e1",
        date: "2026-09-12",
        name: "Olivia Brown",
        course: "Mathematics - Class 12",
        phone: "+1 555 200 1001",
        status: "Contacted"
    },

    {
        id: "e2",
        date: "2026-09-14",
        name: "James Miller",
        course: "Physics - Class 12",
        phone: "+1 555 200 1002",
        status: "New"
    },

    {
        id: "e3",
        date: "2026-09-14",
        name: "Mia Davis",
        course: "Chemistry - Class 11",
        phone: "+1 555 200 1003",
        status: "New"
    }

];


/* =========================================
   APPLICATION STATE
   ========================================= */

let students =
    JSON.parse(
        localStorage.getItem("coaching_students")
    ) || initialStudents;


let enquiries =
    JSON.parse(
        localStorage.getItem("coaching_enquiries")
    ) || initialEnquiries;


let attendanceRecords =
    JSON.parse(
        localStorage.getItem("coaching_attendance")
    ) || {};


/* =========================================
   STORAGE
   ========================================= */

function saveData() {

    localStorage.setItem(
        "coaching_students",
        JSON.stringify(students)
    );

    localStorage.setItem(
        "coaching_enquiries",
        JSON.stringify(enquiries)
    );

    localStorage.setItem(
        "coaching_attendance",
        JSON.stringify(attendanceRecords)
    );

}


/* =========================================
   HELPERS
   ========================================= */

function money(amount) {

    return (
        CURRENCY +
        Number(amount || 0).toLocaleString()
    );

}


function getFeeStatus(total, paid) {

    if (paid >= total) {

        return {
            label: "Paid",
            class: "badge-paid"
        };

    }

    if (paid > 0) {

        return {
            label: "Pending",
            class: "badge-pending"
        };

    }

    return {
        label: "Overdue",
        class: "badge-overdue"
    };

}


function calculateAttendancePercent(
    attended,
    total
) {

    if (!total) {
        return "100%";
    }

    return (
        Math.round(
            (attended / total) * 100
        ) + "%"
    );

}


function formatDate(date) {

    if (!date) {
        return "";
    }

    return new Date(date).toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );

}


/* =========================================
   NAVIGATION
   ========================================= */

function switchTab(tabId) {

    document
        .querySelectorAll(".tab-content")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    document
        .querySelectorAll(".nav-link")
        .forEach(button => {

            button.classList.remove("active");

        });


    const target =
        document.getElementById(
            "tab-" + tabId
        );


    if (target) {

        target.classList.add("active");

    }


    const mapping = {

        dashboard: 0,
        students: 1,
        fees: 2,
        attendance: 3,
        enquiries: 4

    };


    const buttons =
        document.querySelectorAll(".nav-link");


    if (buttons[mapping[tabId]]) {

        buttons[mapping[tabId]]
            .classList.add("active");

    }


    const titleMap = {

        dashboard: "Dashboard Overview",
        students: "Student Management",
        fees: "Fee Tracking",
        attendance: "Attendance Management",
        enquiries: "Enquiry Management"

    };


    document.getElementById(
        "page-title"
    ).textContent =
        titleMap[tabId] || "Dashboard";


    renderAll();


    document
        .getElementById("sidebar")
        .classList.remove("open");

}


function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


/* =========================================
   MODALS
   ========================================= */

function openModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.add("open");

    }

}


function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.classList.remove("open");

    }

}


/* =========================================
   STUDENT MODAL
   ========================================= */

function openStudentModal(studentId = null) {

    const form =
        document.getElementById(
            "student-form"
        );


    form.reset();


    if (studentId) {

        const student =
            students.find(
                s => s.id === studentId
            );


        if (!student) {
            return;
        }


        document.getElementById(
            "student-modal-title"
        ).textContent =
            "Edit Student";


        document.getElementById(
            "student-edit-id"
        ).value =
            student.id;


        document.getElementById(
            "student-roll"
        ).value =
            student.roll;


        document.getElementById(
            "student-name"
        ).value =
            student.name;


        document.getElementById(
            "student-course"
        ).value =
            student.course;


        document.getElementById(
            "student-phone"
        ).value =
            student.phone;


        document.getElementById(
            "student-total-fee"
        ).value =
            student.totalFee;


        document.getElementById(
            "student-paid-fee"
        ).value =
            student.paidFee;

    }

    else {

        document.getElementById(
            "student-modal-title"
        ).textContent =
            "Register New Student";


        document.getElementById(
            "student-edit-id"
        ).value = "";

    }


    openModal("student-modal");

}


/* =========================================
   SAVE STUDENT
   ========================================= */

function handleSaveStudent(event) {

    event.preventDefault();


    const editId =
        document.getElementById(
            "student-edit-id"
        ).value;


    const roll =
        document.getElementById(
            "student-roll"
        ).value.trim();


    const name =
        document.getElementById(
            "student-name"
        ).value.trim();


    const course =
        document.getElementById(
            "student-course"
        ).value.trim();


    const phone =
        document.getElementById(
            "student-phone"
        ).value.trim();


    const totalFee =
        Number(
            document.getElementById(
                "student-total-fee"
            ).value
        );


    const paidFee =
        Number(
            document.getElementById(
                "student-paid-fee"
            ).value
        );


    if (paidFee > totalFee) {

        alert(
            "Paid amount cannot be greater than the total fee."
        );

        return;

    }


    if (editId) {

        const index =
            students.findIndex(
                s => s.id === editId
            );


        if (index !== -1) {

            students[index] = {

                ...students[index],

                roll,
                name,
                course,
                phone,
                totalFee,
                paidFee

            };

        }

    }

    else {

        students.push({

            id: Date.now().toString(),

            roll,

            name,

            course,

            phone,

            totalFee,

            paidFee,

            joinDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            totalClasses: 0,

            attendedClasses: 0

        });

    }


    saveData();

    closeModal("student-modal");

    renderAll();

}


/* =========================================
   DELETE STUDENT
   ========================================= */

function deleteStudent(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) {
        return;
    }


    const confirmed =
        confirm(
            `Remove ${student.name} from the student list?`
        );


    if (!confirmed) {
        return;
    }


    students =
        students.filter(
            s => s.id !== id
        );


    saveData();

    renderAll();

}


/* =========================================
   STUDENT PROFILE
   ========================================= */

function viewProfile(id) {

    const student =
        students.find(
            s => s.id === id
        );


    if (!student) {
        return;
    }


    const fee =
        getFeeStatus(
            student.totalFee,
            student.paidFee
        );


    const attendance =
        calculateAttendancePercent(
            student.attendedClasses,
            student.totalClasses
        );


    const balance =
        Math.max(
            0,
            student.totalFee -
            student.paidFee
        );


    const html = `

        <div class="profile-card">

            <div class="profile-avatar">
                ${student.name.charAt(0).toUpperCase()}
            </div>

            <div class="profile-info">

                <h4>${student.name}</h4>

                <p>
                    Student ID:
                    <strong>${student.roll}</strong>
                </p>

                <p>
                    ${student.course}
                </p>

                <p>
                    ${student.phone}
                </p>

            </div>

        </div>


        <div class="profile-grid">

            <div class="profile-stat">

                <span>Fee Status</span>

                <strong>
                    <span class="badge ${fee.class}">
                        ${fee.label}
                    </span>
                </strong>

            </div>


            <div class="profile-stat">

                <span>Attendance</span>

                <strong>
                    ${attendance}
                </strong>

            </div>


            <div class="profile-stat">

                <span>Balance</span>

                <strong>
                    ${money(balance)}
                </strong>

            </div>

        </div>


        <div class="profile-section">

            <h4>Fee Information</h4>

            <div class="profile-row">

                <span>Total Fee</span>

                <strong>
                    ${money(student.totalFee)}
                </strong>

            </div>

            <div class="profile-row">

                <span>Paid</span>

                <strong>
                    ${money(student.paidFee)}
                </strong>

            </div>

            <div class="profile-row">

                <span>Remaining</span>

                <strong>
                    ${money(balance)}
                </strong>

            </div>

        </div>


        <div class="profile-section">

            <h4>Student Information</h4>

            <div class="profile-row">

                <span>Course</span>

                <strong>
                    ${student.course}
                </strong>

            </div>

            <div class="profile-row">

                <span>Joining Date</span>

                <strong>
                    ${formatDate(student.joinDate)}
                </strong>

            </div>

            <div class="profile-row">

                <span>Classes Attended</span>

                <strong>
                    ${student.attendedClasses}
                    /
                    ${student.totalClasses}
                </strong>

            </div>

        </div>

    `;


    document.getElementById(
        "profile-modal-body"
    ).innerHTML = html;


    openModal("profile-modal");

}


/* =========================================
   SEARCH STUDENTS
   ========================================= */

function renderStudents() {

    const search =
        (
            document.getElementById(
                "student-search-input"
            )?.value || ""
        ).toLowerCase();


    const filtered =
        students.filter(student => {

            return (

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

                ||

                student.course
                    .toLowerCase()
                    .includes(search)

            );

        });


    const tbody =
        document.getElementById(
            "students-table-tbody"
        );


    tbody.innerHTML =
        filtered.map(student => {

            const fee =
                getFeeStatus(
                    student.totalFee,
                    student.paidFee
                );


            return `

                <tr>

                    <td>
                        <strong>
                            ${student.roll}
                        </strong>
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        ${student.phone}
                    </td>

                    <td>
                        ${formatDate(student.joinDate)}
                    </td>

                    <td>
                        <span class="badge ${fee.class}">
                            ${fee.label}
                        </span>
                    </td>

                    <td>

                        <div class="panel-controls">

                            <button
                                class="btn btn-secondary btn-sm"
                                onclick="viewProfile('${student.id}')"
                            >
                                Profile
                            </button>

                            <button
                                class="btn btn-secondary btn-sm"
                                onclick="openStudentModal('${student.id}')"
                            >
                                Edit
                            </button>

                            <button
                                class="btn btn-danger btn-sm"
                                onclick="deleteStudent('${student.id}')"
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================
   FEES
   ========================================= */

function recordPayment(studentId) {

    const student =
        students.find(
            s => s.id === studentId
        );


    if (!student) {
        return;
    }


    const balance =
        Math.max(
            0,
            student.totalFee -
            student.paidFee
        );


    if (balance <= 0) {

        alert(
            "This student's fee is already fully paid."
        );

        return;

    }


    const input =
        prompt(
            `Enter payment amount for ${student.name}\nBalance: ${money(balance)}`
        );


    if (input === null) {
        return;
    }


    const amount =
        Number(input);


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid payment amount."
        );

        return;

    }


    if (amount > balance) {

        alert(
            `Payment cannot exceed the remaining balance of ${money(balance)}.`
        );

        return;

    }


    student.paidFee += amount;


    saveData();

    renderAll();

}


function renderFees() {

    const filter =
        document.getElementById(
            "fee-filter"
        ).value;


    const tbody =
        document.getElementById(
            "fee-table-tbody"
        );


    const filtered =
        students.filter(student => {

            const status =
                getFeeStatus(
                    student.totalFee,
                    student.paidFee
                ).label;


            return (
                filter === "ALL" ||
                status === filter
            );

        });


    tbody.innerHTML =
        filtered.map(student => {

            const fee =
                getFeeStatus(
                    student.totalFee,
                    student.paidFee
                );


            const balance =
                Math.max(
                    0,
                    student.totalFee -
                    student.paidFee
                );


            return `

                <tr>

                    <td>
                        <strong>
                            ${student.roll}
                        </strong>
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        ${money(student.totalFee)}
                    </td>

                    <td>
                        ${money(student.paidFee)}
                    </td>

                    <td>
                        ${money(balance)}
                    </td>

                    <td>

                        <span class="badge ${fee.class}">
                            ${fee.label}
                        </span>

                    </td>

                    <td>

                        <button
                            class="btn btn-secondary btn-sm"
                            onclick="recordPayment('${student.id}')"
                        >
                            Record Payment
                        </button>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================
   ATTENDANCE
   ========================================= */

function setDailyStatus(
    studentId,
    status
) {

    const date =
        document.getElementById(
            "attendance-date"
        ).value;


    if (!date) {
        return;
    }


    if (!attendanceRecords[date]) {

        attendanceRecords[date] = {};

    }


    const previous =
        attendanceRecords[date][studentId];


    attendanceRecords[date][studentId] =
        status;


    const student =
        students.find(
            s => s.id === studentId
        );


    if (!student) {
        return;
    }


    if (!previous) {

        student.totalClasses += 1;


        if (status === "Present") {

            student.attendedClasses += 1;

        }

    }

    else if (
        previous !== status
    ) {

        if (
            status === "Present"
        ) {

            student.attendedClasses += 1;

        }

        if (
            previous === "Present"
        ) {

            student.attendedClasses =
                Math.max(
                    0,
                    student.attendedClasses - 1
                );

        }

    }


    saveData();

    renderAttendance();

    renderStats();

    renderOverview();

}


function markAllAttendance(status) {

    const date =
        document.getElementById(
            "attendance-date"
        ).value;


    if (!date) {
        return;
    }


    students.forEach(student => {

        setDailyStatus(
            student.id,
            status
        );

    });

}


function renderAttendance() {

    const date =
        document.getElementById(
            "attendance-date"
        ).value;


    const records =
        attendanceRecords[date] || {};


    const tbody =
        document.getElementById(
            "attendance-table-tbody"
        );


    tbody.innerHTML =
        students.map(student => {

            const current =
                records[student.id] ||
                "Not Marked";


            const percent =
                calculateAttendancePercent(
                    student.attendedClasses,
                    student.totalClasses
                );


            return `

                <tr>

                    <td>
                        <strong>
                            ${student.roll}
                        </strong>
                    </td>

                    <td>
                        ${student.name}
                    </td>

                    <td>
                        ${student.course}
                    </td>

                    <td>
                        <strong>
                            ${percent}
                        </strong>
                    </td>

                    <td>

                        <div class="panel-controls">

                            <button
                                class="btn btn-sm ${
                                    current === "Present"
                                        ? ""
                                        : "btn-secondary"
                                }"
                                onclick="setDailyStatus('${student.id}', 'Present')"
                            >
                                Present
                            </button>

                            <button
                                class="btn btn-sm ${
                                    current === "Absent"
                                        ? "btn-danger"
                                        : "btn-secondary"
                                }"
                                onclick="setDailyStatus('${student.id}', 'Absent')"
                            >
                                Absent
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================
   ENQUIRIES
   ========================================= */

function openEnquiryModal() {

    document
        .getElementById("enquiry-form")
        .reset();


    openModal("enquiry-modal");

}


function handleSaveEnquiry(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "enquiry-name"
        ).value.trim();


    const course =
        document.getElementById(
            "enquiry-course"
        ).value.trim();


    const phone =
        document.getElementById(
            "enquiry-phone"
        ).value.trim();


    enquiries.push({

        id:
            Date.now().toString(),

        date:
            new Date()
                .toISOString()
                .split("T")[0],

        name,

        course,

        phone,

        status: "New"

    });


    saveData();

    closeModal("enquiry-modal");

    renderAll();

}


function updateEnquiryStatus(
    id,
    status
) {

    const index =
        enquiries.findIndex(
            enquiry =>
                enquiry.id === id
        );


    if (index === -1) {
        return;
    }


    enquiries[index].status =
        status;


    saveData();

    renderAll();

}


function renderEnquiries() {

    const tbody =
        document.getElementById(
            "enquiry-table-tbody"
        );


    tbody.innerHTML =
        enquiries.map(enquiry => {

            let badgeClass =
                "badge-pending";


            if (
                enquiry.status === "New"
            ) {

                badgeClass =
                    "badge-overdue";

            }

            else if (
                enquiry.status === "Enrolled"
            ) {

                badgeClass =
                    "badge-enrolled";

            }

            else if (
                enquiry.status === "Closed"
            ) {

                badgeClass =
                    "badge-closed";

            }


            return `

                <tr>

                    <td>
                        ${formatDate(enquiry.date)}
                    </td>

                    <td>
                        <strong>
                            ${enquiry.name}
                        </strong>
                    </td>

                    <td>
                        ${enquiry.course}
                    </td>

                    <td>
                        ${enquiry.phone}
                    </td>

                    <td>

                        <span class="badge ${badgeClass}">
                            ${enquiry.status}
                        </span>

                    </td>

                    <td>

                        <select
                            onchange="
                                updateEnquiryStatus(
                                    '${enquiry.id}',
                                    this.value
                                )
                            "
                        >

                            <option
                                value="New"
                                ${
                                    enquiry.status === "New"
                                        ? "selected"
                                        : ""
                                }
                            >
                                New
                            </option>

                            <option
                                value="Contacted"
                                ${
                                    enquiry.status === "Contacted"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Contacted
                            </option>

                            <option
                                value="Enrolled"
                                ${
                                    enquiry.status === "Enrolled"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Enrolled
                            </option>

                            <option
                                value="Closed"
                                ${
                                    enquiry.status === "Closed"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Closed
                            </option>

                        </select>

                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================
   DASHBOARD
   ========================================= */

function renderStats() {

    const totalCollected =
        students.reduce(
            (sum, student) =>
                sum + student.paidFee,
            0
        );


    const totalPending =
        students.reduce(
            (sum, student) =>
                sum +
                Math.max(
                    0,
                    student.totalFee -
                    student.paidFee
                ),
            0
        );


    const openEnquiries =
        enquiries.filter(
            enquiry =>
                enquiry.status !== "Closed" &&
                enquiry.status !== "Enrolled"
        ).length;


    document.getElementById(
        "stat-active-students"
    ).textContent =
        students.length;


    document.getElementById(
        "stat-fee-collected"
    ).textContent =
        money(totalCollected);


    document.getElementById(
        "stat-fee-pending"
    ).textContent =
        money(totalPending);


    document.getElementById(
        "stat-open-enquiries"
    ).textContent =
        openEnquiries;

}


function renderOverview() {

    const studentsBody =
        document.getElementById(
            "overview-students-tbody"
        );


    studentsBody.innerHTML =
        students
            .slice(0, 5)
            .map(student => {

                const fee =
                    getFeeStatus(
                        student.totalFee,
                        student.paidFee
                    );


                const attendance =
                    calculateAttendancePercent(
                        student.attendedClasses,
                        student.totalClasses
                    );


                return `

                    <tr>

                        <td>
                            <strong>
                                ${student.roll}
                            </strong>
                        </td>

                        <td>
                            ${student.name}
                        </td>

                        <td>
                            ${student.course}
                        </td>

                        <td>
                            ${student.phone}
                        </td>

                        <td>

                            <span class="badge ${fee.class}">
                                ${fee.label}
                            </span>

                        </td>

                        <td>
                            <strong>
                                ${attendance}
                            </strong>
                        </td>

                    </tr>

                `;

            })
            .join("");


    const enquiryBody =
        document.getElementById(
            "overview-enquiries-tbody"
        );


    const activeEnquiries =
        enquiries.filter(
            enquiry =>
                enquiry.status !== "Closed" &&
                enquiry.status !== "Enrolled"
        );


    enquiryBody.innerHTML =
        activeEnquiries
            .slice(0, 5)
            .map(enquiry => {

                return `

                    <tr>

                        <td>
                            <strong>
                                ${enquiry.name}
                            </strong>
                        </td>

                        <td>
                            ${enquiry.course}
                        </td>

                        <td>
                            ${enquiry.phone}
                        </td>

                        <td>
                            <span class="badge badge-pending">
                                ${enquiry.status}
                            </span>
                        </td>

                        <td>

                            <button
                                class="btn btn-secondary btn-sm"
                                onclick="switchTab('enquiries')"
                            >
                                Follow Up
                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

}


/* =========================================
   RENDER EVERYTHING
   ========================================= */

function renderAll() {

    renderStats();

    renderStudents();

    renderFees();

    renderAttendance();

    renderEnquiries();

    renderOverview();

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================= */

document
    .querySelectorAll(".modal-overlay")
    .forEach(overlay => {

        overlay.addEventListener(
            "click",
            event => {

                if (
                    event.target === overlay
                ) {

                    overlay.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


/* =========================================
   ESC KEY
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            document
                .querySelectorAll(
                    ".modal-overlay.open"
                )
                .forEach(modal => {

                    modal.classList.remove(
                        "open"
                    );

                });

        }

    }
);


/* =========================================
   INITIALIZATION
   ========================================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        const attendanceDate =
            document.getElementById(
                "attendance-date"
            );


        if (attendanceDate) {

            attendanceDate.value =
                today;


            attendanceDate.addEventListener(
                "change",
                renderAttendance
            );

        }


        const currentDate =
            document.getElementById(
                "current-date"
            );


        if (currentDate) {

            currentDate.textContent =
                new Date().toLocaleDateString(
                    undefined,
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );

        }


        renderAll();

    }
);

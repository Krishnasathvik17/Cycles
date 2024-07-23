document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const logModal = document.getElementById('logModal');
    const closeModal = document.querySelector('.close');
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        monthYear.textContent = `${months[month]} ${year}`;

        const firstDay = (new Date(year, month)).getDay();
        const daysInMonth = 32 - new Date(year, month, 32).getDate();

        let date = 1;
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = document.createElement('td');
                    row.appendChild(cell);
                } else if (date > daysInMonth) {
                    break;
                } else {
                    let cell = document.createElement('td');
                    let cellText = document.createTextNode(date);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    
                    // Add color coding based on the day
                    if (date <= 5 || date >= 27) {
                        cell.style.backgroundColor = '#FFCCCB'; // Light red
                    } else if (date >= 6 && date <= 12) {
                        cell.style.backgroundColor = '#FFFF99'; // Light yellow
                    } else if (date >= 13 && date <= 19) {
                        cell.style.backgroundColor = '#CCFFCC'; // Light green
                    } else {
                        cell.style.backgroundColor = '#CCCCFF'; // Light purple
                    }

                    cell.addEventListener('click', () => {
                        logModal.style.display = 'block';
                    });

                    date++;
                }
            }

            calendarBody.appendChild(row);
        }
    }

    prevMonth.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        generateCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar(currentMonth, currentYear);
    });

    todayBtn.addEventListener('click', () => {
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        generateCalendar(currentMonth, currentYear);
    });

    closeModal.addEventListener('click', () => {
        logModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === logModal) {
            logModal.style.display = 'none';
        }
    });

    generateCalendar(currentMonth, currentYear);
});

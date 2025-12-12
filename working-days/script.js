const ukBankHolidays = [
    // 2025
    '2025-01-01', '2025-04-18', '2025-04-21', '2025-05-05', '2025-05-26', 
    '2025-08-25', '2025-12-25', '2025-12-26',
    // 2026
    '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25', 
    '2026-08-31', '2026-12-25', '2026-12-28',
    // 2027
    '2027-01-01', '2027-03-26', '2027-03-29', '2027-05-03', '2027-05-31', 
    '2027-08-30', '2027-12-27', '2027-12-28',
    // 2028
    '2028-01-03', '2028-04-14', '2028-04-17', '2028-05-01', '2028-05-29', 
    '2028-08-28'
];

function isWeekend(date) {
    const day = date.getUTCDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

function isBankHoliday(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return ukBankHolidays.includes(dateString);
}

function calculateWorkingDays(startDate, endDate) {
    let workingDays = 0;
    let weekendDays = 0;
    let bankHolidayDays = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (!isWeekend(currentDate)) {
            if (!isBankHoliday(currentDate)) {
                workingDays++;
            } else {
                bankHolidayDays++;
            }
        } else {
            weekendDays++;
        }
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return { workingDays, weekendDays, bankHolidayDays };
}

// Calculate the working days
const today = new Date();
const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));

const endDate = new Date(Date.UTC(2028, 6, 31));

const result = calculateWorkingDays(todayUTC, endDate);
const totalDays = Math.floor((endDate - todayUTC) / (1000 * 60 * 60 * 24)) + 1;

// Display results
document.getElementById('workingDays').textContent = result.workingDays;
document.getElementById('startDate').textContent = todayUTC.toLocaleDateString('en-GB', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});
document.getElementById('endDate').textContent = endDate.toLocaleDateString('en-GB', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});
document.getElementById('totalDays').textContent = totalDays;
document.getElementById('weekends').textContent = result.weekendDays;
document.getElementById('bankHolidays').textContent = result.bankHolidayDays;
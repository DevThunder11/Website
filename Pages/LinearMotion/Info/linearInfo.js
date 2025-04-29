
// เพิ่มฟังก์ชันสำหรับตรวจสอบและอัพเดท Dark Mode
function updateDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    console.log('Updated Dark Mode:', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
    // ตรวจสอบสถานะเริ่มต้น
    updateDarkMode();

    // ตรวจจับการเปลี่ยนแปลง
    window.addEventListener('storage', (e) => {
        if (e.key === 'darkMode') {
            updateDarkMode();
        }
    });
});
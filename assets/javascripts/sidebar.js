const Sidebar = document.querySelector(".sidebar");
const InputCheckbox = document.querySelector("#toggle-checkbox");
let isToggleSidebar = localStorage.getItem("isToggleSidebar");

// Check trong localstorage xem đã có hay chưa, chưa thì tạo, có thì gán vào input checkbox
// Mục đích dùng localstorage là để lư lại trạng thái toggle

if (!isToggleSidebar) {
    localStorage.setItem("isToggleSidebar", JSON.stringify(false));
    InputCheckbox.checked = false;
} else {
    isToggleSidebar = JSON.parse(isToggleSidebar);
    InputCheckbox.checked = isToggleSidebar;
}

InputCheckbox.addEventListener("click", function() {
    localStorage.setItem("isToggleSidebar", JSON.stringify(InputCheckbox.checked));

    if (InputCheckbox.checked) {
        Sidebar.style.width = 'fit-content';
        const maxWidth = Sidebar.offsetWidth + 'px';
        Sidebar.style.width = '300px';

        requestAnimationFrame(() => {
            Sidebar.style.width = maxWidth;
        });
    } else {
        Sidebar.style.width = '300px';
    }
});
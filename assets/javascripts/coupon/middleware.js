const url = new URL(window.location.href);

// Tạo một đối tượng URLSearchParams từ chuỗi truy vấn
const params = new URLSearchParams(url.search);

// Lấy giá trị của tham số "id"
const id = params.get('id');

if (!id) window.location.href = "http://127.0.0.1:3001/";

(async () => {
    const res = await fetch(`http://localhost:3000/coupons/${ id }`);
    if (!res.ok) window.location.href = "http://127.0.0.1:3001/";

    const data = await res.json();

    const FormProduct = document.querySelector(".form-product");
    const InputName = FormProduct.querySelector(".input-name");
    const InputQuantity = FormProduct.querySelector(".input-quantity");


    const InputDiscountAmount = FormProduct.querySelector(".input-discount-amount");
    const InputDescription = FormProduct.querySelector(".input-description");
    const InputCouponCode = FormProduct.querySelector(".input-coupon__code");
    InputName.value = data.name;
    InputQuantity.value = data.quantity;
    InputDiscountAmount.value = data.discount__amount;
    InputCouponCode.value = data.coupon__code;
    InputDescription.value = data["description"];

})();
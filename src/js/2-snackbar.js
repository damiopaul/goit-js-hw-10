// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');



iziToast.settings({
    position: 'topRight',
})

function submitHandler(event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');

    const stateInput = document.querySelector('input[name="state"]:checked');

    const delay = parseInt(delayInput.value);

     const promise = new Promise ((resolve, reject) => {
        if (stateInput.value === 'fulfilled') {
            setTimeout(() => {
                resolve(delay);
            }, delay);
        }else {
            setTimeout(()=> {
                reject(delay);
            }, delay)
        }
    });

    promise.then((delay) => {
        console.log("success")
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`
        });
    })
    .catch((delay)=> {
        iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`
        });
    })

}

form.addEventListener("submit", submitHandler);





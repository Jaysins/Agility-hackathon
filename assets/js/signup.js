const navigateToDashboard = (data) => {
    console.log(data)

    sessionStorage.setItem("userData", JSON.stringify({
        name: data.name, token: data.tokenPayload, id: data.id, email: data.email
    }))

    const pathArray = window.location.pathname.split('/');
    pathArray.splice(-1)

    window.location.href = window.location.origin + pathArray.join("/") + "/welcome.html"
}

const userData = sessionStorage.getItem("userData")

console.log(userData)
console.log(userData)


if (userData) {
    navigateToDashboard(JSON.parse(userData))
}

const form = [...document.querySelector('.form .inputs').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i * 100);
})

const submitBtn = document.querySelector('#signup-btn');

submitBtn.addEventListener('click', (e) => {
    const button = e.currentTarget
    button.setAttribute('disabled', true)
    button.innerText = "Loading...."
    const password = document.getElementById("password")
    const verifyPassword = document.getElementById("verify_password")

    console.log(password, verifyPassword)
    // if (password.value !== verifyPassword.value) {
    //     alert("password do not match")
    //     return
    // }
    const validatedValues = {}
    form.forEach((item) => {

        // if (!item.value) {
        //     alert(`${item.placeholder} is required`)
        //     return true
        // }

        validatedValues[item.id] = item.value
    })

    fetch(`https://good-health-9xjb.onrender.com/auth/signup `, {
        method: 'POST',
        body: JSON.stringify(validatedValues),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            let error = false
            if (response.status !== 200) {
                error = true
            }
            response.json()
                .then((response) => {
                    if (error) {
                        button.disabled = false
                        button.innerText = "Sign Up"
                        return alert(response.message)
                    }
                    navigateToDashboard(response)
                })

        })
})

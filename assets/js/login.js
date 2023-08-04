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


if (userData && userData !== "{}") {
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

    const validatedValues = {}
    form.forEach((item) => {

        // if (!item.value) {
        //     alert(`${item.placeholder} is required`)
        //     return true
        // }

        validatedValues[item.id] = item.value
    })

    fetch(`https://good-health-9xjb.onrender.com/auth/login `, {
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
                        button.innerText = "Login"
                        return alert(response.message)
                    }
                    navigateToDashboard(response)
                })

        })
})

let userData = sessionStorage.getItem("userData")

console.log(userData)

if (!userData){
    const pathArray = window.location.pathname.split('/');
    pathArray.splice(-1)
    window.location.href = window.location.origin + pathArray.join("/") + "/logIn.html"
}

userData = JSON.parse(userData)
document.getElementById("username").textContent = userData.name

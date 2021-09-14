const listFcodeItem = $(".list-fcode li");
const openFcodeModal = $(".open-fcode-modal");
const getFcodeBtn = $("#get-fcode-btn");
const caoxFcodeInput = $("#caox-fcode");
const caoxFcodeHupLeft = $("#hup-left");

const getFcodeModal = new bootstrap.Modal(document.getElementById('getFcodeModal'), {
    keyboard: false
});

const thanksCaoXToast = new bootstrap.Toast(document.getElementById('thanks-caox'), {});
const successToast = new bootstrap.Toast(document.getElementById('success-toast'), {});
const failToast = new bootstrap.Toast(document.getElementById('fail-toast'), {});

let currentFocusFcode = undefined;

listFcodeItem.mouseenter(function (event) {
    $(event.currentTarget.querySelector(".open-fcode-modal")).removeClass("end-100")
    $(event.currentTarget.querySelector(".open-fcode-modal")).addClass("end-0")
})

listFcodeItem.mouseleave(function (event) {
    $(event.currentTarget.querySelector(".open-fcode-modal")).addClass("end-100")
    $(event.currentTarget.querySelector(".open-fcode-modal")).removeClass("end-0")
})

openFcodeModal.on('click', function (event) {
    currentFocusFcode = event.currentTarget
    getFcodeModal.toggle();
})

getFcodeBtn.on('click', async function (event) {
    const inputPassword = document.getElementById("caox-password-name").value;
    const fcodeId = currentFocusFcode.querySelector(".fcode-id").textContent;

    if (!inputPassword) return;

    const code = await checkPass(inputPassword, fcodeId);
    getFcodeModal.hide();

    if (code.status) {
        await navigator.clipboard.writeText(code.fcode);
        successToast.show();
    } else {
        failToast.show();
    }

})


$("#share-fcode-btn").on('click', function () {
    const newFcode = caoxFcodeInput.val();
    const hupLeft = caoxFcodeHupLeft.val() || 0;
    caoxFcodeInput.val("");
    caoxFcodeHupLeft.val("");
    if (!newFcode) return;
    uploadFcode(newFcode, hupLeft)
})


function uploadFcode(newFcode, hupLeft) {
    const settings = {
        "url": "http://localhost:5000/fcode/post",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "fcode": newFcode,
            "hup": hupLeft
        }),
    };

    $.ajax(settings).done(function (response) {
        thanksCaoXToast.show();
    });
}


async function checkPass(inputPassword, fcodeId) {
    const settings = {
        "url": `http://localhost:5000/fcode/get?caoxPass=${inputPassword}&fcodeId=${fcodeId}`,
        "method": "GET",
        "timeout": 0,
    };

    return $.ajax(settings);
}



// on submit call to this function
function uploadImg(ev) {
    ev.preventDefault();
    const canvasData = gElCanvas.toDataURL("image/jpeg");
    document.getElementById('imgData').value = canvasData

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(canvasData, onSuccess);
}

async function doUploadImg(imgData, onSuccess) {
    const CLOUD_NAME = "webify"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData();
    formData.append('file', imgData)
    formData.append('upload_preset', 'webify');
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        console.log('data', data);
        onSuccess(data.secure_url)

    } catch (err) {
        console.log(err);
    }
}

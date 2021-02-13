

// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");
  
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    let inputVal = elForm.querySelector('input').value
    doUploadImg(elForm, onSuccess, inputVal);
  }
  
  
  async function doUploadImg(elForm, onSuccess, inputVal) {
    const CLOUD_NAME = "webify"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  
    const img = new Image()
    img.src = inputVal
    img.onload = async ()=> {
  
        const formData = new FormData();
        formData.append('file', img.src)
        formData.append('upload_preset', 'webify');
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData
            })
            const data = await res.json()
            console.log('data', data);
            // return data
            onSuccess(data.secure_url)
    
        } catch (err) {
            console.log(err);
        }
    }
  }
  
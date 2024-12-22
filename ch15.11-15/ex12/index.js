async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const accessToken = document.getElementById("accessToken").value;

    if (fileInput.files.length === 0) {
        alert("ファイルを選択してください");
        return;
    }

    const file = fileInput.files[0];
    const baseUrl = "https://graph.microsoft.com/v1.0/me/drive/root";
    const fileName = file.name;
    const uploadUrl = new URL(`${baseUrl}:/${fileName}:/content`)

    try {
        const responce = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-type": file.type,
            },
            body: file
        })
        if (!responce.ok) {
            alert((await response.json()).message);
            return
        }
        alert("アップロード成功！")
    } catch (error) {
        console.error(error.message);
        alert("アップロード失敗")
    }
}
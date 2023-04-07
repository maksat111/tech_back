const fs = require('fs');

const imageUpload = async (img_name, img_data) => {
    const randomNumber = Math.floor(Math.random() * 999999999999);
    const img_direction = `./uploads/` + randomNumber + `${img_name}`;
    await fs.writeFile(img_direction, img_data, function (err) {
        console.log(err)
    });
    return img_direction;
}

module.exports = imageUpload;
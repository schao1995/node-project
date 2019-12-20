const images = require("images");

function imageZoom (image) {
  let imageSize = images(image).size()
  console.log(imageSize)
  let width = imageSize.width
  let height = imageSize.height
  let zoomWidth = 0
  if (width >= height) {
    zoomWidth = 210
  } else {
    zoomWidth = (210 * width) / height
  }
  let renameImage = image.replace('.jpg', 'zoom.jpg')
  images(image)
    .size(zoomWidth)
    .save(renameImage, {
      quality : 100          // 保存图片到文件,图片质量为100
    });
}
module.exports = imageZoom
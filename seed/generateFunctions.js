const fs = require('fs');
const { Readable } = require('stream');


const { blocks, contenido } = require("./funciones/contenidoGenerar")
const relacion = require('./funciones/generarRelaciones')

function bufferToStream(buffer) {
  const newStream = new Readable();
  newStream.push(buffer);
  newStream.push(null);
  return newStream;
}


const capitalize = require("../funciones/herramientas/capitalize")
const slugify = require("../funciones/herramientas/slugify")
const faker = require("faker/locale/es_MX")


const name = (numMax,numMin) =>  capitalize(faker.random.words(
  Math.max(Math.ceil(Math.random()*numMax),numMin)
).toLowerCase())

const fecha = (min,max) => faker.date.between(min,max);

const parrafo = () => faker.lorem.paragraph()

const imagen = async () => {

    const filename = "test-"+Math.ceil(Math.random()*4)+".jpg"
    const fileType = filename.split('.')[1]
    const encodingRead = "utf8"
    const encoding = "7bit"
    const mimetype = fileType == 'png' ? 'image/png' : 'image/jpeg'
    const fileRead = await fs.readFileSync('./seed/imagenes/'+filename)
    const buffer = Buffer(fileRead)

    const file = { createReadStream: () => bufferToStream(buffer), filename, mimetype, encoding }

    return file

}

const video = () =>  `<iframe src="https://www.youtube.com/embed/C0DPdy98e4c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

const redes = (name) =>  ({
    facebook: `https://facebook.com/${slugify(name)}`,
    twitter: `https://twitter.com/${slugify(name)}`,
    instagram: `https://instagram.com/${slugify(name)}`,
})



module.exports = {
    imagen,
    parrafo,
    video,
    redes,
    blocks,
    contenido,
    name,
    fecha,
    relacion
}

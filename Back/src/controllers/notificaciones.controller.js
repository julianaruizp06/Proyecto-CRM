//CONTROLADOR PAR ENVIAT LOS CORREOS POR EMAIL
const nodemailer = require("nodemailer");

//VARIABLES ALEATORIAS DE  LA API DONDE ENVIAMOS EL CORREO
const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    }
});

//CONVERTIMOS EL ARCHIVO EN PDF PARA ENVIARLO COMO ARCHIVO ADJUNTO 
const sendCotizacion = async (req, res) => {
    const { html } = req.body;

    await transporter.sendMail({
        from: '"Fred Foo 👻" <cartera@juliana.com>',
        to: "notificacionERM@juliana.com",
        subject: "Cotizacion CRM SAS ✔",
        text: "REVISA LA FACTURA EN PDF",
        attachments: [{
            raw: 'Content-Type: text/html\r\n' +
                'Content-Disposition: attachment;\r\n' +
                '\r\n' +
                html
        }]
    });

    res.send('ok')
}

module.exports = {
    sendCotizacion
}

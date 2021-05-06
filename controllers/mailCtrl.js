const nodemailer = require('nodemailer'); // email sender function 

exports.sendEmail = function(req, res){

    const {correo, mensaje, curso} = req.body;

    destinatario = correo;
    contentHTML = `
        <table border="0" cellpadding="0" cellspacing="0" width="800px" background-color="#27323C;" bgcolor="#27323C">
        <tr height="200px">  
            <td bgcolor="#27323C" width="600px">
                <h1 style="color: #FFC312; text-align:center">Se te ha invitado al Curso ${curso}</h1>
                <p  style="color: #fff; text-align:center">
                    <span style="color: #e84393">${correo} </span> 
                    a la aplicación
                </p>
            </td>
        </tr>
        <tr bgcolor="#fff">
            <td style="text-align:center">
                <p style="color: #000">${mensaje}</p>
                <button type="button" class="btn btn-success" style="border: 4px solid rgba(0, 0, 0, 0.363); background-color: #28B463 ; border-radius: 150px; width: 200px; height: 50px;">Aceptar invitación</button>
            </td>
        </tr>
        </table>
    `

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'zamapruebas272@gmail.com',
            pass: 'Zamapruebas0309'
        }
    });

    const mailOptions = {
        from: 'Remitente',
        to: destinatario,
        subject: 'Asunto',
        html: contentHTML
    };
        
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
}

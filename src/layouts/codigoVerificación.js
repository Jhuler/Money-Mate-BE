import config from "../config.js"

const atentamente = 'Jhuler Aguirre'
const correo = 'jhuler.aguirre@gmail.com'
const whatsapp = '+51 987 076 972'
const derechos = `© 2024 ${config.app_name}, todos los derechos reservados.`

function setLayoutCodigoVerificacion(codigo) {
    return `
    <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

                *{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                    border: none;
                    outline: none;
                    color: #3C3C3B;
                    font-size: 15px;
                }

                section{
                    width: 100%;
                    background-color: whitesmoke;
                    padding: 1rem;
                }

                article{
                    background-color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin: 0 auto;
                    width: 35rem;
                }

                h1{
                    text-align: center;
                    font-size: 2rem;
                }

                footer{
                    text-align: center;
                    margin: 0 auto;
                    margin-top: 2rem;
                    width: 35rem;
                }

                footer p{
                    margin-top: 0.5rem;
                    font-size: 0.8rem;
                }

                .container-mensaje{
                    margin: 2rem 2rem 0 2rem;
                }

                .container-mensaje strong, .container-mensaje p{
                    font-size: 1.3rem;
                    word-spacing: 3px;
                    line-height: 1.5;
                }

                .container-codigo{
                    padding: 1.5rem 1rem;
                    border-radius: 1rem 0 1rem 0;
                    border: solid 0.06rem whitesmoke;
                    margin: 2rem 2rem;
                    text-align: center;
                }

                .container-codigo p{
                    color: #b6b6b6;
                }

                .codigo{
                    font-size: 3rem;
                    color: #1ED760;
                }

                .veri{
                    color: #1ED760;
                }
                
            </style>
        </head>

        <body>
            <section>
                <article>
                    <h1>${config.app_name}</h1>

                    <div class="container-mensaje">
                        <p>Estimado usuario:</p>
                        <p>Para seguir con tu solicitud, ingresa este
                            <br> <strong class="veri">código de verificación</strong> en la web.
                        </p>
                    </div>
            
                    <div class="container-codigo">
                        <p>Tu código de verificación es</p>
                        <strong class="codigo">${codigo}</strong>
                    </div>
                </article>

                <footer>
                    <p>Atentamente <br>${atentamente}</p>
                    
                    <p>
                        Comunicate con nosotros por los siguientes medios:
                        <br>Correo: ${correo}
                        <br>WhatsApp: ${whatsapp}
                    </p>

                    <p>${derechos}</p>
                </footer>
            </section>
        </body>
    </html>
    `
}

export default setLayoutCodigoVerificacion
const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { EVENTS } = require('@bot-whatsapp/bot')


const flowHola = addKeyword(['hola', 'buenas', 'que tal'])
    .addAnswer('Que tal')
    .addAnswer('En que puedo ayudarte');

const flowPrecio = addKeyword(['precio', 'consulta', 'control', 'control remoto'])
    .addAnswer('¿Podrías indicarnos la *Marca* y *Modelo del televisor* o enviarnos una Foto del Control?')
    .addAnswer('El *Modelos del Televisor* se encuentra en la etiqueta de atras del *Televisor*')

   
const flowModelo = addKeyword(EVENTS.MEDIA)
    .addAnswer('En unos minutos te Diremos el Precio', {delay: 120000})
    .addAnswer('¿Podemos ayudarte en algo más?', {delay: 30000})

const flowNegativo = addKeyword('si')
    .addAnswer('¿En que mas te auyudamos?')

const flowGracias = addKeyword(['gracias'])
    .addAnswer('*De nada*')


const flowUbicacion = addKeyword(['Dirección', 'Horarios','direccion', 'horario'])
    .addAnswer('Nuestra Dirección es *Perito Moreno 282*', {delay: 1000})
    .addAnswer('Nuestro Horario es *L a V de 9 a 13* -- *16:30 a 20* / *Sábados de 10 a 13:30*', {delay: 10000});


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowHola, flowPrecio, flowModelo, flowNegativo, flowGracias,flowUbicacion])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

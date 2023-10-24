# Curso API Rest con NodeJS

---

## Entorno Mongo

Para no tener necesidad de descargar mongo, se va a usar mongo atlas mediante la url:

https://www.mongodb.com/atlas/database

Mongo atlas es un servicio que ofrece capas gratuitas o pagas de servidores especializados en una base de datos no relacional.

Se puede inicar sesión con google, o registrándose con una cuenta de email.

Al lado de donde dice "atlas" hay un logo de unos edificios, estas son las organizaciones, y se verá si se tiene una organización por defecto o no, en caso de no tenerla darle click en ver todas las organizaciones y aparecerá un botón para crear una nueva organización, dejar el plan determinado y ponerle un nombre, siguiente, crear una organización.

Aparecerá el campo de proyectos vacío, se le da click en crear nuevo proyecto, allí colocar el nombre, siguiente, aparece de nuevo un campo para invitar a personas, en caso de que si agregar correo, de lo contrario, continuar, creará el proyecto

Aparece la parte donde se va a crear el cluster.

Darle click en contruir base de datos "build database", seleccionar el que dice gratis, dejar la configuración como viene por defecto, click en create y se creará el cluster.

Luego aparece una ventana donde pide usuario y contraseña, poner un usuario, posteriormente click en autogenerate secure password en caso de que no esté generada, esta clave guardarla en un bloc de notas, luego aparecerá un recuadro como este:

![Imagen del firewall](Imagenes%20del%20readme/Firewall.png)

Donde se pedirá las IPs que pueden conectarse a la base de datos, para este curso se dejará que cualquiera se conecte, para esto se pone 0.0.0.0/0, en descripción se le puede poner "cualquier IP". Posteriormente click en "Finish and close" y creará el usuario.

### Conectar la base de datos

Para esto se necesitará el URI.

Para esto entonces, se le dará click en connect, arrojará un menú como este:
![URI](Imagenes%20del%20readme/URI.png)

Seleccionar la opción del apartado "Connect to your application"

Seguir el paso 1 y 2 (el segundo es el npm install mongodb para ponerlo en la consola)

    npm install mongodb

El tercero arrojará una url similar a esta:

mongodb+srv://brianpadim:<password>@cluster0.iq1y6c3.mongodb.net/?retryWrites=true&w=majority

Reemplazar el apartado < password > por la clave que se copió previamente; para este ejemplo particular es: TFbe5bbPfgAEwVNQ, y después de mongodb.net/ se puede poner un nombre para la base de datos, así que la url quedaría de la siguiente manera:

mongodb+srv://brianpadim:TFbe5bbPfgAEwVNQ@cluster0.iq1y6c3.mongodb.net/dbapi?retryWrites=true&w=majority

Esa URL se guardará para ser usada en la estructura de la aplicación

---

### Iniciando el proyecto

en la consola ir al directorio sobre el cual se va a trabajar

Este directorio normalemte estará vacío, para crear un proyecto con node se le da el comando:

    npm init --y

Aquí creará un archivo llamado package.json y package-lock.json

Con esto se hará uso de npm para instalar las dependencias

**Dependencias:**
Poner al final de cada npm install --save, el save se usa para forzarla a que guarde en las dependencias.

    npm install express --save
    npm install cors --save
    npm install dotenv --save
    npm install multer --save
    npm install nodemon --save-dev

- **Express**: sirve para proporcionar herramientas y funciones para gestionar rutas, solicitudes HTTP, vistas y middleware

- **Cors**: Permite restringir solicitudes HTTP desde diferentes orígenes. Al instalar este paquete, se puede habilitar el acceso a recursos del servidor web desde diferentes dominios u orígenes

- **Dotenv**: Biblioteca utilizada para cargar variables de entorno desde un archivo '.env' en un proyecto.

- **Multer**: Se usa para gestionar la carga de archivos en aplicaciones web, especialmente útil para cargar cualquier tipo de contenido al servidor

- **Nodemon**: Herramienta usada para mejorar la eficiencia y la comodidad del proceso de desarrollo, detecta automáticamente cambios en los archivos y reinicia automáticamente la aplicación Node.js cuando se producen los cambios; en '-dev' que aparece después del --save es para indicarle que está siendo usado solo en el ambiente de desarrollo, mas no en el de producción.

Para instalar varias dependencias en un solo comando se hace así:

    npm i cors dotenv multer -S

Para verificar que las dependencias quedaron bien agregadas, simplemente ir a package.json y en "dependencies" se verán todas estas dependencias en su respectiva versión.

Para que el proyecto inicie con nodemon, ir a "package.json" en el apartado scripts y agregar esta línea:

    "start": "nodemon index.js"

**Creación del .gitignore**

Dale click en new, y crear el .gitignore para decirle que directorios o archivos específicos ignorar al momento de subir esto al repositorio.

El node_modules puede ir incluído en este archivo, porque es una buena práctica porque pesa y porque se vuelve a generar cuando se ejecuta npm install

---

### Ejercicio con express

Este ejercicio se hará para confirmar que todo esté instalado de forma correcta.

Crear un index.js y agregar este código:

    const express = require("express");
    const cors = require("cors");
    const app = express();

    app.use(cors());

    const port = 3000;

    app.listen(port,() =>{
        console.log('Tu app está lista por http://localhost: '+ port)

    })

La respuesta de este código por consola deberá ser esta:

Tu app está lista por http://localhost: 3000

Y estará bien ejecutada

---

### Variables de entorno

Es el archivo .env, entonces, en el directorio crear un archivo llamado .env.example, dentro de este archivo se declarará una palabra (variable de entorno) que se podrá usar en la aplicación, ejemplo:

    PORT = 3300

Y luego se crea un archivo llamado .env

Los archivos .env no se deben subir al repositorio, es una buena práctica hacer esto porque se almacenarán credenciales y puntos críticos para la seguridad de la aplicación

Para implementarlo en la app, se usa el paquete dotenv de la siguiente manera:

Al principio del código escribir la siguiente línea:

    require("dotenv").config()

Y donde se quieran usar las variables de entorno, simplemente se usa process.env.[variable de entorno], por ejemplo:

    const port = process.env.PORT || 3000;

---

## Scaffold

Es la estructura de carpetas que se van a usar en el proyecto.

En este caso se hará uso de un modelo vista-controlador (MVC)

Se crearán diferentes directorios (carpetas)

- **Models:** Hace referencia a los modelos
- **Controllers:** Hace referencia a los controladores
- **Routes:** Hace referencia a la vista de las rutas 
- **config:** Hace referencia a las diferentes configuraciones (conexión a la base de datos, o algún paquete de terceros)
- **Utils:** Aquí se almacenarán funciones conocidas como helpers, para cuando se tiene una tarea muy repetitiva 
- **storage:** Para almacenar cualquier tipo de archivos

---

### Instalación de la dependencia de mongoose 

Para empezar a trabajar con bases de datos no relacionales se requiere la dependencia de mongoose:

    npm install mongoose --save

Este paquete ayudará a gestionar la conexión a la base de datos con mongo

---

### Creación de la conexión

Se conectará con la base de datos creada en mongo atlas.

Dentro de la carpeta de config se creará un archivo llamando mongo.js

Declarar la constante de mongoose y requerir el paquete

    const mongoose = require("mongoose");

Después declarar una función llamada dbConnect y exportarla

Pasar la URI como una variable de entorno

Siempre declarar las variables en el .env.example para no olviarlas y luego al .env

    const mongoose = require("mongoose");

    const dbConnect = async () => {
        try{
            const DB_URI = process.env.DB_URI; 
            mongoose.connect(DB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,

            });

            console.log('**** Conexión establecida exitosamente ****')

        }catch (err){
            console.log('**** Error de conexión ****\n' + error)
        }

    }
    module.exports = dbConnect //IMPORTANTE: No exportarla como dbConnect() porque ejecutará el resultado antes de procesar el código

Luego invocar esta conexión desde el index.js

    const dbConnect = require('./config/mongo')

Posteriormente invocar esta función:

    dbConnect()

---

### Declaración de los modelos:

Siguiento el patrón MVC se declaran los modelos, estos hacen referencia a la estructura de el dato que existirá en la base de datos.

Se creará un modelo por cada una de las conexiones o tablas que se van a utilizar.

Para esto ir a la carpeta de modelos, allí crear una carpeta llamada nosql (mongo)

Dentro de esta carpeta se crearán los modelos de la base de datos no relacional.

**¿Que se necesita para declarar un modelo?**

Como estos primeros modelos irán relacionados a mongo y el gestor es mongoose, se incomporará a mongoose y también el esquema, el esquema es la estructura:

    const mongoose = require ("mongoose") 

    const Userschema = new mongoose.Schema({
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        role:{
            type:["user", "admin"],
            default: "user"
        }

    },
    {
        timestamps:true //marcas de tiempo(TODO createdAt, updatedAt)
        versionKey:false
    })

    //module.exports = mongoose.model("___", Userschema)
    //En los guiones bajos va el nombre de la colección (tabla) en este caso, users, así:

    module.exports = mongoose.model("users", Userschema)

Una vez hecho esto ya se tiene el modelo declarado, y se pueden declarar los modelos que se consideren pertinentes.

---

### Router

Se va a devolver un objeto o una propiedad en una estructura JSON, por eso esto es una API Rest que será consumida por un front end.

Las rutas son los puntos de acceso.

En la carpeta routes se pondrán las rutas, como hay 3 modelos, se crearán 3 rutas

Para manejar la ruta se usará express que es lo que se usa como el proveedor del servicio web y su propiedad router.

    const express = require ("express");
    const router = express.Router();//Función de express para manejar rutas

**Ruta con los diferentes métodos (GET, POST, DELETE y PUT):**

Lo primero que se debe hacer es crear un index.js en la carpeta de rutas. El index será el encargado de gestionar la carga dinámica, allí se requieren express, fs y la funcionalidad de express para manejar rutas (routes) (tener en cuenta que fs viene por defecto y no se tendrá que importar)

    const express = require ("express");
    const fs = require("fs")
    const router = express.Router();

Luego se consultará la ruta absoluta mediante este comando:

    const PATH_ROUTES=__dirname;

Posteriormente se van a remover las extensiones

    const removeExtension = (fileName)=>{
        return fileName.split('.').shift() //retorna [tracks,js]

    }

Con .shift() tomará solo el primer valor (es decir tracks), con esto se está extrayendo el nombre del archivo sin la extensión.

Luego se va a concatenar el nombre con una familia de rutas de la siguiente manera:

crear una lectura sincrónica con fs mediante la siguiente función:

    fs.readdirSync(PATH_ROUTES).filter((file)=>{
        const name = removeExtension(file)//Puede que llegue index o tracks
        if(name !== 'index'){
            router.use(`/${name}`, require(`./${file}`))//http://localhost:3300/api/ruta
        }

    })

La constante creada es name, allí podrán llegar 2 valores diferentes: index o tracks.

Luego en el if, se tiene que si el nombre NO es index, que use el nombre le conquetene / y le ponga el archivo.js con el que se trabaja

El código completo quedaría de la siguiente manera:

    const express = require ("express");
    const fs = require("fs")
    const router = express.Router();

    const PATH_ROUTES=__dirname;/**Constante de node que da la ruta absoluta el path donde se encuentra el archivo */

    const removeExtension = (fileName)=>{
        return fileName.split('.').shift(); //retorna [tracks,js]

    }

    fs.readdirSync(PATH_ROUTES).filter((file)=>{
        const name = removeExtension(file);//Puede que llegue index o tracks
        if(name !== 'index'){
            router.use(`/${name}`, require(`./${file}`));//http://localhost:3300/api/ruta
        }

    });

    module.exports=router;

Luego crear la ruta, por ejemplo se hará la de tracks, para ello, lo primero que se hará será crear dentro del fichero routes un archivo llamado tracks.js

Dentro de este archivo, se va a importar express y la función de rutas de express.

    const express = require ("express");
    const router = express.Router();

Luego se le proporcionará el método con el que se desea trabajar, en este caso con get, esto hace una función de callback como se verá en el siguiente ejemplo del código completo:

    const express = require ("express");
    const router = express.Router();//Función de express para manejar rutas

    //Todo es http://localhost/tracks con métodos GET, POST, DELETE, PUT
    router.get("/",(req, res)=>{
        
        const data = ["Hola", "mundo"];

        res.send({data})
    })

    module.exports = router

---

### Controladores

Será la parte que va a contener la lógica de la aplicación, es donde va a finalizar el usuario, donde se conectará a la base de datos.

Se recomienda tener un nombre apropiado para los métodos HTTP

Entonces, lo primero que se hará será ir a la carpeta de modelos y crear un archivo index.js, en este archivo se instanciarán los modelos creados de nosql:

    const models = {
        usersModel: require('./nosql/users'),
        tracksModel: require('./nosql/tracks'),
        storageModel: require('./nosql/storage'),
    }

    module.exports = models

Luego, en la carpeta de los controladores, crear un controlador para cada modelo que se creó, en este caso se pone de ejemplo a tracks

Aquí se importará desde los modelos tracksModel, creado anteriormente en el index de la carpeta models

    const { tracksModel } = require('../models')

Luego se van a crear los métodos get, post, put y delete: getItems, getItem, createItem, updateItem, deleteteItem y se exportará el módulo

Ejemplo del código:

    const { tracksModel } = require('../models')

    // Obtener lista de la base de datos
    const getItems= async (req,res)=>{
        const data = await tracksModel.find({})

        res.send({ data })
    };
    //Obtener un detalle
    const getItem=(req,res)=>{

    };
    // Crear un registro
    const createItem=async(req,res)=>{
        const body = req.body;
        console.log(body);
        const data = await tracksModel.create(body)
        res.send({data})
        
    };
    // Actualizar un registro
    const updateItem=(req,res)=>{

    };
    // Eliminar un registro
    const deleteteItem=(req,res)=>{

    };

    module.exports={ getItems,getItem,createItem,updateItem,deleteteItem }

Luego en el archivo de las rutas se modifica lo antes creado para que quede de esta forma: 

    const express = require ("express");
    const router = express.Router();//Función de express para manejar rutas
    const { getItems,getItem,createItem } = require("../controllers/tracks")
    //Todo es http://localhost/tracks con métodos GET, POST, DELETE, PUT
    router.get("/", getItems);
    router.post("/", createItem);

    module.exports = router

Y para que el index.js reconozca los cambios que se hacen, se agrega la siguiente línea debajo de donde se invoca al cors:

    app.use(express.json())

Para que trabaje con objetos JSON mediante express

---

### Cargar archivos

Lo primero que se necesita es una dependencia llamada multer (previamente instalada).

Multer funciona como una especie de middleware entre la ruta y el controlador.

Primero se hará por parte de la ruta y luego se abstraerá el funcionamiento hacia el controlador.

Lo primero entonces es crear una ruta llamada storage.js

Dentro de este archivo se importará multer, express y la propiedad de express llamada router.

    const multer = require ("multer");
    const express = require ("express");
    const router = express.Router();

Luego, lo primero que se hace es decirle a multer que haga uso del método disco de almacenamiento (diskStorage) como objeto, allí irán 2 funciones:
- Destination: Es donde se guardarán los archivos, recibe como parámetros request, file y una función callback (cb).
En la función de callback recibe 2 argumentos: el primero es un error (si existe) y como segundo argumento un string que hace relación al destination (ubicación donde se guardará el archivo)

- Filename: Es el nombre como quedarán guardados los archivos.
Acepta los mismos argumentos que destination; acepta diferentes estrategias de almacenamiento, dependiendo de la utilidad de almacenamiento, si se puede sobreescribir el mismo archivo, o si se pueden ir generando nombres aleatoriamente para que nunca se pueda sobreescribir un archivo (para este ejemplo se hará uso de la segunda estrategia). 

Lo primero que hará, será extraer la extensión del archivo (mp3, png, jpg, pdf, etc...)

Luego se le dará un nombre al archivo de la forma file -[fecha en formato unix].extensión.

El código quedaría de la siguiente manera:

    const storage = multer.diskStorage({
        destination:function(req, file, cb){
            // La ruta de almacenamiento es este directorio, retrocede una carpeta y que lo guarde en la carpeta storage
            const pathStorage = `${__dirname}/../storage`;
            cb(null, pathStorage)

        },filename:function(req, file, cb){
            /**Los archivos tienen una extensión, lo primero que se hará es sacarla */
            const ext = file.originalname.split(".").pop()//Devuelve ["name","extensión"], .pop() para coger el último valor
            const filename = `file-${Date.now()}.${ext}` //Devuelve la marca de tiempo actual en formato unix 
            
            cb(null,filename)

        }

    })

Luego se creará un middleware, que hace el papel de checkpoint, el cual va a indicar el archivo que se va a subir al servidor, para luego hacer uso de este en el método post.

    // Uso del middleware
    const uploadMiddleware = multer({
        storage:storage

    })

    // Método post
    router.post("/",uploadMiddleware.single("myfile"),(req,res)=>{
        res.send({a:1});


    });

Tener en cuenta que cuando se meciona el método post, "myfile" es la llave con la que se guarda desde postman

El código completo quedaría de la siguiente manera;

    const multer = require ("multer");
    const express = require ("express");
    const router = express.Router();
    /**
    * Primero decirle a multer que haga uso del método disco de almacenamiento, donde se le pasará una
    * configuración como objeto.
    * 
    * Dentro de diskStorage (disco de almacenamiento) irán 2 funciones: destination y filename
    * 
    * - Destination recibe como parámetros request, file, una función callback
    */

    const storage = multer.diskStorage({
        destination:function(req, file, cb){
            // La ruta de almacenamiento es este directorio, retrocede una carpeta y que lo guarde en la carpeta storage
            const pathStorage = `${__dirname}/../storage`;
            cb(null, pathStorage)

        },filename:function(req, file, cb){
            /**Los archivos tienen una extensión, lo primero que se hará es sacarla */
            const ext = file.originalname.split(".").pop()//Devuelve ["name","extensión"], .pop() para coger el último valor
            const filename = `file-${Date.now()}.${ext}` //Devuelve la marca de tiempo actual en formato unix 
            
            cb(null,filename)

        }

    })

    // Uso del middleware
    const uploadMiddleware = multer({
        storage:storage

    })

    // Método post
    router.post("/",uploadMiddleware.single("myfile"),(req,res)=>{
        res.send({a:1});


    });

    module.exports = router;

Ahora se procede a abstraer el código para que la ruta no esté combinada con esta utilidad.

Entonces, en la carpeta de utils, que es donde van los helpers, se crea un nuevo archivo llamado handleStorage.js

Dentro de handle storage se hará lo siguiente:

Primero cortar desde la constante storage hasta la creación del middleware y pegarla aquí, al igual que la importación del multer y exportar el uploadMiddleware para poderlo usar en storage.

Finalmente, se va a extraer todo el controlador y se llevará a un controlador de almacenamiento.

Entonces, se puede duplicar el controlador ya creado de tracks y se hacen las siguientes modificaciones:

Primero que todo se cambia la constante a storageModel, en getItems se cambia el modelo y quedaría así:

    const { storageModel } = require('../models')

    // Obtener lista de la base de datos
    const getItems= async (req,res)=>{
        const data = await storageModel.find({})

        res.send({ data })
    };
    //Obtener un detalle
    const getItem=(req,res)=>{

    };
    // Crear un registro
    const createItem=async(req,res)=>{
        const body = req.body;
        console.log(body);
        const data = await storageModel.create(body)
        res.send({data})

    };
    // Actualizar un registro
    const updateItem=(req,res)=>{

    };
    // Eliminar un registro
    const deleteteItem=(req,res)=>{

    };

    module.exports={ getItems,getItem,createItem,updateItem,deleteteItem }

Posteriormente copiar el nombre de create item e ir a las rutas de storage, importar el controlador de create item y en el método post, poner esto: ", createItem" (sin comillas); quedaría de la siguiente manera:

    const { createItem } = require ("../controllers/storage")
    router.post("/",uploadMiddleware.single("myfile"), createItem);

Luego, como lo que quiero es guardar un registro en la base de datos, entonces se abrirá el modelo declarado para storage.

Antes modificar el controlador de storage, necesito ir a index.js para que tenga en cuenta una configuración de datos públicos y agrego este código: 

    app.use(express.static("storage"))

Para que los saque de la carpeta llamada storage; para poner la prueba se puede ir al navegador y poner:
http://localhost:3300/[nombre del archivo].[extension ]

mostrará el archivo con el que se está trabajando.

Luego en .env y .env.example poner en public url de la siguiente manera:

    PUBLIC_URL = HTTP://localhost:3300 (aquí se puede configurar de acuerdo al subdominio o al dominio)

Luego ir al controlador de create item para el storage, y agregarle la url = 

Así el código final del handleStorage, el controller del storage, la ruta de storage y el archivo .env quedaría de la siguiente manera:
**HandleStorage:**

    const multer = require ("multer");

    /**
    * Primero decirle a multer que haga uso del método disco de almacenamiento, donde se le pasará una
    * configuración como objeto.
    * 
    * Dentro de diskStorage (disco de almacenamiento) irán 2 funciones: destination y filename
    * 
    * - Destination recibe como parámetros request, file, una función callback
    */

    const storage = multer.diskStorage({
        destination:function(req, file, cb){
            // La ruta de almacenamiento es este directorio, retrocede una carpeta y que lo guarde en la carpeta storage
            const pathStorage = `${__dirname}/../storage`;
            cb(null, pathStorage)

        },filename:function(req, file, cb){
            /**Los archivos tienen una extensión, lo primero que se hará es sacarla */
            const ext = file.originalname.split(".").pop()//Devuelve ["name","extensión"], .pop() para coger el último valor
            const filename = `file-${Date.now()}.${ext}` //Devuelve la marca de tiempo actual en formato unix 
            
            cb(null,filename)

        }

    })

    // Uso del middleware
    const uploadMiddleware = multer({
        storage:storage

    })

    module.exports = uploadMiddleware;

**Controller de storage:**
    
    const { storageModel } = require('../models')
    const PUBLIC_URL = process.env.PUBLIC_URL;

    // Obtener lista de la base de datos
    const getItems= async (req,res)=>{
        const data = await storageModel.find({})

        res.send({ data })
    };
    //Obtener un detalle
    const getItem=(req,res)=>{

    };
    // Crear un registro
    const createItem=async(req,res)=>{
        const { body, file } = req;
        console.log(file);
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})

    };
    // Actualizar un registro
    const updateItem=(req,res)=>{

    };
    // Eliminar un registro
    const deleteteItem=(req,res)=>{

    };

    module.exports={ getItems,getItem,createItem,updateItem,deleteteItem }

**Ruta de storage:**
    const uploadMiddleware = require("../utils/handleStorage")
    const express = require ("express");
    const { createItem } = require ("../controllers/storage")
    const router = express.Router();

    // Método post
    router.post("/",uploadMiddleware.single("myfile"), createItem);

    module.exports = router;

**Archivo .env:**

    PORT = 3300
    DB_URI = mongodb+srv://brianpadim:TFbe5bbPfgAEwVNQ@cluster0.iq1y6c3.mongodb.net/dbapi?retryWrites=true&w=majority
    PUBLIC_URL = HTTP://localhost:3300


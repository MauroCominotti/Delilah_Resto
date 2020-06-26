# DelilahResto
enlace a gitHub: https://github.com/MauroCominotti
enlace a Heroku para probarlo: https://dellilah-resto-api-rest.herokuapp.com/

##  ENDPOINTS 
### Para los Usuarios:
1. Loguearse               -> users/logIn (post)
   - datos: (username, password)
2. Registrarse             -> users/signIn (post)
   - datos: (username, name, address, email, phone, password)
3. Listar Usuario          -> users/:id (get) - con permisos de administrador (token) - 
4. Agregar administrador   -> users/admin (post) - con permisos de administrador (token) - 
   - datos: (username, name, address, email, phone, password) 
5. Eliminar usuario        -> users/delete/:id (delete) - con permisos de administrador (token) - 
   - datos: (id) 
6. Inicializar tablas      -> users/populateTables (get)

### Para los Productos:
1. Listar productos        -> products/ (get) - con permisos de administrador o de usuario (token) -
2. Agregar producto        -> products/ (post) - con permisos de administrador (token) -
   - datos: (name, description, price, img)
3. Listar producto         -> products/:id (get) - con permisos de administrador (token) -
4. Editar producto         -> products/:id (put) - con permisos de administrador o de usuario (token) -
   - datos: (name, description, price, img)
5. Eliminar producto       -> products/:id (delete) - con permisos de administrador (token) -

### Para las Ordenes:
1. Listar ordenes          -> orders/ (get) - con permisos de administrador (token) -
2. Agregar orden           -> orders/ (post) - con permisos de usuario (token) -
   - datos: (userId, state, paymentMethod, price, products:[{id, cuantity}, {id, cuantity}, {}...])
3. Listar orden            -> orders/:id (get) - con permisos de usuario (token) -
   - datos: (req.userAuthenticated -generado al loguearse-)
4. Editar orden            -> orders/:id (put) - con permisos de administrador (token) -
   - datos: (state -solo se edita el estado de la orden-)
5. Eliminar orden          -> orders/:id (delete) - con permisos de administrador (token) -

## TABLAS
### Las tablas generadas son 4: users, products, orders y carts.
- users almacena los valores de los usuarios registrados:\
    id (integer)\
    username (string)\
    name (string)\
    email (string)\
    address (string)\
    phone (integer)\
    type (enum: ['admin', 'user'])\
    password (string)\

- products almacena los valores de los productos registrados:\
    id (integer)\
    name (string)\
    description (string)\
    price (integer)\
    img (string)\

- orders almacena los valores de las ordenes registradas:\
    id (integer)\
    state (enum: ['entregado', 'enviando', 'preparando', 'confirmado', 'nuevo', 'cancelado'])\
    paymentMethod (enum: ['efectivo', 'debito', 'credito'])\
    price (integer)\
    userId (integer)\

- carts almacena los valores del carrito del usuario, para poder almacenar la cantidad de productos que eligó, ya que no se puede almacenar un array de productos y su respectiva cantidad en la tabla orders en la base de datos MySql:\
    id (integer)\
    orderId (integer)\
    productId (integer)\
    productCuantity (integer)\

### IMPORTANTE!!
Para crear una nueva orden se debe tener permiso de usuario y enviar los datos de la orden a guardar MÁS los datos del carrito del cliente:
-   userId (integer)
-   state (enum: ['entregado', 'enviando', 'preparando', 'confirmado', 'nuevo', 'cancelado'])
-   paymentMethod (enum: ['efectivo', 'debito', 'credito'])\
-   price (integer)
-   array de productos seleccionados por el cliente products: [{ productId (integer), productCuantity (integer) }, {}, {}]\

### EJEMPLO=
```
{
	"state":"preparando",
	"paymentMethod":"debito",
	"price": 999,
	"userId": 1,
	"products": [{
		"id": 3,
		"cuantity": 2
	},
	{
		"id": 4,
		"cuantity": 1
	}]
}
```

##  DESARROLLO 
1. Se debe conectar la aplicacion a una base de datos, para eso se debe cambiar el archivo src/database/dataConnection
2. Ejecutar 'npm run dev' en la consola.
3. Luego ingresar a la dirección (con un GET) a http://localhost:3000/users/populateTables  
4. Se habrá creado un usuario administrador por defecto, con username='admin' y contraseña='admin123'.
5. A partir de este administrador se pueden agregar nuevos administradores y hacer operaciones que requieran los permisos (de administrador y consecuente token) pertinentes.
6. Para todos los endpoints (salvo para loguearse, registrarse o inicializar las tablas) se requiere que el usuario genere un token, por lo cual se debe obtener el token logueandose, es decir haciendo un POST a 'users/logIn' ingresando el username o email y la contraseña.

##  PRODUCCION 
Es recomendable hacerlo con migraciones, en /migrations están los modelos a realizar, seguir los siguientes pasos:
1. Se debe conectar la aplicacion a una base de datos, para eso se debe cambiar el archivo src/database/dataConnection
2. Cambiar config/config.json con los datos correctos, y copiar los modelos de /migrations a las nuevas migraciones que se generarán a continuación, al copiar en la consola las siguientes instrucciones:
```
npx sequelize-cli init

npx sequelize migration:create --name create_users_table
npx sequelize migration:create --name create_products_table
npx sequelize migration:create --name create_orders_table  
npx sequelize migration:create --name create_carts_table  

npx sequelize db:migrate:undo:all
npx sequelize db:migrate
```
3. Ejecutar 'npm run start' en la consola
4. Luego llenar las tablas ingresando a la dirección (con un GET) http://localhost:3000/users/populateTables  
5. Se habrá creado un usuario administrador por defecto, con username='admin' y contraseña='admin123'.
6. A partir de este administrador se pueden agregar nuevos administradores y hacer operaciones que requieran los permisos (de administrador y consecuente token) pertinentes.
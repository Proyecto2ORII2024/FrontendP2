
# Front Proyecto 2
## Configuración de directorios
```
proyecto2_front
├─ 📁public
│  └─ 📄vite.svg
├─ 📁src
│  ├─ 📁assets
│  │  └─ 📄react.svg
│  ├─ 📁components
│  │  └─ 📁borrarComponent
│  │     └─ 📄BorrarComponent.jsx
│  ├─ 📁context
│  │  └─ 📄BorrarContext.jsx
│  ├─ 📁pages
│  │  └─ 📁borrarPage
│  │     └─ 📄BorrarPages.jsx
│  ├─ 📁routes
│  │  └─ 📄BorrarRoute.jsx
│  ├─ 📁services
│  │  └─ 📄Borrar.service.js
│  ├─ 📁utils
│  │  └─ 📄Borrar.js
│  ├─ 📄App.css
│  ├─ 📄App.jsx
│  ├─ 📄index.css
│  └─ 📄main.jsx
├─ 📄.gitignore
├─ 📄eslint.config.js
├─ 📄index.html
├─ 📄package-lock.json
├─ 📄package.json
├─ 📄README.md
└─ 📄vite.config.js
```
## Reglas Generales 
- usar camelcase para el nombrado de las carpetas dentro de components y pages
- usar pascal case (ejemplo : ArrozPapa) para los archivos JSX
- para los js se puede usar camelcase (ejemplo : arrozPapa)
## Descripcion Carpetas
### components
aqui van los componentes aquellos que se pueden reutilizar en las paginas y seperados en carpetas
dentro cada una puede ir el componente(jsx), y si es necesario su parte de javascript y css.
### pages
aqui van las paginas que reunen los componentes.
### context
Permiten compartir datos de manera global entre los componentes de la aplicación.
### routes
Almacena la configuración de las rutas de la aplicación. Aquí se definen las rutas y se asocian con los componentes de página correspondientes.
### services
Contiene archivos que manejan la lógica de negocio y la interacción con APIs externas.
### utils 
Incluye funciones utilitarias que son reutilizadas en diferentes partes de la aplicación. Estas funciones suelen ser pequeñas, generales y no dependen de componentes específicos.


## Instalaciones
```bash
git clone https://github.com/JoseENarvaezM/FrontendP2.git
```
```bash
cd proyecto2_front
```
**PARA INSTALAR DEPENDENCIAS**
```bash
npm i
```
**PARA ARRANCAR**
```bash
npm run dev
```
**PARA CREAR BRANCH**
```bash
git branch -M nombre_branch
```
**PARA CAMBIAR DE BRANCH**
```bash
git checkout nombre_branch
```
**PARA SUBIR**
```bash
git add . 
git commit -m "Contexto de lo que se sube"  
git push -u origin nombre_branch
```
**PARA EXTRAER DATOS**
```bash
git pull origin nombre_branch
```

-Hola 
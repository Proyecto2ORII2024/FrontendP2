function InsideFooter() {
  return (
    <footer className="flex flex-col w-full items-center justify-center">
      <div className="w-full md:w-[80%] h-[1px] bg-grays"></div>
      <section className="w-full md:w-[70%] flex justify-center my-2 flex-col items-center text-grays-dark">
        <p className="text-center">2024    |    Sistema de Gestion de movilididad ORII    |    Vicerrectoría </p> 
        <p className="text-center">División de Tecnologias de la información y las comunicaciones    |    versión 1.0.0</p>
      </section>
    </footer>
  );
}

export default InsideFooter;
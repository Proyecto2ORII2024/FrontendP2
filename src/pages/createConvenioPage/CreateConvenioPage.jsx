function CreateConvenioPage() {
  return (
    <>
      <main>
        <h2 className="w-full mt-5 p-5 text-lg text-center">
          A continuación podrá crear un convenio, por favor verifique que la
          información ingresada es correcta e ingrese todos los campos.
        </h2>

        <section className="w-full flex items-center flex-col">
          <form>
            <section>
              <label className="">
                Pais
                <input type="text" placeholder="Pais" />
              </label>
              <label htmlFor="">
                Codigo
                <input type="text" placeholder="Codigo" />{" "}
              </label>
            </section>
            <section>
            <label className="">Institución
            <input type="text" placeholder="Institución" />
            </label>
            </section>
            <label htmlFor="">Descripción</label>
            <textarea placeholder="Descripción..." />
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateConvenioPage;

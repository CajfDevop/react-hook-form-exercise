import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("Enviado datos...");

    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre es requerido",
          },
          minLength: {
            value: 2,
            message: "El nombre debe ser mayor a 2 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El nombre debe ser menor a 20 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="correo">Email</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo es requerido",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "El correo no es valido",
          },
        })}
      />
      {errors.correo && <span>{errors.correo.message}</span>}

      <label htmlFor="contraseña">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password es requerido",
          },
          minLength: {
            value: 6,
            message: "El password debe ser mayor a 6 caracteres",
          },
          maxLength: {
            value: 20,
            message: "El password debe ser menor a 20 caracteres",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <label htmlFor="confirmarContraseña">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar password es requerido",
          },
          validate: (value) => {
            if (watch("password") !== value) {
              return "Las passwords no coinciden";
            } else {
              return true;
            }
          },
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}

      <label htmlFor="fechaDeNacimiento">Fecha de Nacimiento</label>
      <input
        type="date"
        {...register("fechaDeNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento es requerida",
          },
          validate: (value) => {
            const fechaDeNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaDeNacimiento.getFullYear();

            return edad >= 18 || "Debe ser mayor de 18 años";
          },
        })}
      />
      {errors.fechaDeNacimiento && (
        <span>{errors.fechaDeNacimiento.message}</span>
      )}

      <label htmlFor="pais">País</label>
      <select {...register("pais")}>
        <option value="co">Colombia</option>
        <option value="pe">Peru</option>
        <option value="cl">Chile</option>
        <option value="ar">Argentina</option>
      </select>
      {watch("pais") === "co" && (
        <>
          <input
            type="text"
            placeholder="Municipio"
            {...register("municipio", {
              required: {
                value: true,
                message: "Municipio es requerido",
              },
            })}
          />
          {errors.municipio && <span>{errors.municipio.message}</span>}
        </>
      )}

      <label htmlFor="foto">Foto de perfil</label>
      <input
        type="file"
        onChange={(e) => setValue("foto_del_usuario", e.target.files[0].name)}
      />

      <label htmlFor="terminos">Acepto los términos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los términos y condiciones",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}

      <button type="submit">Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}

export default App;

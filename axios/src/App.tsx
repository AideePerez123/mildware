
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import './App.css'
import axios from 'axios';

type Login = {
  email: string;
  contrasena: string;
}

function App() {

  const {register, handleSubmit, formState: { errors, isSubmitting }} = 
    useForm<Login>({mode: 'onSubmit', defaultValues: {contrasena: 'abcd'}});

  const guardarProducto = async (data: Login) => {
    console.log(data);
    return new Promise(resolve => setTimeout(resolve, 10000));
  }

  return (
    <>
      <form onSubmit={handleSubmit(guardarProducto)}>
        <div className="flex flex-col">
          <input type="text" className="p-2 bg-white border border-gray-400 rounded-lg" {...register('email', {required: 'el correo es obligatorio'})} placeholder="Email" />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <input type="text" className="p-2 bg-white border border-gray-400 rounded-lg"{...register('contrasena', {required: 'la contraseña es obligatoria'})} placeholder="Contraseña" />
          {errors.contrasena && <span>{errors.contrasena.message}</span>}
        </div>
        <button className={`p-2 ${isSubmitting ? 'bg-blue-100': 'bg-blue-500'}  text-white rounded-lg`} disabled={isSubmitting} type="submit">Guardar</button>
      </form>
    </>
  )
}

export default App

import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");

  //fiz um useState e dentro inseri uma lista atraves do Array 
  const [tasks, setTasks] = useState([
    "Tomar café",
    "Estudar de manhã",
    "Trabalhar de manhã",
    "Almoçar",
    "Trabalhar de tarde",
    "Estudar de noite",
    "Fazer duas pedras +11",
  ]);

  const [editTask, setEditTask] = useState({
    enabled: false,
    tasks: "",
  });

  function handleRegister() {
    if(!input){
        alert("Preencha o nome da sua tarefa!")
        return;
    }
    if(editTask.enabled){
        handleSaveEdit();
        return;
    }
    setTasks(tarefas => [...tarefas, input])
    setInput("")
  }
  function handleSaveEdit(){
    
    const findIndexTask = tasks.findIndex
    (task => task === editTask.tasks)
    const allTasks = [...tasks]

    allTasks[findIndexTask] = input
    setTasks(allTasks)

    setEditTask({
        enabled:false,
        tasks: ''
    })

    setInput("")
  }
  function handleDelete(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }
  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
        enabled:true,
        tasks: item
    })
  }
  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder="Digite suas tarefas"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleRegister}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
      <hr />

      {/*para chama o JS precisa abrir chaves e colocar a nossa função dentro, porem como ela é uma lista a gente coloca tasks.map que que é pra acessar a propriedade map dentro da função tasks, como o map esta percorrendo toda nossa lista eu posso o item e a posição dele (index) e aponto com uma arrow function para ser exibido na tela*/}
      {tasks.map((item, index) => (
        //o item é o valor e o index a posição

        <section key={item}>

          {/* agora no span ele vai exibir na tela os itens do nosso array */}
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}

// {tasks.map((item, index) => (
//   <section>
//     <span>{item}</span>
//   </section>
// ))}

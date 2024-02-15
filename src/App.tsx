import { useState } from "react";

export default function App() {

  //state criado para adicionar mais itens na nossa lista
  const [input, setInput] = useState("");

  //fiz um useState e dentro inseri uma lista atraves do Array [ ]
  const [tasks, setTasks] = useState([
    "Tomar café",
    "Estudar de manhã",
    "Trabalhar de manhã",
    "Almoçar",
    "Trabalhar de tarde",
    "Estudar de noite",
    "Fazer duas pedras +11",
  ]);

  //state para editar informações da tabela e ele sera um objeto { }
  const [editTask, setEditTask] = useState({
    enabled: false, //ele vai ter essa propriade para sabermos se estamos editando ou não
    tasks: "", 
  });

    //função criada para registrar uma tarefa, se o seu input não estiver nada lá dentro aparecera uma janela com "preencha sua tarefa"
  function handleRegister() {
    if(!input){
        alert("Preencha o nome da sua tarefa!")
        return;
    } 

    // ele esta fazendo com o que tarefa mude ao inves de adicionar uma nova
    if(editTask.enabled){
        handleSaveEdit();
        return;
    }

    //para eu pode jogar a tarefa nova junto: declarei um parametro e apontei com arrowfunction para o array e com os 3 pontos estou copiando o que tem lá dentro e adicionando ao novo elemento input
    setTasks(tarefas => [...tarefas, input])

    //função simples, ela faz com que a caixa de texto fique sem nada toda vez que você envia uma informação.
    setInput("")
  }

  // função criada para salvar as alterações da lista
  function handleSaveEdit(){
    //esse finderIndexTask ele esta percorrendo a minha lista e fazendo comparação de item por item e se for igual, ele realiza a alteração e salva
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

  //função criada para deleter itens dentro da lista, declarando o parametro item e sua tipagem sendo string
  function handleDelete(item: string) {
    //criei uma constante e estou atribuindo ela tasks e fazendo percorrer dentro da nossa e devolver pra gente com base na restrição criada
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }

  //função criar para editar os itens da lista, declarando o parametro item e fazendo sua typagem 
  function handleEdit(item: string) {
    setInput(item)

    //diferente lá de cima que estava false, ele esta passando true que é pra editar a tarefa e a propriedade tasks esta com item que foi clicado 
    setEditTask({
        enabled:true,
        tasks: item
    })
  }
  return (
    <div>
      <h1>Lista de tarefas</h1>

      {/* esse input servira para adicionar mais tarefas as sua lista */}
      <input
        placeholder="Digite suas tarefas"

        //o valor do nosso input sera que vai estar armazenado dentro da nossa state criada para adicionar
        value={input}
        //a função é um evento que que é acionado sempre que o valor do elemento HTML é alterado pelo usuario e nesse caso, tudo que for digitado dentro desse input é jogado no setInput 
        onChange={(e) => setInput(e.target.value)}
      />

      {/* esse botão servirá para adicionar OU alterar a tarefa com a função 'handleRegister' e possui uma condição: se editTask for diferente de true. mude o botão para atualizar a terefa, caso contrario ele ficar com adicionar tarefa */}
      <button onClick={handleRegister}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
      <hr />

      {/*para chama o JS precisa abrir chaves e colocar a nossa função dentro, porem como ela é uma lista a gente coloca tasks.map que que é pra acessar a propriedade map dentro da função tasks, como o map esta percorrendo toda nossa lista eu posso o item e a posição dele (index) e aponto com uma arrow function para ser exibido na tela*/}
      {tasks.map((item, index) => (
        //o item é o valor e o index a posição

        //o react precisa de uma key para cada item da sua lista, o react PRECISA DISSOOOO
        <section key={item}>

          {/* agora no span ele vai exibir na tela os itens do nosso array */}
          <span>{item}</span>
          {/* Botão para editar a tarefa */}
          <button onClick={() => handleEdit(item)}>Editar</button>

          {/* botão para exluir o item dentro da lista */}
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

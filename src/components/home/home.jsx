import React from 'react'
import "./home.css"
import ListStudent from '../student/list-student'
import FormStudent from '../student/new-student'
import StudentModel from './../../models/student';
import axios from '../../utils/axios';





class Home extends React.Component {
    constructor(){

        // call the constructor of the parent class Reast.component
        super();
        // data
        this.state = {
            nom:"",
            pren:"",
            email:"",
            avatar:"",
            updateStudent_id:-1,
            list_student_data:[],
            textBtnState:"Add Student",
            iconBtnState:"fas fa-plus-circle",
            action:"ADD"
        };
        console.log(this.state);
    }

    render(){
    return (
        <>
            <h1 className="text-center text-white mt-5">
                🧑‍🎓 LMS-APP : <span className="text-warning">Home</span> 🏠
            </h1>
            <div className="container-fluid d-flex p-4">

                {/* new student */}
                <FormStudent 
                textBtn={this.state.textBtnState}
                iconBtn={this.state.iconBtnState}
                avatar={this.state.avatar}
                nom={this.state.nom}
                pren={this.state.pren}
                email={this.state.email}
                action={this.state.action}

                handleChange = {this.handleChange}
                handleAddSubmit = {this.addStudent}
                handleEditSubmit = {this.submitEditStudent}
                />

                {/* list of students */}
               <ListStudent 
               dataList={this.state.list_student_data}
               handleDeleteFromHome={this.deleteStudent}
               handleEditFromHome={this.editStudent}
               />
            </div>
        </>
    );
   }


    handleChange = (event) =>{
    let valueInput = event.target.value;
    let nameInput = event.target.name;
    this.setState({
       [nameInput]:valueInput
    })
    console.log(valueInput,nameInput)
}
    addStudent = (event) => {  
     
    // pour ne pas acctualiser la page
       event.preventDefault();

    // validation du formulaire

    if(
        this.state.nom=="" ||
        this.state.pren=="" ||
        this.state.avatar=="" ||
        this.state.email=="" 
        ) {
            alert("Veullier remplir toutes les champs du formulaire")
        } else {
            // creer un objet de type student
            let nStudent = new StudentModel(
                0,
                this.state.nom,
                this.state.pren,
                this.state.email,
                this.state.avatar,
                false
                );

                //Vider les states
                this.setState({
                    nom:"",
                    pren:"",
                    email:"",
                    avatar:""
                })

                // Vider les inputs de formulaire
                event.target.reset();
               
                // ajouter student aà la liste
                let newStudentList =  this.state.list_student_data;


                newStudentList.push(nStudent);
                this.setState(
                    {
                    list_student_data:newStudentList
                    }
                );
                
                // ajouter l'etudiant à la partie serveur (firebas) en utilisant axios

                const data_student = {
                    nom:nStudent.nom,
                    pren:nStudent.pren,
                    email:nStudent.email,
                    avatar:nStudent.avatar,
                    ispresent:nStudent.isPresence
                }
                axios.post("student.json",data_student).then((response)=>{

                    let id_new_student = response.data.name;
                    
                    //chercher l'etudiant qui l'id == 0 sur la liste
                    let newListStudent = this.state.list_student_data;
                    newListStudent.forEach(s=>{
                        if(s.id==0){ s.id = id_new_student;}
                    });

                    this.setState({list_student_data:newListStudent})
                });
        }
   };

   // récuperer la liste des eutdiant onload  depuis firebase
   componentDidMount(){
       axios.get("student.json").then((response)=>{
            if (response.data != null){
                //extraire toutes les clés de l'objet data
        let keys = Object.keys(response.data);

        //parcourir les keys
        let listEtudiant = keys.map(k=>{
            let ns = new StudentModel(
                k,
                response.data[k].nom,
                response.data[k].pren,
                response.data[k].email,
                response.data[k].avatar,
                response.data[k].isPresence,
            );        
            return ns;
        });

        //ajouter la liste 
        this.setState({list_student_data:listEtudiant})

            }
       })
   } 

   //------- handle delete
   deleteStudent = (idStudent) => {
    let choice = window.confirm("Are you sure ?");
    if (choice == true) {
      //supprimer un etudiant depuis firebase
      axios.delete("students/" + idStudent + ".json").then(() => {
        let newList = this.state.list_student_data.filter(
          (s) => s.id != idStudent
        );
        this.setState({ list_student_data: newList });
      });
    }
};

    //---editStudent lorsque qu'on click sur btn update icon 
    editStudent = (updateStudent) => {

        // change le text du button newStudent
        this.setState({textBtnState:"Edit Student"})

        //chnager l'icon du button newStudent
        this.setState({iconBtnState:"fas fa-edit"})

        //ajouter les information du state
        this.setState({
            nom:updateStudent.nom,
            pren:updateStudent.pren,
            email:updateStudent.email,
            avatar:updateStudent.avatar,
            updateStudent_id:updateStudent.id
        })

        //changer l'action du state
        this.setState({action:"EDIT"})

        console.log(updateStudent)
    }

    //---submitEditStudent la fonction qui va changer l'etudiant depuis firebase
    submitEditStudent=(event)=>{
        // pour ne pas acctualiser la page
        event.preventDefault();

        // data a envoyer vers firebase
        const student_data={
            nom:this.state.nom,
            pren:this.state.pren,
            email:this.state.email,
            avatar:this.state.avatar,
        }
        // appel à la fonction put de axios
        axios.put("student/"+this.state.updateStudent_id+".json",student_data).then((response)=>{
            console.log(response);

            //changer l'etudiant dans la liste
            let newList = this.state.list_student_data;
            newList.forEach((s)=>{
                if(s.id==this.state.updateStudent_id){
                    s.nom = response.data.nom;
                    s.pren = response.data.pren;
                    s.email = response.data.email;
                    s.avatar = response.data.avatar;
                }
            })

            //modifier la liste du state
            this.setState({list_student_data:newList})

            //vider le formulaire 
            event.target.reset();

            //vider les valeurs state
            this.setState({
                nom:"",
                pren:"",
                email:"",
                avatar:"",
                updateStudent_id:-1,
                textBtnState:"Add Student",
                iconBtnState:"fas fa-plus-circle",
                action:"ADD",
            })

        })
    }
}

       

export default Home;
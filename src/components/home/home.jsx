import React from 'react'
import "./home.css"
import ListStudent from '../student/list-student'
import NewStudent from '../student/new-student'
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
            list_student_data:[],
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
                <NewStudent 
               
                handleChange = {this.handleChange}
                handleSubmit = {this.addStudent}
                
                />

                {/* list of students */}
               <ListStudent dataList={this.state.list_student_data}/>
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
                }
                axios.post("student.json",data_student).then((response)=>{

                    let id_new_student = response.data.name;

                    const myNewStudent = {
                        nom: nStudent.nom,
                        pren: nStudent.pren,
                        email: nStudent.email,
                        avatar: nStudent.avatar,
                        id: id_new_student
                    }

                    console.log(myNewStudent)
                })

        }

   };
}

       

export default Home;
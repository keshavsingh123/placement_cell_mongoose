import Student from '../schema/student.schema.js'
import Company from '../schema/company.schema.js'
export default class StudentController{
    renderStudent = async(req,res)=>{
        return res.render('student')
    }
    createStudent = async  (req, res)=> {
        const { name, email, batch, college, placement, contactNumber, dsa, webd, react } = req.body;
        try {
            const student = await Student.findOne({ email });
    
            if (student) {
                console.log('Email already exists');
                return res.redirect('back');
            }
    
            const newStudent = new Student({
                name,
                email,
                college,
                batch,
                placement,
                contactNumber,
                dsa,
                webd,
                react,
            });
            await newStudent.save();
    
            return res.redirect('/students');
        } catch (error) {
            console.log(`Error in creating student: ${error}`);
            return res.redirect('back');
        }
    };
        studenHomePage = async  (req, res)=> {
            const students = await Student.find({});
            return res.render('student', { students });
          };

          deleteStudent = async  (req, res)=> {
            const { id } = req.params;
            try {
                // find the student using id in params
                const student = await Student.findById(id);
        
                // find the companies for which interview is scheduled
                // and delete student from company interviews list
                if (student && student.interviews.length > 0) {
                    for (let item of student.interviews) {
                        const company = await Company.findOne({ name: item.company });
                        if (company) {
                            for (let i = 0; i < company.students.length; i++) {
                                if (company.students[i].student.toString() === id) {
                                    company.students.splice(i, 1);
                                    company.save();
                                    break;
                                }
                            }
                        }
                    }
                }
                await Student.findByIdAndDelete(id);
                res.redirect('back');
            } catch (error) {
                console.log('Error in deleting student');
                return res.redirect('back');
            }
        };
    

  
}
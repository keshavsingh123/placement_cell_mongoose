import User from "../schema/user.schema.js";
import bcrypt from "bcrypt";
import fs from "fs";
import Student from "../schema/student.schema.js";
export default class UserController {

  // render sign up page
  renderSignup = async (req, res) => {
    res.render("register");
  };

  // render sign in page
  renderSignin = async (req, res) => {
    res.render("login");
  };

  signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.redirect("/users/signin"); // Redirect to signin page after successful signup
    } catch (err) {
      console.error(err);
      res.status(500).send("Error in signup");
    }
  };
  // create session
signin = async (req, res)=> {
	console.log('Session created successfully');
	return res.redirect('/students');
};

  // signout
  signout = async (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    return res.redirect("/users/signin");
  };



  downloadCsv = async  (req, res)=> {
    try {
      const students = await Student.find({});
  
      let data = '';
      let no = 1;
      let csv = 'S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';
  
      for (let student of students) {
        data =
          no +
          ',' +
          student.name +
          ',' +
          student.email +
          ',' +
          student.college +
          ',' +
          student.placement +
          ',' +
          student.contactNumber +
          ',' +
          student.batch +
          ',' +
          student.dsa +
          ',' +
          student.webd +
          ',' +
          student.react;
  
        if (student.interviews.length > 0) {
          for (let interview of student.interviews) {
            data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
          }
        }
        no++;
        csv += '\n' + data;
      }
  
      const dataFile = fs.writeFile('report/data.csv', csv, function (error, data) {
        if (error) {
          console.log(error);
          return res.redirect('back');
        }
        console.log('Report generated successfully');
        return res.download('report/data.csv');
      });
    } catch (error) {
      console.log(`Error in downloading file: ${error}`);
      return res.redirect('back');
    }
  };
}

const Teacher = require("../model/Teacher"); // Make sure the path is correct

getAllteachers = (req, res, next) => {
  Teacher.find({})
    .then((teachers) => {
      res.status(200).json(teachers);
    })
    .catch((error) => {
      next(error);
    });
};

getoneteacher = (req, res, next) => {
  const id = req.params.id;
  Teacher.findById(id) // Corrected usage here
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Id does not exist");
      }
      res.status(200).json(teacher);
    })
    .catch((error) => {
      next(error);
    });
};

deleteteacher = (req, res, next) => {
  const id = req.params.id;
  Teacher.findByIdAndDelete(id)
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json({ message: `Teacher with id ${id} deleted` });
    })
    .catch((error) => {
      next(error);
    });
};

addteacher = (req, res, next) => {
  const newTeacher = new Teacher(req.body); // Corrected variable name here
  newTeacher
    .save()
    .then((teacher) => {
      res.status(201).json({
        message: "Teacher added successfully",
        teacher,
      });
    })
    .catch((error) => {
      next(error);
    });
};
updateteacher = (req, res, next) => {
    const id = req.params.id;
    const update = req.body;
    Teacher.findByIdAndUpdate(id, update, { new: true })
      .then((teacher) => {
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found." });
          } else if (!("name" in update)) {
            return res.status(400).json({ message: "Missing field: 'name'" });
          }
          res.status(200).json(teacher);
      })
      .catch((error) => {
        next(error);
      });
  };
    
module.exports = {
  getAllteachers,
  getoneteacher,
  addteacher,
  deleteteacher,
  updateteacher,
};
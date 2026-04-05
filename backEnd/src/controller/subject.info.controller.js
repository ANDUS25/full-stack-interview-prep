const subjectInfoController = (req, res) => {
  console.log("req", req?.body);

  res.status(200).json({
    message: "This is the subject info controller",
  });
};

export default subjectInfoController;

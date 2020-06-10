const Page = require("../model/page");

exports.addPage = (req, res) => {
  const { title, content } = req.body;

  //check if title is available in the request
  //check if title is not empty
  //check if it is a valid url.since it is an external site
  const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  if (title === undefined || title === "" || !urlRegex.test(title)) {
    return res.status(400).json({
      status: "fail",
      message: "Bad request:Title field is required",
    });
  }

  //find if the page already exist
  Page.findOne({ title: title.trim() })
    .then((page) => {
      //if yes return error
      if (page) {
        return res.status(400).json({
          status: "fail",
          message: "Url already exist",
        });
      }
      let newPage = new Page({ title, content: content ? content : "" });

      newPage.save((err, result) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Server Error.Saving failed",
          });
        }
        return res.status(200).json({
          status: "success",
          message: "Page successfully added",
          data: {
            result,
          },
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: error.message,
      });
    });
};

exports.retrievePage = (req, res) => {
  const { id } = req.params;

  Page.find({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          status: "fail",
          message: "Page" + id + "not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Got what you are looking for",
        data: {
          result,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: "fail",
        message: "Server Error",
      });
    });
};

exports.setPageMarkdown = (req, res) => {
  const { id } = req.params;
  const { markdown, title } = req.body;
  console.log(id, markdown);
  const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
  if (
    id === undefined ||
    id === "" ||
    !urlRegex.test(title) ||
    markdown === undefined
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Bad request:Title field and mardown fields are required",
    });
  }

  Page.findOneAndUpdate({ title }, { content: markdown }, { new: true })
    .then((result) => {
      return res.status(200).json({
        status: "success",
        message: "Page" + id + " markdown update is successful",
        data: {
          result,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: "Server Error",
      });
    });
};

exports.listPage = (req, res) => {
  Page.find()
    .then((result) => {
      return res.status(200).json({
        status: "success",
        message: "all saved pages",
        data: {
          result,
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "fail",
        message: "Server Error",
      });
    });
};

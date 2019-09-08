const express = require("express");
const router = express.Router();
const product = require("../models/product");
const Sequelize = require("sequelize");
const constants = require("./constant");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const Op = Sequelize.Op;

// Upload Image
uploadImage = async (files, doc) => {
    if (files.image != null) {
        var fileExtention = files.image.name.split(".")[1];
        doc.image = `${doc.id}.${fileExtention}`;
        var newpath =
            path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
        if (fs.exists(newpath)) {
            await fs.remove(newpath);
        }
        await fs.moveSync(files.image.path, newpath);

        // Update database
        let result = product.update(
            { image: doc.image },
            { where: { id: doc.id } }
        );
        return result;
    }
};

// router.get("/product", (req, res) => {
//     res.end("Product")
// })

// router.post("/product", (req, res) => {
//     try {
//         const form = new formidable.IncomingForm();
//         form.parse(req, async (error, fields, files) => {
//             let result = await product.create(fields);
//             result = await uploadImage(files, result);
//             res.json({
//                 status: 200,
//                 result: constants.kResultOk,
//                 message: JSON.stringify(result)
//             });
//         });
//     } catch (error) {
//         res.json({
//             status: 400,
//             result: constants.kResultNok,
//             message: JSON.stringify(error)
//         });
//     }
// });

// router.put("/product", async (req, res) => {
//     try {
//         var form = new formidable.IncomingForm();
//         form.parse(req, async (err, fields, files) => {
//             let result = await product.update(fields, { where: { id: fields.id } });
//             result = await uploadImage(files, fields);

//             res.json({
//                 status: 200,
//                 result: constants.kResultOk,
//                 message: JSON.stringify(result)
//             });
//         });
//     } catch (err) {
//         res.json({
//             status: 400,
//             result: constants.kResultNok,
//             message: JSON.stringify(error)
//         });
//     }
// })

// Get Post Put Products 
router.route('/product')
// { order: Sequelize.literal("id DESC") }
    .get(async (req, res) => {
        let result = await product.findAll();
        res.status(200).json(result);
        // res.json({
        //     status: 200,
        //     result: constants.kResultOk,
        //     message: result
        // });
    })
    .post((req, res) => {
        try {
            const form = new formidable.IncomingForm();
            form.parse(req, async (error, fields, files) => {
                let result = await product.create(fields);
                result = await uploadImage(files, result);
                res.json({
                    status: 200,
                    result: constants.kResultOk,
                    message: JSON.stringify(result)
                });
            });
        } catch (error) {
            res.json({
                status: 400,
                result: constants.kResultNok,
                message: JSON.stringify(error)
            });
        }
    })
    .put(async (req, res) => {
        try {
            var form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                let result = await product.update(fields, { where: { id: fields.id } });
                result = await uploadImage(files, fields);

                res.json({
                    status: 200,
                    result: constants.kResultOk,
                    message: JSON.stringify(result)
                });
            });
        } catch (err) {
            res.json({
                status: 400,
                result: constants.kResultNok,
                message: JSON.stringify(error)
            });
        }
    });

// Get Products by id   
router.route('/product/:id')
    .get(async (req, res) => {
        try {
            let result = await product.findOne({ where: { id: req.params.id } });
            if (result) {
                res.status(200).json(result);
                // res.json({
                //     status: 200,
                //     result: constants.kResultOk,
                //     message: result
                // });
            } else {
                res.json({
                    status: 200,
                    result: constants.kResultNOk,
                    message: "No data!"
                });
            };
        } catch (error) {
            res.json({
                status: 400,
                result: constants.kResultNOk,
                message: error
            });
        };
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params
            let result = await product.findOne({ where: { id } })
            await fs.remove(__dirname + "/uploaded/images/" + result.image)
            result = await product.destroy({ where: { id: id } });
            res.json({
                status: 200,
                result: constants.kResultOk,
                message: JSON.stringify(result)
            });
        } catch (error) {
            res.json({
                status: 400,
                result: constants.kResultNok,
                message: JSON.stringify(error)
            });
        }
    })

// Get Products by Keyword
router.get("/product/keyword/:keyword", async (req, res) => {
    const { keyword } = req.params;
    let result = await product.findAll({ where: { name: { [Op.like]: `%${keyword}%` } } });
    res.status(200).json(result);
    // res.json({
    //     status: 200,
    //     result: constants.kResultOk,
    //     message: result
    // });
});


module.exports = router
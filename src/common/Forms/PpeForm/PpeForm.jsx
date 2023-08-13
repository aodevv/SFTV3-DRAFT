import React from "react"
import FormInput from "../../@core/FormInput/FormInput"
import FormTextarea from "../../@core/FormInput/FormTextarea"
import PPEDropzone from "../../Dropzones/PPEDropzone/PPEDropzone"

import "./PpeForm.scss"


const PpeForm = ({formik, existingImg_1, existingImg_2}) => {
    return (
        <>
        <div className="ppe-form">
            <div className="ppe-form__inputs">
                <FormInput
                label="PPE name"
                placeholder="Enter PPE name"
                name="name"
                type="text"
                value={formik.values.name}
                changeHandler={formik.handleChange}
                error={formik.errors.name}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
                />
                <FormTextarea
                label="Description"
                placeholder="Enter description"
                name="desc"
                type="text"
                value={formik.values.desc}
                changeHandler={formik.handleChange}
                error={formik.errors.desc}
                onBlur={formik.handleBlur}
                touched={formik.touched.desc} />
            </div>
            <div className="ppe-form__dropzone">
                <div>
                    <p className="title">Style 1 image</p>
                    <PPEDropzone
                    existingImg={existingImg_1}
                    files={formik.values.style_1_p_p_e}
                    setFiles={(file) => formik.setFieldValue("style_1_p_p_e", file)} 
                    />
                </div>
                <div>
                    <p className="title">Style 2 image</p>
                    <PPEDropzone
                    existingImg={existingImg_2}
                    files={formik.values.style_2_p_p_e}
                    setFiles={(file) => formik.setFieldValue("style_2_p_p_e", file)} 
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default PpeForm
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('* Name is required'),
});

export const prepareInitialValues = (values, edit) => {
  if (edit) {
    const images = [];
    if (values.image1) images.push({ preview: values.image1, existing: true });
    if (values.image2) images.push({ preview: values.image2, existing: true });
    return {
      name: values.name,
      description: values.description,
      images,
    };
  } else {
    return {
      name: '',
      images: [],
      description: '',
    };
  }
};

export const prepareFormData = (values, idType, id, withDescription) => {
  const formData = new FormData();
  formData.append('name', values.name);
  if (withDescription) {
    formData.append('description', values.description);
  }
  if (values.images.length > 0) {
    if (!values.images[0].existing) {
      formData.append('image1', values.images[0]);
    }
    if (values.images.length === 2) {
      if (!values.images[1].existing)
        formData.append('image2', values.images[1]);
    }
  }
  formData.append(idType, id);

  return formData;
};

import * as Yup from 'yup'

const AddSpicyItemValidationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  deliciousRate: Yup.number().min(0).max(5).required(),
  spicyRate: Yup.number().min(0).max(5).required(),
  category: Yup.string().required()
})

export default AddSpicyItemValidationSchema

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikProps,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import validators from "../helpers/form.helpers";


const REQUIRED_ERROR = 'Campo obligatorio'
const PHONENUMBER_ERROR = 'Número de teléfono no válido'
const PHONENUMBER_OPERATOR_ERROR = 'Este número de teléfono no es de Yoigo'
const MAX_ERROR = 'Este campo no puede contener más de ${max} caracteres'


const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
  },
}));

const hasFormikError = (form, name) =>
  form.errors[name] !== undefined && !!form.touched[name];

const initialValues = {
  phone: "",
};

const schema = Yup.object().shape({
  phone: validators
  .string()
  .required(REQUIRED_ERROR)
  .max(9, MAX_ERROR)
  .phoneNumber(PHONENUMBER_ERROR)
  .checkMobileOperator({ brand: 'YOIGO', msg: PHONENUMBER_OPERATOR_ERROR})
})

export default function TestForm() {
  const classes = useStyles();

  const onFormSubmit = () => {
    console.log("enviado....");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      <form className={classes.container} noValidate autoComplete="off">
        <Field name="phone">
          {({ field, form }) => (
            <TextField
              id="phone"
              label="Teléfono"
              variant="outlined"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={field.onChange}
              error={hasFormikError(form, "phone")}
              helperText={
                <ErrorMessage
                  name="phone"
                  className="field-error text-danger"
                />
              }
            />
          )}
        </Field>
      </form>
    </Formik>
  );
}

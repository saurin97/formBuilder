import React,{Fragment} from 'react'
import {Field,ErrorMessage} from 'formik';

interface Props {
    name : string;
    type : string;
    label?: string;
    autoCompleted? : string;
    disabled? : boolean;
    hidden? : boolean;
    placeholder? : string;
    selectList? : string[];
    className?: string;
}

const input = (props : Props) => {
    let formItem:any = null;

    switch (props.type) {
        case 'text':
            formItem = <div className={`form-item ${props.className || ''}`}>
                {props.label && <label htmlFor={props.name} className='text-capitalize'>{props.label} :</label>}
                <Field
                    name={props.name}
                    type={props.type}
                    autoComplete={props.autoCompleted}
                    disabled= {props.disabled}
                    placeholder = {props.placeholder}
                />
                <ErrorMessage name={props.name} component="span" className='error' />
            </div>
        break;
        case 'select':
            formItem = <div className={`form-item pointer ${props.className || ''}`}>
                <label htmlFor={props.name} className='text-capitalize'>{props.name} :</label>
                <Field name={props.name} className='text-capitalize' as='select'>
                    <option value="" hidden>{props.placeholder}</option>
                    {
                        props.selectList?.map((option:string) => {
                            return <option value={option} key={option}>{option}</option>
                        })
                    }
                </Field>
                <ErrorMessage name={props.name} component="span" className='error' />
            </div>
        break;
        case 'radio': 
            formItem = <div className={`form-item ${props.className || ''}`}>
                <div className='radio-options'>
                {props.selectList?.map((option:string) => {
                        return <Fragment key={option}>
                            <div className='radio-option pointer d-flex'>
                                <Field name={props.name} id={option} className='text-capitalize' type ='radio' value={option}></Field>
                                <label htmlFor={option} className='text-capitalize pointer'>{option}</label>
                            </div>
                        </Fragment>
                    })}
                <ErrorMessage name={props.name} component="span" className='error' />
                </div>
            </div>
        break;
        case 'checkbox':
            formItem = <div className={`form-item ${props.className || ''}`}>
                <div className='checkbox-options'>
                {props.selectList?.map((option:string) => (
                    <div className='checkbox-option pointer d-flex' key={option}>
                        <Field name={props.name} id={option} className='text-capitalize' type ='checkbox' value={option}></Field>
                        <label htmlFor={option} className='text-capitalize pointer'>{option}</label>
                    </div>
                ))}
                </div>
                <ErrorMessage name={props.name} component="span" className='error' />
            </div>
        break;
    }
        
    return (
    <>
        {formItem}
    </>        
    )
}

export default input;
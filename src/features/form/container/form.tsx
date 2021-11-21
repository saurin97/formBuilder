import { useState, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router';

import { FormDetail, State } from '../../../shared/interface/interface';
import { FormState } from '../../forms/interface/interface';
import { setFormData } from '../../forms/store/forms.action';

import * as Yup from 'yup';
import { Formik } from 'formik';

import FormInput from '../../../shared/component/input/input';

const Forms: React.FC<RouteComponentProps> = (props) => {
	const params = useParams<{ id: string }>();
	const forms = useSelector<State, FormState['forms']>((state) => state.forms.forms);
	const dispatch = useDispatch();

	const formDetail = useMemo(() => forms.find(item => item.formUrl === params.id) as FormDetail, [forms, params.id]);
	const formBody = useMemo(() => Object.keys(formDetail.formBody).map((key) => formDetail.formBody[key]), [formDetail.formBody]);
	const [formResponses, setFormResponses] = useState(formDetail.responses);

	const onSubmit = (values: { [key: string]: any; }) => {
		setFormResponses([...formResponses, values]);
		const index = forms.findIndex((item) => item.formUrl === params.id);
		forms[index] = { ...formDetail, responses: [...formResponses, values] };
        localStorage.setItem('forms', JSON.stringify(forms))
		dispatch(setFormData(forms));
		props.history.push('/');
	};

	const initialValue= {
		type: formBody[0].type,
		checkboxOption: '',
		radioOption: '',
		answer: '',
	}

	return (
		<div className='form-wrapper'>
			<div className='form'>
				<h2 className='form--name text--center mb--15'>{formDetail.formName}</h2>
				<Formik
					enableReinitialize={true}
					initialValues={initialValue}
					validationSchema={validationSchema}
					validateOnBlur={true}
					validateOnChange={true}
					onSubmit={(values,{resetForm}) => {
						onSubmit(values);
						resetForm();
					}}
				>
					{({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							{formBody.map((formItem, index) => (
								<Fragment key={index}>
									<p className='question--name'><span>Question.</span> {formItem.label}</p>
									{formItem.type === 'text' && 
										<FormInput
											name='answer'
											label='Write Your Answer'
											type='text'
											autoCompleted='off'
											placeholder='Answer'
										/>
									}
									{formItem.type === 'radio' &&
										<FormInput
											name='radioOption'
											className='radio-button'
											type={formItem.type}
											autoCompleted='off'
											selectList={formItem.options}
										/>
									}
									{formItem.type === 'checkbox' &&
										<FormInput
											name='checkboxOption'
											className='radio-button'
											type={formItem.type}
											autoCompleted='off'
											selectList={formItem.options}
										/>
									}
								</Fragment>
							))}
							<div className='button-wrapper'>
								<button type='submit'>Create Form</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Forms;

export const validationSchema = Yup.object().shape({
	answer: Yup.string().trim().when('type', (type: string, schema: any) => {
		if (type === 'text') {
			return schema.required('Answer is required');
		}
		return schema.optional().nullable();
	}),
	checkboxOption: Yup.array().when('type', (type: string, schema: any) => {
		if (type === 'checkbox') {
			return schema.min(1).required('please select one Option');
		}
		return schema.optional().nullable();
	}),
	radioOption: Yup.string().when('type', (type: string, schema: any) => {
		if (type === 'radio') {
			return schema.required('please select one Option');
		}
		return schema.optional().nullable();
	}),
});

import { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import FormInput from '../../../shared/component/input/input';
import { FormDetail } from '../../../shared/interface/interface';

const Modal: React.FC<{ isModalOpen: boolean; onClickCloseModal: (item: boolean) => void; onCreateForm: (item: FormDetail) => void }> = (props) => {

	const { isModalOpen, onClickCloseModal } = props;
	const [isQuestion, setIsQuestion] = useState(false);

	const initialValue = { 
		formName: '',
		questionName: '', 
		questionType: 'text', 
		questionOption: ''
	};

	const onSubmit = (values: { [key: string]: string; }) => {
		let questionObj: any = {
			[values.questionName]: {
				label: values.questionName,
				type: values.questionType,
			}
		}
		if (values.questionType !== 'text') {
			const options = values.questionOption.split(',');
			questionObj = {
				[values.questionName]: {
					label: values.questionName,
					type: values.questionType,
					options: options,
				}	
			}
		}

		props.onCreateForm({
			formName: values.formName,
			formUrl: `${new Date().getTime()}`,
			createdAt: new Date().getTime(),
			formBody: questionObj,
			responses: [],
		});
	};

	return (
		<div className={`modal ${isModalOpen ? 'show' : ''}`}>
			<div className='modal-wrapper'>
				<span onClick={() => onClickCloseModal(false)} className='close'>&times;</span>

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
					{({ handleSubmit, values }) => (
						<form onSubmit={handleSubmit}>
							<FormInput
								name='formName'
								label='Form Name'
								type='text'
								autoCompleted='off'
								placeholder='Form Name'
							/>
							<div style={{maxWidth:'320px', margin: '0 auto 20px'}}>
								<button className='add-question-button' type='button' disabled={values.formName === ''} onClick={() => setIsQuestion(true)}>Add Question</button>
							</div>

							{values.formName !== '' && isQuestion && <>
								<FormInput
									name='questionName'
									label='Question Name'
									type='text'
									autoCompleted='off'
									placeholder='Question Name'
								/>
								<FormInput
									name='questionType'
									label='Question Type'
									type='select'
									autoCompleted='off'
									placeholder='Question Type' 
									selectList={['text','radio','checkbox']}
								/>
								{(values.questionType === 'radio' || values.questionType === 'checkbox') && (
									<FormInput
										name='questionOption'
										label='Enter Option Coma Seperated'
										type='text'
										autoCompleted='off'
										placeholder='Question Option'
									/>
								)}
							</>}
							<div className='button-wrapper'>
								<button type='submit' disabled={values.formName === '' || !isQuestion}>Create Form</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export const validationSchema = Yup.object().shape({
	formName: Yup.string().trim().required('FormName is Required'),
	questionName: Yup.string().trim().required('QuestionName Require'),
	questionType: Yup.string().trim().required('QuestionType is Require'),
	questionOption: Yup.string().trim()
		.when('questionType', (questionType: string, schema: any) => {
			if (questionType === 'text') {
				return schema.optional().nullable();
			}
			return schema.required('Question Oprtions are Required');
		}),
});

export default Modal;
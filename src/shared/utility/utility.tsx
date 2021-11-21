import { Action, SchemaMap } from '../interface/interface';

export const createAction = (ACTION: string, data: any = null): Action => {
	return {
		type: ACTION,
		payload: data,
	};
};

export const questionSchema: SchemaMap = {
	questionName: {
		type: 'text',
		label: 'Question Name',
		required: true,
	},
	questionType: {
		type: 'select',
		label: 'Question Type',
		required: true,
		options: [
			{
				label: 'Text',
				value: 'text',
			},
			{
				label: 'Radio',
				value: 'Radio',
			},
			{
				label: 'Multiple Choice',
				value: 'select',
			},
		],
	},
	questionOption: {
		type: 'text',
		label: 'Question Option',
		required: true,
	},
};

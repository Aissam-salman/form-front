import {Title, Title2, Title3} from "@/components/form/ui/title-form.tsx";
import {LabelForm} from "@/components/form/ui/label-form.tsx";
import {
    CheckboxForm,
    FileForm,
    ImgForm,
    InputForm,
    InputFormWithLabel,
    TextareaForm
} from "@/components/form/ui/input-form.tsx";
import {SelectForm} from "@/components/form/ui/select-form.tsx";
import {RadioForm} from "@/components/form/ui/radio-form.tsx";
import {BtnSubmit} from "@/components/form/ui/btn-submit.tsx";
import {DateForm} from "@/components/form/ui/date-form.tsx";
import {Signature} from "@/components/form/ui/signature.tsx";

export const formElements = [
    { id: 'title', element: Title, label: 'Title' },
    { id: 'h2', element: Title2, label: 'Heading 2' },
    { id: 'h3', element: Title3, label: 'Heading 3' },
    { id: 'label', element: LabelForm, label: 'Label' },
    { id: 'input', element: InputForm, label: 'Text Input' },
    {id: 'inputAndLabel', element: InputFormWithLabel, label: 'Question'},
    { id: 'textarea', element: TextareaForm, label: 'Text Area' },
    { id: 'select', element: SelectForm, label: 'Dropdown' },
    { id: 'checkbox', element: CheckboxForm, label: 'Checkbox' },
    { id: 'radio', element: RadioForm, label: 'Radio Button' },
    { id: 'submit', element: BtnSubmit, label: 'Submit Button' },
    { id: 'file', element: FileForm, label: 'File Upload' },
    { id: 'image', element: ImgForm, label: 'Image Upload' },
    { id: 'date', element: DateForm, label: 'Date Picker' },
    { id: 'signature', element: Signature, label: 'Signature' },
]

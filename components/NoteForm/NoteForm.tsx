'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { useNoteStore, initialDraft } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';

type FormValues = { title: string; content: string; tag: NoteTag };

export type NoteFormProps = {
  onCreated?: () => void;
  onClose?: () => void; 
};

const Schema = Yup.object({
  title: Yup.string().min(3, 'Min 3').max(50, 'Max 50').required('Required'),
  content: Yup.string().max(500, 'Max 500'),
  tag: Yup.mixed<NoteTag>().oneOf(['Todo','Work','Personal','Meeting','Shopping']).required('Required'),
});

export default function NoteForm({ onCreated, onClose }: NoteFormProps) {
  const router = useRouter();
  const draft = useNoteStore(s => s.draft);
  const setDraft = useNoteStore(s => s.setDraft);
  const clearDraft = useNoteStore(s => s.clearDraft);

  const initialValues: FormValues = draft ?? initialDraft;

  const goBackOrClose = () => {
    if (onClose) onClose();
    else router.back();
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={Schema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createNote(values);
          clearDraft();
          resetForm();
          onCreated?.();
          goBackOrClose();   
        } catch {
          alert('Помилка під час створення нотатки');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, values, setFieldValue }) => {
        const handleChange =
          (name: keyof FormValues) =>
          (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const v = e.target.value;
            setFieldValue(name, v);
            setDraft({ [name]: v } as Partial<FormValues>);
          };

        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field
                id="title"
                name="title"
                type="text"
                className={css.input}
                value={values.title}
                onChange={handleChange('title')}
              />
              <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
                value={values.content}
                onChange={handleChange('content')}
              />
              <ErrorMessage name="content" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field
                as="select"
                id="tag"
                name="tag"
                className={css.select}
                value={values.tag}
                onChange={handleChange('tag')}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={goBackOrClose} 
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || !isValid}
              >
                Create note
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}